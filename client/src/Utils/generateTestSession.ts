import { supabase } from '../DataBase/supabaseSetup';

export async function generateTestSession(userId: string): Promise<any[]> {
    try {
    
        // Fetch last 15 questions generated for this user
        const { data: questions, error } = await supabase
          .from("test_questions")
          .select("id, question_text, options, difficulty, skill_tags, category, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(15);
    
        if (error) throw error;
        if (!questions || questions.length === 0)
          throw new Error("No questions found for this user");
    
        // Store questions in localStorage
        localStorage.setItem("test_question_bank", JSON.stringify(questions));

        return questions;
    
      } catch (err) {
        console.error("❌ Error initializing test session:", err);
        throw err;
      }
    }