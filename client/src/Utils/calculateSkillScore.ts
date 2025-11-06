import { supabase } from '../DataBase/supabaseSetup';

interface Question {
  id: string;
  question_text: string;
  parsed_resume_id: string;
}

interface UserAnswers {
  [questionId: string]: string;
}

export async function calculateScore(
  questions: Question[],
  userAnswers: UserAnswers,
  userId: string
) {
  if (!questions.length || !userId) throw new Error("Missing data for scoring");

  // 🧠 Step 1 — Fetch real correct answers from DB
  const questionIds = questions.map((q) => q.id);
  const { data: fullQuestions, error: qErr } = await supabase
    .from('test_questions')
    .select('id, correct_option, parsed_resume_id')
    .in('id', questionIds);

  if (qErr) throw qErr;
  if (!fullQuestions || !fullQuestions.length)
    throw new Error("No matching questions found in database");

  // Build map for quick lookup
  const correctMap = Object.fromEntries(
    fullQuestions.map((q) => [q.id, q.correct_option])
  );

  // 🧮 Step 2 — Initialize scores
  let rawScore = 0;
  let englishScore = 0;
  let logicalScore = 0;
  let technicalScore = 0;

  const clean = (str: string) => 
    str.replace(/^[A-D][).]?\s*/i, '').trim().toLowerCase();

  // 🧩 Step 3 — Compare answers
  questions.forEach((q, index) => {
    const userAnswer = userAnswers[q.id];
    const correctAnswer = correctMap[q.id];

    if (!userAnswer || !correctAnswer) {
      console.warn(`⚠️ Missing answer data for question ${q.id}`, { userAnswer, correctAnswer });
      return;
    }

    // Determine marks by section
    let questionMarks = 0;
    if (index < 5) questionMarks = 5; // English
    else if (index < 10) questionMarks = 5; // Logical
    else questionMarks = 10; // Technical

    if (clean(userAnswer) === clean(correctAnswer)) {
      rawScore += questionMarks;
      if (index < 5) englishScore += questionMarks;
      else if (index < 10) logicalScore += questionMarks;
      else technicalScore += questionMarks;
    }
    console.log(`Q${index + 1}:`, {
      userAnswer: clean(userAnswer),
      correctAnswer: clean(correctAnswer),
      match: clean(userAnswer) === clean(correctAnswer),
      marks: questionMarks,
    });
  });

  // 🧠 Step 4 — Weighted score
  const englishRatio = englishScore / 25;   // normalized 0–1
  const logicalRatio = logicalScore / 25;   // normalized 0–1
  const technicalRatio = technicalScore / 50; // normalized 0–1

 const weightedScore = 
  ((englishRatio + logicalRatio + technicalRatio) / 3) * 100;

  // 🗄️ Step 5 — Insert session record
  const { data, error } = await supabase.from('test_sessions').insert([
    {
      user_id: userId,
      question_ids: questionIds,
      parsed_resume_id: fullQuestions[0].parsed_resume_id, // use from DB
      user_answers: userAnswers,
      status: 'completed',
      started_at: new Date(),
      finished_at: new Date(),
      raw_score: rawScore,
      weighted_score: weightedScore,
    },
  ]);

  if (error) throw error;

  console.log('✅ Test session saved:', data);
  console.log('🎯 Scores:', { rawScore, weightedScore });

  return { rawScore, weightedScore };
}
