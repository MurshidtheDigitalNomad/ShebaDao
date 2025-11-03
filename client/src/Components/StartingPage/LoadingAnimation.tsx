import { useState, useEffect } from 'react';
import {Sparkles } from 'lucide-react';

const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
  
      return () => clearInterval(timer);
    }, [onComplete]);
  
    return (
      <>
        <style>{`
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .sparkle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFACAC;
            border-radius: 50%;
            animation: sparkle 2s infinite;
          }
          .sparkle:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
          .sparkle:nth-child(2) { top: 40%; left: 80%; animation-delay: 0.3s; }
          .sparkle:nth-child(3) { top: 60%; left: 30%; animation-delay: 0.6s; }
          .sparkle:nth-child(4) { top: 80%; left: 70%; animation-delay: 0.9s; }
          .sparkle:nth-child(5) { top: 30%; left: 50%; animation-delay: 1.2s; }
          .sparkle:nth-child(6) { top: 70%; left: 60%; animation-delay: 1.5s; }
        `}</style>
        
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ position: 'relative', textAlign: 'center', padding: '2rem' }}>
            {/* Sparkles */}
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
  
            {/* Main Text */}
            <div style={{
              animation: 'float 3s ease-in-out infinite'
            }}>
              <Sparkles size={64} color="#FFACAC" style={{ margin: '0 auto 2rem', display: 'block' }} />
              <h1 style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '1rem',
                fontFamily: 'Teko, sans-serif',
                lineHeight: 1.1
              }}>
                Congrats on Taking<br />The First Step!
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '3rem'
              }}>
                Towards your dream career
              </p>
  
              {/* Progress Bar */}
              <div style={{
                width: '300px',
                height: '4px',
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
        </div>
      </>
    );
  };

export default LoadingAnimation;