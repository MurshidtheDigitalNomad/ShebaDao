import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&display=swap');
          
          .navbar {
            position: fixed;
            width: 100%;
            z-index: 50;
            transition: all 0.3s;
          }
          .navbar.scrolled {
            background-color: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .desktop-nav, .desktop-buttons {
            display: none;
          }
          @media (min-width: 768px) {
            .desktop-nav, .desktop-buttons {
              display: flex !important;
            }
            .mobile-menu-btn {
              display: none !important;
            }
          }
        `}</style>
        
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Teko, sans-serif'
                }}>
                  ShebaDao
                </span>
              </div>
  
              <div className="desktop-nav" style={{ alignItems: 'center', gap: '2rem' }}>
                <a href="#features" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Features</a>
                <a href="#how-it-works" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>How It Works</a>
                <a href="#contact" style={{ color: '#374151', fontWeight: '500', textDecoration: 'none' }}>Contact</a>
              </div>
  
              <div className="desktop-buttons" style={{ alignItems: 'center', gap: '1rem' }}>
                <button style={{ 
                  padding: '0.5rem 1.5rem', 
                  background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)', 
                  color: 'white', 
                  borderRadius: '9999px',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Get Started
                </button>
              </div>
  
              <div className="mobile-menu-btn">
                <button onClick={() => setIsOpen(!isOpen)} style={{ color: '#374151', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>
  
          {isOpen && (
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)' }}>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="#features" style={{ padding: '0.5rem 0', color: '#374151', textDecoration: 'none' }}>Features</a>
                <a href="#how-it-works" style={{ padding: '0.5rem 0', color: '#374151', textDecoration: 'none' }}>How It Works</a>
                <a href="#contact" style={{ padding: '0.5rem 0', color: '#374151', textDecoration: 'none' }}>Contact</a>
                <button style={{ width: '100%', padding: '0.5rem 1.5rem', color: '#5D2F77', border: '1px solid #5D2F77', borderRadius: '9999px', background: 'white', cursor: 'pointer', marginTop: '1rem' }}>Login</button>
                <button style={{ width: '100%', padding: '0.5rem 1.5rem', background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)', color: 'white', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>Get Started</button>
              </div>
            </div>
          )}
        </nav>
      </>
    );
  };

export default Navbar;
