import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import { generateTestSession } from '../Utils/generateTestSession';
import { calculateScore } from '../Utils/calculateSkillScore';
import { useNavigate } from 'react-router-dom';


interface Question {
    id: string;
    question_text: string;
    options: string[];
    correct_option: string;           // add this
    parsed_resume_id?: string[];    // add optional if needed
    category?: string;
    skill_tags?: string[];
}
  
  const AITestPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [timeRemaining, setTimeRemaining] = useState(15 * 60);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const userId = localStorage.getItem("id");
  
    // Load or generate test questions
    useEffect(() => {
      const loadQuestions = async () => {
        try {
            await generateTestSession(userId!);
            if (!userId) {
                console.error("❌ No user ID found in local storage");
                return;
            }
            const questions = JSON.parse(localStorage.getItem("test_question_bank") || "[]");
            setQuestions(questions);
            setIsLoading(false);
         }
        catch (err) {
          console.error('Error loading questions:', err);
          setIsLoading(false);
        }
      };
      loadQuestions();
    }, []);
  
    // Timer logic
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, []);
  
    // Handle selected option sync
    useEffect(() => {
      if (questions.length > 0) {
        const current = questions[currentQuestionIndex];
        const saved = answers[current?.id];
        setSelectedOption(saved || null);
      }
    }, [currentQuestionIndex, questions, answers]);
    
    //selecting option
    const handleOptionSelect = (option: string) => {
      if (!questions.length) return;
      const currentId = questions[currentQuestionIndex].id;
      setSelectedOption(option);
      setAnswers((prev) => ({ ...prev, [currentId]: option }));
    };
    
    //moving to next questions
    const handleNext = () => {
      if (currentQuestionIndex === questions.length - 1) {
        return;
      }
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300);
    };
    
    //moving to previous questions
    const handlePrevious = () => {
      if (currentQuestionIndex === 0) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    };
    
    //format time
    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };
    
    //get category color
    const getCategoryColor = (category?: string) => {
      if (!category) return 'from-gray-500 to-gray-600';
      switch (category.toLowerCase()) {
        case 'technical':
          return 'from-violet-500 to-purple-600';
        case 'english':
          return 'from-emerald-500 to-teal-600';
        case 'logical':
          return 'from-cyan-500 to-blue-600';
        default:
          return 'from-gray-500 to-gray-600';
      }
    };
    
    //get timer color
    const getTimerColor = () => {
      if (timeRemaining < 60) return 'from-red-500 to-rose-600';
      if (timeRemaining < 300) return 'from-orange-500 to-amber-600';
      return 'from-emerald-500 to-teal-600';
    };
  
    // Handle loading state
    if (isLoading)
      return (
        <div className="h-screen flex items-center justify-center text-white text-2xl">
          Loading test questions...
        </div>
      );
  
    if (!questions.length)
      return (
        <div className="h-screen flex items-center justify-center text-red-400 text-xl">
          No questions found. Please try again later.
        </div>
      );
  
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    const handleSubmit = async () => {
        if (!questions.length) return;

        if (!userId) {
          alert("User not found. Please log in.");
          return;
        }
       
        try {
          setIsSubmitting(true);
          const questions = JSON.parse(localStorage.getItem("test_question_bank") || "[]");
          // Call calculateScore with questions & user answers
          await calculateScore(questions, answers, userId!);
      
          alert(`Test submitted!`);
          // Redirect to dashboard
          navigate('/dashboard'); 
        } catch (err) {
          console.error("Error submitting test:", err);
          alert("Failed to submit test. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
    };
  
    return (
      <>
        {/* Inline styles and animations remain identical */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&display=swap');
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse-ring {
            0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          }
          .fade-in { animation: fadeIn 0.4s ease-out; }
          .option-box:hover { transform: translateX(4px); }
          .option-selected {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
            border-color: #8b5cf6;
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          .timer-warning { animation: pulse-ring 2s ease-out infinite; }
        `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Header */}
        <header style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }} className="fade-in">
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Teko, sans-serif',
                marginBottom: '0.25rem'
              }}>
                ShebaDAO AI Test System
              </h1>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.875rem'
              }}>
                Answer all questions carefully. You have 15 minutes.
              </p>
            </div>

            {/* Timer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: `linear-gradient(135deg, ${getTimerColor().split(' ')[1]} 0%, ${getTimerColor().split(' ')[3]} 100%)`,
              borderRadius: '9999px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }} className={timeRemaining < 60 ? 'timer-warning' : ''}>
              <Clock size={20} color="white" />
              <div style={{ color: 'white', fontFamily: 'Teko, sans-serif', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {formatTime(timeRemaining)} / 15:00
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '3rem 1rem',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Progress Indicator */}
          <div style={{ marginBottom: '2rem' }} className="slide-in">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                Progress
              </span>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', fontWeight: '600' }}>
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
                transition: 'width 0.5s ease-out',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.6)'
              }}></div>
            </div>
          </div>

          {/* Question Card */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
            opacity: isTransitioning ? 0.3 : 1,
            transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
            transition: 'all 0.3s ease-out'
          }} className="fade-in">
            {/* Question Number */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.8125rem',
                fontWeight: '500',
                fontFamily: 'Teko, sans-serif',
                letterSpacing: '0.05em'
              }}>
                QUESTION {currentQuestionIndex + 1} OF {totalQuestions}
              </span>

              {/* Category Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '0.375rem 1rem',
                  borderRadius: '9999px',
                  background: `linear-gradient(135deg, ${getCategoryColor(currentQuestion.category).split(' ')[1]} 0%, ${getCategoryColor(currentQuestion.category).split(' ')[3]} 100%)`,
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {currentQuestion.category}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h2 style={{
              color: 'white',
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              lineHeight: 1.4
            }}>
              {currentQuestion.question_text}
            </h2>

            {/* Evaluation Metric */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2.5rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <AlertCircle size={16} color="rgba(139, 92, 246, 0.8)" />
              <span style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.875rem'
              }}>
                Evaluates: <span style={{ color: 'rgba(139, 92, 246, 1)', fontWeight: '500' }}>{currentQuestion.skill_tags}</span>
              </span>
            </div>

            {/* Options */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              {currentQuestion.options.map((option, index) => {
                const optionLetter = option.charAt(0);
                const isSelected = selectedOption === option;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`option-box ${isSelected ? 'option-selected' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.875rem 1.25rem',
                      backgroundColor: isSelected ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '2px solid #8b5cf6' : '2px solid rgba(255,255,255,0.1)',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    {/* Option Letter Circle */}
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      background: isSelected 
                        ? 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' 
                        : 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      fontFamily: 'Teko, sans-serif',
                      flexShrink: 0
                    }}>
                      {optionLetter}
                    </div>

                    {/* Option Text */}
                    <span style={{
                      color: isSelected ? 'white' : 'rgba(255,255,255,0.8)',
                      fontSize: '1rem',
                      flex: 1
                    }}>
                      {option.substring(3)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
              <button
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isFirstQuestion ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                  color: isFirstQuestion ? 'rgba(255,255,255,0.3)' : 'white',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '0.75rem',
                  cursor: isFirstQuestion ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  opacity: isFirstQuestion ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isFirstQuestion) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.transform = 'translateX(-4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {isLastQuestion ? (
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{
                        padding: '0.75rem 2rem',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: 'white',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        opacity: isSubmitting ? 0.7 : 1
                    }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Test'}
                </button>
                ) : (
                <button
                    onClick={handleNext}
                    disabled={!selectedOption || isSubmitting}
                    style={{
                        padding: '0.75rem 2rem',
                        background: selectedOption 
                            ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' 
                            : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: 'white',
                        fontWeight: '600',
                        cursor: selectedOption ? 'pointer' : 'not-allowed',
                        opacity: selectedOption ? 1 : 0.7,
                        transition: 'all 0.2s'
                    }}
                >
                    Next
                </button>
                )}
            </div>
          </div>

          {/* Question Navigation Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            {questions.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: answers[questions[index].id] 
                    ? 'rgba(139, 92, 246, 0.8)' 
                    : index === currentQuestionIndex 
                      ? 'rgba(255,255,255,0.5)' 
                      : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentQuestionIndex(index);
                    setIsTransitioning(false);
                  }, 300);
                }}
              ></div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '2rem 1rem',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <p style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, rgba(236, 72, 153, 0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '0.875rem',
            fontWeight: '500',
            fontFamily: 'Teko, sans-serif',
            letterSpacing: '0.1em'
          }}>
            POWERED BY SHEBADAO AI
          </p>
        </footer>
      </div>
    </>
  );
};

export default AITestPage;