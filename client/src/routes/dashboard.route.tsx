import { useState, useEffect } from "react";
import { LayoutDashboard, Briefcase, BookOpen, X, Menu, ChevronRight } from 'lucide-react';
import JobList from "../Components/Dashboard Page/JobList";
import CourseList from "../Components/Dashboard Page/CourseList";
import SkillReport from "../Components/Dashboard Page/SkillReport";
import CircularProgress from "../Components/Dashboard Page/CircularProgress";
import { generateSkillReport } from "../Utils/generateSkillReport";
import { generateAIReport } from "../Utils/generateSkillReport";

const mockCourses = [
    {
      id: 1,
      title: "Advanced JavaScript & React",
      platform: "Coursera",
      instructor: "Meta",
      duration: "6 weeks",
      difficulty: "Intermediate",
      rating: 4.8,
      students: "125K",
      description: "Master modern JavaScript and React to build professional web applications.",
      relevanceScore: 95
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      platform: "Udemy",
      instructor: "Abdul Bari",
      duration: "8 weeks",
      difficulty: "Advanced",
      rating: 4.9,
      students: "200K",
      description: "Strengthen your problem-solving skills with comprehensive DSA training.",
      relevanceScore: 88
    },
    {
      id: 3,
      title: "System Design Fundamentals",
      platform: "Educative",
      instructor: "Alex Xu",
      duration: "4 weeks",
      difficulty: "Intermediate",
      rating: 4.7,
      students: "80K",
      description: "Learn how to design scalable distributed systems from industry experts.",
      relevanceScore: 82
    },
    {
      id: 4,
      title: "Python for Backend Development",
      platform: "Pluralsight",
      instructor: "Reindert-Jan Ekker",
      duration: "5 weeks",
      difficulty: "Beginner",
      rating: 4.6,
      students: "95K",
      description: "Build powerful backend services with Python and modern frameworks.",
      relevanceScore: 78
    },
    {
      id: 5,
      title: "DevOps & CI/CD Mastery",
      platform: "LinkedIn Learning",
      instructor: "Michael Jenkins",
      duration: "7 weeks",
      difficulty: "Advanced",
      rating: 4.8,
      students: "110K",
      description: "Master DevOps practices and automate your deployment pipelines.",
      relevanceScore: 75
    },
    {
      id: 6,
      title: "Cloud Computing with AWS",
      platform: "A Cloud Guru",
      instructor: "Ryan Kroonenburg",
      duration: "10 weeks",
      difficulty: "Intermediate",
      rating: 4.9,
      students: "180K",
      description: "Become proficient in AWS cloud services and architecture.",
      relevanceScore: 85
    }
];

const mockJobs = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "TechCorp Bangladesh",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      skills: ["React", "Node.js", "MongoDB"],
      description: "Build scalable web applications with modern tech stack. Work with cross-functional teams.",
      matchPercentage: 92,
      salary: "৳60,000 - ৳90,000"
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "Digital Innovations Ltd",
      location: "Remote",
      type: "Contract",
      skills: ["TypeScript", "React", "Tailwind"],
      description: "Create beautiful, responsive user interfaces for enterprise applications.",
      matchPercentage: 88,
      salary: "৳50,000 - ৳75,000"
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "StartupHub BD",
      location: "Chittagong, Bangladesh",
      type: "Full-time",
      skills: ["Python", "Django", "PostgreSQL"],
      description: "Join our growing team to build innovative solutions for local businesses.",
      matchPercentage: 85,
      salary: "৳55,000 - ৳80,000"
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "CloudSystems Inc",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      skills: ["Java", "Spring Boot", "MySQL"],
      description: "Design and maintain robust backend systems for high-traffic applications.",
      matchPercentage: 80,
      salary: "৳65,000 - ৳95,000"
    }
];

