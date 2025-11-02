

const VisionQuote = () => {
    return (
      <>
        <style>{`
          .vision-title {
            font-size: 3rem;
          }
          .quote-text {
            font-size: 1.5rem;
          }
          @media (min-width: 768px) {
            .vision-title {
              font-size: 4rem;
            }
            .quote-text {
              font-size: 2.5rem;
            }
          }
        `}</style>
        
        <section style={{ 
          padding: '2rem 0', 
          background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)', 
          position: 'relative', 
          overflow: 'hidden' 
        }}>
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            opacity: 0.1,
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
          
          <div style={{ position: 'relative', maxWidth: '64rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
            <h1 className="vision-title" style={{ 
              fontWeight: 'bold', 
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Teko, sans-serif'
            }}>
              Our Vision
            </h1>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(20px)', 
              borderRadius: '1.5rem', 
              padding: '3rem', 
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <p className="quote-text" style={{ 
                fontWeight: 'bold', 
                color: 'white', 
                lineHeight: 1.6,
                fontFamily: 'Teko, sans-serif'
              }}>
                "We aim to transform Bangladesh’s gig economy with AI-powered trust and transparent growth for every Bangladeshi talent with skills and dreams"
              </p>
            </div>
          </div>
        </section>
      </>
    );
  };

export default VisionQuote;
