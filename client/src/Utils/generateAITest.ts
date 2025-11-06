import { supabase } from '../DataBase/supabaseSetup';
import { GoogleGenerativeAI } from "@google/generative-ai";

//initializing our AI model
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

//wrapper function to safely parse questions
function safeJsonParse(text: string) {
    try {
      //removing all backticks
      let clean = text.replace(/```json|```/g, '').trim();
      //removing all trailing commas before and after brackers
      clean = clean.replace(/,(\s*[}\]])/g, '$1');
      return JSON.parse(clean);
    } catch (err) {
      console.error("JSON parse failed:", err, text);
      throw new Error("Invalid AI response format");
    }
  }

export async function generateAITest(userId: string) {
  try {
    // Getting parsed resume info
    const { data: resumeData, error } = await supabase
        .from('parsed_resume')
        .select('user_id, parsed_json, id')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    if (!resumeData) throw new Error("No parsed resume found.");

    const parsed = resumeData.parsed_json;
    const parsedResumeId = resumeData.id;
    const { PredictedJobRole, KeySkills, ExperienceSummary } = parsed;

    //Creating AI prompt
    const prompt = `
    You are an AI assessment designer for ShebaDao, an AI-vetted gig work platform that evaluates candidates based on their resume data.
    Your task is to create skill-based multiple-choice questions (MCQs) to measure real-world work readiness, communication, logic, and technical competence.
    
    Candidate Info:
    - Job Role: ${PredictedJobRole || "Unknown"}
    - Key Skills: ${KeySkills?.join(", ") || "N/A"}
    - Experience Summary: ${ExperienceSummary || "N/A"}
    - Parsed Resume JSON: ${JSON.stringify(parsed)}
    
    Generate a total of **15 questions** divided into 3 categories:
    - 5 English questions
    - 5 Logical Analysis questions
    - 5 Technical Assessment questions
    
    Each question should include:
    - category: "English" | "Logical Analysis" | "Technical Assessment"
    - evaluation_metric: (the exact sub-skill being tested, e.g., “Basic Comprehension”, “Problem Solving”, etc.)
    - question: the question text
    - options: an array of 4 distinct options
    - correct_answer: the correct option exactly as it appears in the options array
    - difficulty: "easy" | "medium" | "hard"
    - rationale: 1-line explanation of what the question measures
    
    Follow this breakdown when generating questions:
    
    **ENGLISH (5)**
    1. Basic Comprehension — passage-based understanding  
    2. Polite Communication — choosing polite response in a customer scenario  
    3. Correct Tone — choosing most appropriate message  
    4. Grammar Clarity — selecting correct sentence  
    5. Grammar Clarity (Advanced) — identifying grammatically correct statement  
    
    **LOGICAL ANALYSIS (5)**
    1. Problem Solving — pattern or next element  
    2. Attention to Detail — spotting inconsistency  
    3. Following Logic — deduction puzzle or real scenario  
    4. Decision-Making — choosing best or safest solution  
    5. Decision-Making (Advanced) — ethical/practical prioritization  
    
    **TECHNICAL ASSESSMENT (5)**
    1. Real-World Problem Solving — based on candidate’s domain or projects  
    2. Practical Knowledge — specific to their listed skills  
    3. Integrity Check — validating project/experience claims  
    4. Safety Awareness — preventing risk in a scenario  
    5. Advanced Real-World Scenario — integrated technical problem  
    
    Important:
    - Tailor the technical questions to the candidate’s actual field and skills.
    - Gradually increase difficulty from Q1 to Q5 within each section.
    - Avoid trick questions.
    - Keep language simple, clear, and professional.
    
    Return ONLY valid JSON in this exact format:
    {
      "questions": [
        {
          "category": "English",
          "evaluation_metric": "Basic Comprehension",
          "question": "What is the main idea of the passage?",
          "options": ["A...", "B...", "C...", "D..."],
          "correct_answer": "C...",
          "difficulty": "easy",
          "rationale": "Tests ability to understand job-related text quickly"
        }
      ]
    }
    `;

    // 3️⃣ Generate content using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    const questions = safeJsonParse(aiText);
    console.log("✅ Generated Questions:", questions);

    // Map AI-generated questions to match the table
    const formatted = questions.questions.map((q: any) => ({
        user_id: userId,
        parsed_resume_id: parsedResumeId,
        question_text: q.question,
        options: q.options,
        correct_option: q.correct_answer,
        skill_tags: [q.evaluation_metric],   // using evaluation_metric as skill_tags
        difficulty: q.difficulty,
        category: q.category,
        created_at: new Date().toISOString() // optional but good to have
    }));

    const { error: qError } = await supabase
    .from('test_questions')
    .insert(formatted);

    if (qError) throw qError;

    console.log("✅ Questions inserted successfully!");

  } catch (err) {
    console.error("❌ Error generating test:", err);
    throw err;
  }
}