const DashboardPage = () => {
    const [activeSection, setActiveSection] = useState<'overview' | 'jobs' | 'courses'>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [skillScore, setSkillScore] = useState(0);
    const [aiReport, setAIReport] = useState({
        comment: '',
    });

    useEffect(() => {
        const getSkillScore = async () => {
            const userId = localStorage.getItem('id');
            const score = await generateSkillReport(userId!);
            setSkillScore(score);
        }
        getSkillScore();
    }, []);

    useEffect(() => {
        const getAIReport = async () => {
            const userId = localStorage.getItem('id');
            const report = await generateAIReport(userId!);
            setAIReport(report);
        }
        getAIReport();
    }, []);
  
    const menuItems = [
      { id: 'overview' as const, label: 'Skill Overview', icon: <LayoutDashboard size={20} /> },
      { id: 'jobs' as const, label: 'Job Recommendations', icon: <Briefcase size={20} /> },
      { id: 'courses' as const, label: 'Personalized Courses', icon: <BookOpen size={20} /> }
    ];
  
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(228, 90, 146, 0.4); }
            50% { box-shadow: 0 0 40px rgba(228, 90, 146, 0.6); }
          }
          
          body, button, input, select, textarea {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          
          h1, h2, h3, .heading {
            font-family: 'Teko', sans-serif !important;
          }
          
          .sidebar-item:hover {
            background-color: rgba(228, 90, 146, 0.1);
          }
          
          .sidebar-item-active {
            background-color: rgba(228, 90, 146, 0.2);
            border-left: 3px solid #E45A92;
          }
          
          @media (min-width: 768px) {
            .course-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          
          @media (min-width: 1200px) {
            .course-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
          
          @media (min-width: 1024px) {
            .skill-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
  
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)',
          position: 'relative',
          display: 'flex'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none'
          }}></div>
  
          {/* Sidebar */}
          <aside style={{
            width: '280px',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            padding: '2rem 0',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'auto',
            transition: 'all 0.3s',
            zIndex: 40
          }} className="sidebar-desktop">
            {/* Logo */}
            <div style={{ padding: '0 2rem', marginBottom: '3rem' }} className="slide-in">
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Teko, sans-serif',
                animation: 'glow 3s ease-in-out infinite'
              }}>
                ShebaDAO
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: '400' }}>
                AI-Powered Career Platform
              </p>
            </div>
  
            {/* Menu Items */}
            <nav style={{ padding: '0 1rem' }}>
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`sidebar-item ${activeSection === item.id ? 'sidebar-item-active' : ''}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    marginBottom: '0.5rem',
                    backgroundColor: activeSection === item.id ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                    border: 'none',
                    borderLeft: activeSection === item.id ? '4px solid #8b5cf6' : '4px solid transparent',
                    borderRadius: '0.5rem',
                    color: activeSection === item.id ? 'white' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left',
                    fontWeight: activeSection === item.id ? '600' : '400',
                    fontSize: '1rem',
                    animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div style={{ color: activeSection === item.id ? '#8b5cf6' : 'rgba(255,255,255,0.5)' }}>
                    {item.icon}
                  </div>
                  {item.label}
                </button>
              ))}
            </nav>
  
            {/* User Info Card */}
            <div style={{
              margin: '2rem 1rem',
              padding: '1.5rem',
              backgroundColor: 'rgba(228, 90, 146, 0.1)',
              borderRadius: '1rem',
              border: '1px solid rgba(255, 172, 172, 0.2)'
            }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '400' }}>
                Overall Score
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Teko, sans-serif'
              }}>
                {skillScore}
              </div>
            </div>
          </aside>
  
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 30
              }}
              className="mobile-overlay"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
  
          {/* Mobile Sidebar */}
          <aside
            style={{
              position: 'fixed',
              top: 0,
              left: isSidebarOpen ? 0 : '-280px',
              width: '280px',
              height: '100vh',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRight: '1px solid rgba(255,255,255,0.1)',
              padding: '2rem 0',
              overflow: 'auto',
              transition: 'left 0.3s',
              zIndex: 40
            }}
            className="sidebar-mobile"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
  
            {/* Logo */}
            <div style={{ padding: '0 2rem', marginBottom: '3rem' }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Teko, sans-serif'
              }}>
                ShebaDAO
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                AI-Powered Career Platform
              </p>
            </div>
  
            {/* Menu Items */}
            <nav style={{ padding: '0 1rem' }}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`sidebar-item ${activeSection === item.id ? 'sidebar-item-active' : ''}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    marginBottom: '0.5rem',
                    backgroundColor: activeSection === item.id ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                    border: 'none',
                    borderLeft: activeSection === item.id ? '4px solid #8b5cf6' : '4px solid transparent',
                    borderRadius: '0.5rem',
                    color: activeSection === item.id ? 'white' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left',
                    fontWeight: activeSection === item.id ? '600' : '400',
                    fontSize: '0.9375rem'
                  }}
                >
                  <div style={{ color: activeSection === item.id ? '#8b5cf6' : 'rgba(255,255,255,0.5)' }}>
                    {item.icon}
                  </div>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
  
          {/* Main Content */}
          <main style={{
            flex: 1,
            padding: '2rem',
            position: 'relative',
            zIndex: 1,
            overflow: 'auto'
          }}>
            {/* Mobile Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem'
            }} className="mobile-header">
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer'
                }}
                className="menu-button"
              >
                <Menu size={24} />
              </button>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #E45A92 0%, #FFACAC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Teko, sans-serif'
              }}>
                ShebaDAO
              </h1>
            </div>
  
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Welcome Header */}
                <div style={{ marginBottom: '2rem' }} className="fade-in">
                  <h1 style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Teko, sans-serif',
                    marginBottom: '0.5rem'
                  }}>
                    Welcome to Your Dashboard
                  </h1>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem' }}>
                    Track your skills, explore opportunities, and grow your career.
                  </p>
                </div>
  
                {/* Score Section */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '2rem',
                  marginBottom: '2rem'
                }} className="score-section">
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '2rem'
                  }} className="score-card">
                    <div>
                      <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'white',
                        fontFamily: 'Teko, sans-serif',
                        marginBottom: '1rem',   
                        textAlign: 'center',
                        
                      }}>
                        Your Overall Skill Score
                      </h2>
                      <CircularProgress percentage={skillScore} />
                    </div>
  
                    <div style={{
                      padding: '1.5rem',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      borderRadius: '1rem',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      maxWidth: '800px'
                    }}>
                      <p style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '1.125rem',
                        lineHeight: 1.7,
                        fontWeight: '400'
                      }}>
                        {aiReport.comment}
                      </p>
                    </div>
                  </div>
                </div>
  
                {/* Skill Report */}
                <SkillReport />
  
                {/* Action Buttons */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1.5rem',
                  marginTop: '2rem'
                }} className="action-buttons">
                  <button
                    onClick={() => setActiveSection('jobs')}
                    style={{
                      padding: '2rem',
                      background: 'linear-gradient(135deg, #5D2F77 0%, #3E1E68 100%)',
                      border: 'none',
                      borderRadius: '1.5rem',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(228, 90, 146, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Briefcase size={32} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{
                          fontSize: '1.75rem',
                          fontWeight: 'bold',
                          fontFamily: 'Teko, sans-serif',
                          letterSpacing: '0.02em'
                        }}>
                          Explore Job Opportunities
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9, fontWeight: '400' }}>
                          {mockJobs.length} jobs matched to your profile
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={32} />
                  </button>
  
                  <button
                    onClick={() => setActiveSection('courses')}
                    style={{
                      padding: '2rem',
                      background: 'linear-gradient(135deg, #FFACAC 0%, #10b981 100%)',
                      border: 'none',
                      borderRadius: '1.5rem',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <BookOpen size={32} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{
                          fontSize: '1.75rem',
                          fontWeight: 'bold',
                          fontFamily: 'Teko, sans-serif',
                          letterSpacing: '0.02em'
                        }}>
                          Discover Learning Paths
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9, fontWeight: '400' }}>
                          {mockCourses.length} courses curated for you
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
            )}
  
            {/* Jobs Section */}
            {activeSection === 'jobs' && (
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <JobList />
              </div>
            )}
  
            {/* Courses Section */}
            {activeSection === 'courses' && (
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <CourseList />
              </div>
            )}
          </main>
  
          <style>{`
            @media (min-width: 1024px) {
              .sidebar-mobile, .mobile-overlay, .mobile-header, .menu-button {
                display: none !important;
              }
            }
            
            @media (max-width: 1023px) {
              .sidebar-desktop {
                display: none !important;
              }
              .action-buttons {
                grid-template-columns: 1fr !important;
              }
            }
            
            @media (min-width: 640px) {
              .action-buttons {
                grid-template-columns: repeat(2, 1fr) !important;
              }
              .score-section {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </>
    );
  };
  
  export default DashboardPage;