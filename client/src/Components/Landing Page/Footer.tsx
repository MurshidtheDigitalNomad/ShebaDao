import React, { useState, useEffect } from 'react';
import { Menu, X, CheckCircle, Upload, Brain, TrendingUp, Briefcase, ArrowRight, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
    return (
      <>
        <style>{`
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            margin-bottom: 3rem;
          }
          @media (min-width: 768px) {
            .footer-grid {
              grid-template-columns: 2fr 1fr 1fr;
            }
          }
        `}</style>
        
        <footer id="contact" style={{ backgroundColor: '#111827', color: 'white', padding: '4rem 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div className="footer-grid">
              <div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Teko, sans-serif'
                }}>
                  ShebaDAO
                </h3>
                <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>
                  Empowering the workforce with AI-verified skills and transparent career pathways.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="#" style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <Linkedin size={20} />
                  </a>
                  <a href="#" style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <Twitter size={20} />
                  </a>
                  <a href="#" style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    <Github size={20} />
                  </a>
                </div>
              </div>
  
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Teko, sans-serif' }}>Quick Links</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a href="#about" style={{ color: '#9CA3AF', textDecoration: 'none' }}>About</a>
                  <a href="#features" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Features</a>
                  <a href="#how-it-works" style={{ color: '#9CA3AF', textDecoration: 'none' }}>How It Works</a>
                  <a href="#contact" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Contact</a>
                </div>
              </div>
  
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Teko, sans-serif' }}>Legal</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Privacy Policy</a>
                  <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Terms of Service</a>
                  <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Cookie Policy</a>
                </div>
              </div>
            </div>
  
            <div style={{ paddingTop: '2rem', borderTop: '1px solid #374151', textAlign: 'center', color: '#9CA3AF' }}>
              <p>&copy; 2025 ShebaDAO. All rights reserved. Built with ❤️ for Bangladesh's workforce.</p>
            </div>
          </div>
        </footer>
      </>
    );
  };


export default Footer;
