import {supabase} from "../DataBase/supabaseSetup";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function ProvideJobRecommendations(userId: string) {
    // 1️⃣ Fetch latest skill report
    const { data: skill, error: skillError } = await supabase
      .from("skill_reports")
      .select("english_score, logical_score, technical_score, weighted_score")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
  
    if (skillError || !skill) throw skillError || new Error("No skill report found");
  
    // 2️⃣ Fetch parsed resume
    const { data: resumeData } = await supabase
      .from("parsed_resume")
      .select("parsed_json")
      .eq("user_id", userId)
      .single();
  
    const parsedResume = resumeData?.parsed_json || {};
  
    // 3️⃣ AI Prompt
    const prompt = `
  You are a career mentor. Create 5 realistic job postings for a student by analyzing the following:
  - English Score: ${skill.english_score}
  - Logical Score: ${skill.logical_score}
  - Technical Score: ${skill.technical_score}
  - Weighted Score: ${skill.weighted_score}
  - Resume skills: ${JSON.stringify(parsedResume.skills || [], null, 2)}

  1. For small weighted skill score, provide lower salary recommendations.
  2. For high weighted skill score, provide higher salary recommendations.
  3. Provide job and description titles based on resume and skills
  4. Provide realistic percentage match based on resume and skills.
  
  Return strictly as JSON array with this format:
  [
    {
      "id": number,
      "title": string,
      "company": string,
      "location": string,
      "type": string,
      "skills": array of strings,
      "description": string,
      "matchPercentage": number between 50-100,
      "salary": string,
    }
  ]
  `;
  
    // 4️⃣ Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
  
    // 5️⃣ Clean & parse JSON
    let jobJSON;
    try {
      const cleanedText = responseText
        .replace(/```json\s*/gi, "")
        .replace(/```/g, "")
        .trim();
      const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : cleanedText;
      jobJSON = JSON.parse(jsonString);
    } catch (err) {
      console.error("Failed to parse AI job output:", err);
      throw new Error("Failed to parse AI job output");
    }
  
    // 6️⃣ Save to Supabase
    const { error: insertError } = await supabase
      .from("job_recommendations")
      .insert([{ user_id: userId, recommended_jobs: jobJSON, created_at: new Date() }]);
  
    if (insertError) throw insertError;
  
    return jobJSON;
  }
  