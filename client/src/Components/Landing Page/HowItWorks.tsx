import React, { useState, useEffect } from 'react';
import { CheckCircle, Upload, Brain, Briefcase} from 'lucide-react';

const HowItWorks = () => {
    const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
    
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = [0, 1, 2, 3, 4];
            steps.forEach((step, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, step]);
              }, index * 600);
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.3 });
  
      const section = document.getElementById('how-it-works');
      if (section) observer.observe(section);
  
    }, []);
  
    const steps = [
        { 
          icon: <Upload size={32} />, 
          title: "Upload Resume", 
          description: "Share your experience and background securely in seconds" 
        },
        { 
          icon: <Brain size={32} />, 
          title: "AI Skill Analysis", 
          description: "Our AI reviews your skills, experience, and strengths to build your capability profile" 
        },
        { 
          icon: <CheckCircle size={32} />, 
          title: "AI-Generated Skill Test", 
          description: "A personalized test based on your profile is generated to verify your abilities" 
        },
        { 
          icon: <CheckCircle size={32} />, 
          title: "Get Your Skill Score", 
          description: "Receive a trust-based skill score and improvement roadmap" 
        },
        { 
          icon: <Briefcase size={32} />, 
          title: "Match With Jobs & Opportunities", 
          description: "Apply confidently to opportunities aligned with your verified skills" 
        }
    ];
      
  
    return (
      <>
        <style>{`
          .steps-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .hiw-title {
            font-size: 3rem;
          }
          .step-item {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .step-item.visible {
            opacity: 1;
            transform: scale(1);
          }
          .step-connector {
            position: relative;
            height: 2px;
            margin: 2.5rem 1rem 0 1rem;
          }
          .connector-line {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0;
            background: linear-gradient(90deg, #FFACAC 0%, #E45A92 100%);
            transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .connector-line.visible {
            width: 100%;
          }
          .connector-dot {
            position: absolute;
            top: 50%;
            right: -6px;
            width: 12px;
            height: 12px;
            background: #E45A92;
            border-radius: 50%;
            transform: translateY(-50%) scale(0);
            transition: transform 0.4s ease-out 0.6s;
            box-shadow: 0 0 15px rgba(228, 90, 146, 0.6);
          }
          .connector-dot.visible {
            transform: translateY(-50%) scale(1);
          }
          @media (min-width: 768px) {
            .steps-grid {
              grid-template-columns: repeat(5, 1fr);
              position: relative;
            }
            .hiw-title {
              font-size: 4rem;
            }
          }
          @media (max-width: 767px) {
            .step-connector {
              display: none;
            }
          }
        `}</style>
        
        <section id="how-it-works" style={{ padding: '1rem 0', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="hiw-title" style={{ 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Teko, sans-serif'
              }}>
                How It Works
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '42rem', margin: '0 auto' }}>
                Five simple steps to unlock your career potential
              </p>
            </div>
  
            <div className="steps-grid" style={{ position: 'relative' }}>
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div className={`step-item ${visibleSteps.includes(index) ? 'visible' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                        <div style={{ 
                          width: '5rem', 
                          height: '5rem', 
                          background: 'linear-gradient(135deg, #3E1E68 0%, #E45A92 100%)', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: 'white',
                          boxShadow: '0 10px 25px rgba(93, 47, 119, 0.3)'
                        }}>
                          {step.icon}
                        </div>
                        <div style={{ 
                          position: 'absolute', 
                          top: '-0.5rem', 
                          right: '-0.5rem', 
                          width: '2rem', 
                          height: '2rem', 
                          backgroundColor: '#FFACAC', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: 'white', 
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          fontFamily: 'Teko, sans-serif'
                        }}>
                          {index + 1}
                        </div>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#111827', fontFamily: 'Teko, sans-serif' }}>
                        {step.title}
                      </h3>
                      <p style={{ color: '#4B5563' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="step-connector" style={{ 
                      position: 'absolute',
                      top: '2.5rem',
                      left: `calc(${(index + 1) * 20}% - 1rem)`,
                      width: 'calc(20% - 3rem)',
                      zIndex: 1
                    }}>
                      <div className={`connector-line ${visibleSteps.includes(index + 1) ? 'visible' : ''}`}></div>
                      <div className={`connector-dot ${visibleSteps.includes(index + 1) ? 'visible' : ''}`}></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };


export default HowItWorks;