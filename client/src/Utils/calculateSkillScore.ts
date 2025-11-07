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

  // Step 1: Fetch correct answers
  const questionIds = questions.map(q => q.id);
  const { data: fullQuestions, error: qErr } = await supabase
    .from('test_questions')
    .select('id, correct_option, parsed_resume_id')
    .in('id', questionIds);

  if (qErr) throw qErr;
  if (!fullQuestions?.length) throw new Error("No matching questions found");

  const correctMap = Object.fromEntries(fullQuestions.map(q => [q.id, q.correct_option]));

  // Step 2: Initialize scores
  let rawScore = 0, englishScore = 0, logicalScore = 0, technicalScore = 0;

  const clean = (str: string) =>
    str.replace(/^[A-D][).]?\s*/i, '').trim().toLowerCase();

  // Step 3: Evaluate answers
  questions.forEach((q, index) => {
    const userAnswer = userAnswers[q.id];
    const correctAnswer = correctMap[q.id];
    if (!userAnswer || !correctAnswer) return;

    let marks = index < 5 ? 5 : index < 10 ? 5 : 10;

    if (clean(userAnswer) === clean(correctAnswer)) {
      rawScore += marks;
      if (index < 5) englishScore += marks;
      else if (index < 10) logicalScore += marks;
      else technicalScore += marks;
    }
  });

  // Step 4: Weighted score
  const weightedScore = (
    ((englishScore / 25) + (logicalScore / 25) + (technicalScore / 50)) / 3
  ) * 100;

  // Step 5: Insert test session
  const { data: sessionData, error: sessionError } = await supabase
    .from('test_sessions')
    .insert([{
      user_id: userId,
      question_ids: questionIds,
      parsed_resume_id: fullQuestions[0].parsed_resume_id,
      user_answers: userAnswers,
      status: 'completed',
      started_at: new Date(),
      finished_at: new Date(),
      raw_score: rawScore,
      weighted_score: weightedScore,
    }])
    .select();

  if (sessionError) throw sessionError;
  console.log('✅ Test session saved:', sessionData)
  const sessionId = sessionData?.[0]?.id;
  if (!sessionId) throw new Error("Failed to save test session");

  // Step 6: Insert skill report (without AI part yet)
  console.log('Inserting into skill_reports with values:', {
    user_id: userId,
    session_id: sessionId,
    english_score: englishScore,
    logical_score: logicalScore,
    technical_score: technicalScore,
    weighted_score: weightedScore
  });

  const { data: skillData, error: skillError } = await supabase
    .from('skill_reports')
    .insert([{
      user_id: userId,
      session_id: sessionId,
      english_score: englishScore,
      logical_score: logicalScore,
      technical_score: technicalScore,
      weighted_score: weightedScore,
      created_at: new Date().toISOString()
    }])
    .select();

  if (skillError) throw skillError;
  console.log('✅ Skill report saved:', skillData);

  return {
    rawScore,
    weightedScore,
  };
}
