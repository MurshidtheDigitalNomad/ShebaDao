import {useState} from 'react';
import {BookOpen, Brain, Settings} from 'lucide-react';
import { generateAITest } from '../../Utils/generateAITest';
import { useNavigate } from 'react-router-dom';
;

const TestInstructionPage = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const handleStartTest = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('id');
        if (!userId) {
          throw new Error('Please log in to start the test');
        }
        
        await generateAITest(userId);
        // After successful question generation, navigate to the test
        // Note: Since we're not using sessionId anymore, you might want to implement
        // a way to fetch the latest test for this user or modify the navigation
        navigate('/test');
      } catch (error) {
        console.error("Error generating test:", error);
        alert(error instanceof Error ? error.message : 'Failed to generate test. Please try again.');
      } finally {
        setLoading(false);
        navigate('/test');
      }
    };
  
    const testSections = [
      {
        icon: <BookOpen size={48} />,
        number: '1️⃣',
        title: 'English Understanding',
        description: 'Tests your reading, tone, and grammar to ensure you can communicate professionally with clients and teams.',
        weight: '25%',
        color: '#FFACAC'
      },
      {
        icon: <Brain size={48} />,
        number: '2️⃣',
        title: 'Logical Analysis',
        description: 'Evaluates your problem-solving, attention to detail, and ability to follow logical reasoning in real-world job scenarios.',
        weight: '25%',
        color: '#E45A92'
      },
      {
        icon: <Settings size={48} />,
        number: '3️⃣',
        title: 'AI-Powered Technical Test',
        description: 'A custom AI-generated test based on your skills. Includes practical questions, project-based reasoning, integrity checks, and safety awareness scenarios.',
        weight: '50%',
        color: '#5D2F77'
      }
    ];
  
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&display=swap');
          
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .slide-in-up {
            animation: slideInUp 0.6s ease-out forwards;
          }
        `}</style>
  
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)',
          padding: '4rem 1rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
  
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="slide-in-up">
              <h1 style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '1rem',
                fontFamily: 'Teko, sans-serif',
                lineHeight: 1.1,
                position: 'relative',
                display: 'inline-block'
              }}>
                Your AI-Driven Job Readiness Test
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '4px',
                  width: 0,
                  background: 'linear-gradient(90deg, #FFACAC 0%, #E45A92 100%)',
                  borderRadius: '2px',
                  animation: 'underline-draw 1.5s ease-out forwards 0.5s'
                }}></div>
              </h1>
              <p style={{
                fontSize: '1.5rem',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '2rem',
                fontWeight: '500'
              }}>
                This short test helps us understand your strengths and match you to the right opportunities.
              </p>
              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: 1.8
              }}>
                Based on your resume, our AI generates a dynamic 15-question test. The test evaluates your comprehension, reasoning, and real-world problem-solving skills — all designed to reflect your professional capability.
              </p>
            </div>
  
            {/* Weight Distribution Summary - Moved to Top */}
            <div className="slide-in-up" style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '1.5rem 2rem',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: '3rem',
              textAlign: 'center',
              animationDelay: '0.2s'
            }}>
              <h4 style={{
                color: '#FFACAC',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                fontFamily: 'Teko, sans-serif'
              }}>
                Weight Distribution
              </h4>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                <div>
                  <span style={{ color: 'white', fontSize: '1.125rem' }}>English Understanding — </span>
                  <span style={{ color: '#FFACAC', fontWeight: 'bold', fontSize: '1.25rem' }}>25%</span>
                </div>
                <div>
                  <span style={{ color: 'white', fontSize: '1.125rem' }}>Logical Analysis — </span>
                  <span style={{ color: '#E45A92', fontWeight: 'bold', fontSize: '1.25rem' }}>25%</span>
                </div>
                <div>
                  <span style={{ color: 'white', fontSize: '1.125rem' }}>AI Technical Test — </span>
                  <span style={{ color: '#5D2F77', fontWeight: 'bold', fontSize: '1.25rem' }}>50%</span>
                </div>
              </div>
            </div>
  
            {/* Test Breakdown Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem',
              marginBottom: '3rem'
            }} className="test-cards-grid">
              {testSections.map((section, index) => (
                <div
                  key={index}
                  className="slide-in-up"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '1.5rem',
                    padding: '2.5rem',
                    border: '2px solid rgba(255,255,255,0.2)',
                    boxShadow: hoveredCard === index ? '0 25px 50px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                    cursor: 'pointer',
                    animationDelay: `${0.4 + index * 0.2}s`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Gradient overlay on hover */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${section.color} 0%, #FFACAC 100%)`,
                    opacity: hoveredCard === index ? 1 : 0,
                    transition: 'opacity 0.3s'
                  }}></div>
  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                    {/* Icon */}
                    <div style={{
                      minWidth: '80px',
                      height: '80px',
                      background: `linear-gradient(135deg, ${section.color} 0%, #FFACAC 100%)`,
                      borderRadius: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: `0 10px 30px ${section.color}40`,
                      flexShrink: 0
                    }}>
                      {section.icon}
                    </div>
  
                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{
                          fontSize: '2rem',
                          fontFamily: 'Teko, sans-serif'
                        }}>{section.number}</span>
                        <h3 style={{
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          color: 'white',
                          fontFamily: 'Teko, sans-serif',
                          margin: 0
                        }}>
                          {section.title}
                        </h3>
                        <div style={{
                          marginLeft: 'auto',
                          padding: '0.5rem 1rem',
                          backgroundColor: 'rgba(255, 172, 172, 0.2)',
                          borderRadius: '9999px',
                          color: '#FFACAC',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          fontFamily: 'Teko, sans-serif'
                        }}>
                          {section.weight}
                        </div>
                      </div>
                      <p style={{
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: '1.125rem',
                        lineHeight: 1.7,
                        margin: 0
                      }}>
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            {/* CTA Button */}
            <div style={{ textAlign: 'center', animationDelay: '1s' }} className="slide-in-up">
              <button
                style={{
                  padding: '1.25rem 3rem',
                  background: 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)',
                  color: 'white',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 0 40px rgba(228, 90, 146, 0.6)',
                  transition: 'all 0.3s',
                  fontFamily: 'Teko, sans-serif'
                }}
                onClick={handleStartTest}
                onMouseEnter={(e) => {
                  const button = e.target as HTMLButtonElement;
                  button.style.boxShadow = '0 0 60px rgba(228, 90, 146, 0.9)';
                  button.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  const button = e.target as HTMLButtonElement;
                  button.style.boxShadow = '0 0 40px rgba(228, 90, 146, 0.6)';
                  button.style.transform = 'scale(1)';
                }}
              >
                Take the Test
              </button>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.875rem',
                marginTop: '1rem'
              }}>
                Takes approximately 10-15 minutes
              </p>
            </div>
          </div>
  
          <style>{`
            @media (min-width: 768px) {
              .test-cards-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </>
    );
  };
  

export default TestInstructionPage;