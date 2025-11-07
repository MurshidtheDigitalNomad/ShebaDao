import {supabase} from "../DataBase/supabaseSetup";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateSkillReport(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('test_sessions')
      .select('weighted_score')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
  
    if (error) throw error;
    console.log('Skill score data:', data);

    const score = data?.weighted_score || 0;
    return parseFloat(score.toFixed(2)); // ✅ Round to 2 decimal places
  }

export async function fetchIndividualScores(userId: string) {
    const { data, error } = await supabase
      .from('skill_reports')
      .select('english_score, logical_score, technical_score')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
  
    if (error) throw error;
  
    // Return scores rounded to 2 decimal places
    return {
      english: parseFloat((data?.english_score || 0).toFixed(2)),
      logical: parseFloat((data?.logical_score || 0).toFixed(2)),
      technical: parseFloat((data?.technical_score || 0).toFixed(2)),
    };
}

export async function generateAIReport(userId: string) {
    if (!userId) throw new Error("Missing user ID");
  
    // 1️⃣ Fetch latest skill report
    const { data: skill, error: skillError } = await supabase
      .from("skill_reports")
      .select("english_score, logical_score, technical_score, weighted_score")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
  
    if (skillError) throw skillError;
    if (!skill) throw new Error("No skill report found for this user");

  
    const { data: resumeData, error: resumeError } = await supabase
      .from("parsed_resume")
      .select("parsed_json")
      .eq("user_id", userId)
      .single();
  
    if (resumeError) throw resumeError;
  
    const parsedResume = resumeData?.parsed_json || {};
  
    // 3️⃣ Create detailed prompt
    const prompt = `
  You are a senior mentor reviewing a student's skill test results and resume.
  The questions are generaed from resume, with first 5  questions testing English, next 5 questions testing logical reasoning and last 5 questions testing technical skills that are determined from skills and experiences given in the resume.
  
  Here is the parsed résumé data (in JSON form):
  ${JSON.stringify(parsedResume, null, 2)}
  
  Here are the student's test scores:
  - English: ${skill.english_score}
  - Logical Reasoning: ${skill.logical_score}
  - Technical Skills: ${skill.technical_score}
  - Weighted Score: ${skill.weighted_score}
  
  Now, write a personalized feedback report in JSON format.
  
  Guidelines:
  1. Speak in a human, teacher-like tone — encouraging, constructive, and specific.
  2. For each section:
     - If score < 50 → provide **2–3 improvement tips** tailored to their résumé background.
     - If score between 50–90 → provide **balanced critique** (1 praise + 1 improvement).
     - If score > 90 → **praise strongly** and mention how to further excel.
     -No need to mention user's name in every section, mentioning only once or twice is enough.
  3. At the end, write a 3–4 sentence **summary paragraph** reflecting on their overall profile, integrating résumé insights.
  4. Make a small comment, which should a comment on the overall score user acheieved with respect to his resume. Don't make it more than 2 sentences.
  
  Return JSON strictly in this format:
  {
    "comment": "...",
    "english_feedback": "...",
    "logical_feedback": "...",
    "technical_feedback": "...",
    "summary": "..."
  }
  `;
  
    // 4️⃣ Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
  
    const responseText = result.response.text();
    let reportJSON;

    try {
      // 🧹 Clean up Gemini's markdown formatting before parsing
      const cleanedText = responseText
        .replace(/```json\s*/gi, "") // remove ```json
        .replace(/```/g, "")         // remove ```
        .trim();
    
      // 🔍 Extract only the JSON block if there's extra text
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : cleanedText;
    
      // ✅ Parse clean JSON
      reportJSON = JSON.parse(jsonString);
    } catch (err) {
      console.error("❌ Error parsing AI response:", err);
      console.log("Raw response was:", responseText);
      throw new Error("Failed to parse AI output as JSON");
    }
  
    // 5️⃣ Store in user_reports
    const { error: insertError } = await supabase.from("user_report").insert([
      {
        user_id: userId,
        skill_report: reportJSON,
        created_at: new Date(),
      },
    ]);
  
    if (insertError) throw insertError;
  
    console.log("✅ AI report generated and stored successfully!");
    return reportJSON;
}