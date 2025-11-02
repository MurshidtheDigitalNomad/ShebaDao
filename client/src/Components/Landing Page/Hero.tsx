import React, { useState, useEffect } from 'react';
import { Menu, X, CheckCircle, Upload, Brain, TrendingUp, Briefcase, ArrowRight, Linkedin, Twitter, Github } from 'lucide-react';


const Hero = () => {
    return (
      <>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.3; }
          }
          @keyframes underline {
            0% { width: 0; }
            100% { width: 100%; }
          }
          .hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            align-items: center;
          }
          .hero-title {
            font-size: 3rem;
          }
          .hero-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .highlight-text {
            position: relative;
            display: inline-block;
          }
          .highlight-text::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            height: 4px;
            background: linear-gradient(90deg, #FFACAC 0%, #E45A92 100%);
            animation: underline 2s ease-out forwards;
            animation-delay: 0.5s;
            width: 0;
          }
          @media (min-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr;
            }
            .hero-title {
              font-size: 5rem;
            }
            .hero-buttons {
              flex-direction: row;
            }
          }
        `}</style>
        
        <section style={{ 
          position: 'relative', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)'
        }}>
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            opacity: 0.1,
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
  
          <div style={{ 
            position: 'absolute', 
            top: '25%', 
            left: '25%', 
            width: '24rem', 
            height: '24rem', 
            backgroundColor: '#FFACAC', 
            borderRadius: '50%', 
            filter: 'blur(80px)', 
            opacity: 0.2,
            animation: 'pulse 3s ease-in-out infinite'
          }}></div>
          <div style={{ 
            position: 'absolute', 
            bottom: '25%', 
            right: '25%', 
            width: '24rem', 
            height: '24rem', 
            backgroundColor: '#E45A92', 
            borderRadius: '50%', 
            filter: 'blur(80px)', 
            opacity: 0.2,
            animation: 'pulse 3s ease-in-out infinite 1s'
          }}></div>
  
          <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem', width: '100%' }}>
            <div className="hero-grid">
              <div style={{ color: 'white', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
                <h1 className="hero-title" style={{ 
                  fontWeight: 'bold', 
                  lineHeight: 1.1,
                  fontFamily: 'Teko, sans-serif',
                  marginBottom: '1rem'
                }}>
                  Your Skills. Vetted by AI.<br />
                  Leading you <span className="highlight-text">To Your Jobs</span>
                </h1>
                
                <p style={{ fontSize: '1.25rem', color: '#FFACAC', fontStyle: 'italic', marginTop: '0'}}>
                  Built by Team Bhodroloks
                </p>
  
                <div style={{ 
                  position: 'relative', 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem', 
                  padding: '2rem', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  width: '100%',
                  maxWidth: '500px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ 
                        width: '4rem', 
                        height: '4rem', 
                        background: 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}>
                        <Brain color="white" size={32} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', fontFamily: 'Teko, sans-serif' }}>AI Assessment</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)' }}>Real-time skill analysis</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ color: 'rgba(255,255,255,0.9)' }}>Technical Skills</span>
                          <span style={{ color: '#FFACAC', fontWeight: 'bold' }}>94%</span>
                        </div>
                        <div style={{ height: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: 'linear-gradient(90deg, #FFACAC 0%, #E45A92 100%)', width: '94%' }}></div>
                        </div>
                      </div>
                      
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ color: 'rgba(255,255,255,0.9)' }}>Communication</span>
                          <span style={{ color: '#FFACAC', fontWeight: 'bold' }}>88%</span>
                        </div>
                        <div style={{ height: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: 'linear-gradient(90deg, #FFACAC 0%, #E45A92 100%)', width: '88%' }}></div>
                        </div>
                      </div>
                      
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ color: 'rgba(255,255,255,0.9)' }}>Problem Solving</span>
                          <span style={{ color: '#FFACAC', fontWeight: 'bold' }}>91%</span>
                        </div>
                        <div style={{ height: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: 'linear-gradient(90deg, #FFACAC 0%, #E45A92 100%)', width: '91%' }}></div>
                        </div>
                      </div>
                    </div>
  
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFACAC', paddingTop: '1rem' }}>
                      <CheckCircle size={20} />
                      <span style={{ fontWeight: '500' }}>Verified & Ready to Get your Dream Job</span>
                    </div>
                  </div>
                </div>
  
                <div className="hero-buttons">
                  <button style={{ 
                    padding: '1rem 2rem', 
                    backgroundColor: 'white', 
                    color: '#5D2F77', 
                    borderRadius: '9999px',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    boxShadow: '0 0 20px rgba(255, 172, 172, 0.6)',
                    transition: 'all 0.3s'
                  }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 172, 172, 0.9)'}
                     onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 172, 172, 0.6)'}>
                    Start Now
                    <ArrowRight />
                  </button>
                  <button style={{ 
                    padding: '1rem 2rem', 
                    border: '2px solid white', 
                    color: 'white', 
                    borderRadius: '9999px',
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    cursor: 'pointer',
                    marginTop: '1.5rem',
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s'
                  }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.6)'}
                     onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.3)'}>
                    Watch Demo
                  </button>
                  <button style={{ 
                    padding: '1rem 2rem', 
                    background: 'linear-gradient(135deg, #E45A92 0%, #FFACAC 100%)', 
                    color: 'white', 
                    borderRadius: '9999px',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    marginTop: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(228, 90, 146, 0.6)',
                    transition: 'all 0.3s'
                  }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(228, 90, 146, 0.9)'}
                     onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(228, 90, 146, 0.6)'}>
                    View Pitch Deck
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

export default Hero;
