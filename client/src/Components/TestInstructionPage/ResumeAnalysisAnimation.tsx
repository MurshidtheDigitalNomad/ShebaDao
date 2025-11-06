
import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, MessageCircle, Brain, Settings, Shield, Search, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResumeAnalysisLoadingProps {
  onComplete?: () => void;
}

const ResumeAnalysisLoading = ({ onComplete }: ResumeAnalysisLoadingProps) => {
  const navigate = useNavigate();
  
  const handleComplete = useCallback(() => {
    if (onComplete) {
      onComplete();
    } else {
      // Default navigation if no onComplete prop is provided
      navigate('/ai-test-instructions');
    }
  }, [navigate, onComplete]);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    'Analyzing',
    'Extracting Skills',
    'Evaluating Profile',
    'Preparing Test'
  ];

  const keyAreas = [
    { icon: <BookOpen size={24} />, title: 'English Comprehension' },
    { icon: <MessageCircle size={24} />, title: 'Communication Clarity' },
    { icon: <Brain size={24} />, title: 'Logical Analysis' },
    { icon: <Settings size={24} />, title: 'Technical Problem Solving' },
    { icon: <Shield size={24} />, title: 'Integrity & Safety Awareness' }
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(handleComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(progressTimer);
  }, [handleComplete]);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 1250);

    return () => clearInterval(phaseTimer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-20px) scale(1); opacity: 0.8; }
          50% { transform: translateY(20px) scale(1.1); opacity: 1; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 172, 172, 0.4); }
          50% { box-shadow: 0 0 40px rgba(255, 172, 172, 0.8); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink-load {
          0%, 100% { opacity: 1; border-color: rgba(255, 172, 172, 0.3); }
          50% { opacity: 0.6; border-color: rgba(255, 172, 172, 0.6); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        .scan-animation {
          animation: scan 3s ease-in-out infinite;
        }
        .rotate-animation {
          animation: rotate 4s linear infinite;
        }
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .blink-load {
          animation: blink-load 2s ease-in-out infinite;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          textAlign: 'center', 
          padding: '2rem', 
          position: 'relative', 
          zIndex: 1,
          maxWidth: '600px',
          width: '100%'
        }}>
          {/* Progress Bar at Top */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.25rem',
              marginBottom: '0.75rem',
              flexWrap: 'wrap'
            }}>
              {phases.map((phase, index) => (
                <React.Fragment key={index}>
                  <div style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: index === currentPhase ? 'rgba(255, 172, 172, 0.3)' : 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: index === currentPhase ? '2px solid #FFACAC' : '2px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    {index < currentPhase && <CheckCircle size={12} color="#FFACAC" />}
                    <span style={{ whiteSpace: 'nowrap' }}>{phase}</span>
                  </div>
                  {index < phases.length - 1 && (
                    <div style={{
                      width: '20px',
                      height: '2px',
                      background: index < currentPhase ? 'linear-gradient(90deg, #FFACAC 0%, #E45A92 100%)' : 'rgba(255,255,255,0.2)',
                      alignSelf: 'center'
                    }}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Central Animation */}
          <div style={{ marginBottom: '2rem', position: 'relative' }}>
            {/* Outer rotating ring */}
            <div className="rotate-animation" style={{
              width: '120px',
              height: '120px',
              margin: '0 auto',
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                border: '2px solid rgba(255, 172, 172, 0.3)',
                borderTop: '2px solid #FFACAC',
                borderRadius: '50%',
                position: 'absolute'
              }}></div>
            </div>

            {/* Document with magnifying glass */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}>
              <div style={{
                width: '50px',
                height: '65px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '0.35rem',
                border: '2px solid rgba(255,255,255,0.3)',
                position: 'relative'
              }}>
                {/* Document lines */}
                <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ width: '80%', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '1px' }}></div>
                  <div style={{ width: '60%', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '1px' }}></div>
                  <div style={{ width: '70%', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '1px' }}></div>
                  <div style={{ width: '50%', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '1px' }}></div>
                </div>
              </div>
              {/* Magnifying glass */}
              <div className="scan-animation" style={{
                position: 'absolute',
                top: '15%',
                right: '-15px'
              }}>
                <Search size={32} color="#FFACAC" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Main Text */}
          <h1 className="fade-in-up" style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.75rem',
            fontFamily: 'Teko, sans-serif',
            lineHeight: 1.2
          }}>
            Analyzing Your Resume<br />With Our AI Intelligence...
          </h1>

          <p className="fade-in-up" style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '2rem',
            animationDelay: '0.2s'
          }}>
            Do you know our AI evaluates you across 5 key areas?
          </p>

          {/* Key Areas Pills */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            margin: '0 auto 2rem',
            maxWidth: '450px'
          }}>
            {keyAreas.map((area, index) => (
              <div
                key={index}
                className="fade-in-up blink-load"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '0.75rem',
                  border: '2px solid rgba(255, 172, 172, 0.3)',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  animationDelay: `${0.3 + index * 0.15}s`,
                  position: 'relative'
                }}
              >
                {/* Checkpoint Circle */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid #FFACAC',
                  backgroundColor: 'rgba(255, 172, 172, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#FFACAC',
                    animation: 'pulse-dot 1.5s ease-in-out infinite',
                    animationDelay: `${index * 0.2}s`
                  }}></div>
                </div>
                
                <div style={{ color: '#FFACAC', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {React.cloneElement(area.icon, { size: 20 })}
                </div>
                
                <span style={{ flex: 1, textAlign: 'left' }}>{area.title}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            maxWidth: '300px',
            height: '3px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '9999px',
            overflow: 'hidden',
            margin: '0 auto'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #FFACAC 0%, #E45A92 100%)',
              transition: 'width 0.1s ease-out',
              boxShadow: '0 0 10px rgba(255, 172, 172, 0.8)'
            }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeAnalysisLoading;
