import React from "react";
import { Brain, Briefcase, TrendingUp } from "lucide-react";

const Features = () => {
    const features = [
      {
        icon: <Brain size={40} />,
        title: "AI Skill Vetting",
        description: "Smarter skill assessment through AI-powered analysis that evaluates your true capabilities beyond traditional resumes."
      },
      {
        icon: <Briefcase size={40} />,
        title: "Personalized Job Matching",
        description: "Fair scoring to reduce hiring bias and connect you with opportunities that match your verified skills and potential."
      },
      {
        icon: <TrendingUp size={40} />,
        title: "Transparent Score & Growth Insights",
        description: "Skill growth recommendations with clear metrics and actionable feedback to help you continuously improve and advance."
      }
    ];
  
    return (
      <>
        <style>{`
          .features-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .features-title {
            font-size: 3rem;
          }
          .feature-card {
            position: relative;
            transition: all 0.3s;
          }
          .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 1rem;
            padding: 2px;
            background: linear-gradient(135deg, white, rgba(255,255,255,0.5));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s;
          }
          .feature-card:hover::before {
            opacity: 1;
          }
          @media (min-width: 768px) {
            .features-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            .features-title {
              font-size: 4rem;
            }
          }
        `}</style>
        
        <section id="features" style={{ 
          padding: '2rem 0', 
          background: 'linear-gradient(180deg, #2d1b4e 0%, #3d2a5f 50%, #2d1b4e 100%)'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h2 className="features-title" style={{ 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                background: 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Teko, sans-serif'
              }}>
                Our MVP features
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '42rem', margin: '0 auto' }}>
                First our AI assess your skills, then matches you with the right job.
              </p>
            </div>
  
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card" style={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)', 
                  borderRadius: '1rem', 
                  padding: '2rem', 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)', 
                    borderRadius: '1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'white', 
                    marginBottom: '1.5rem'
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white', fontFamily: 'Teko, sans-serif' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };

export default Features;