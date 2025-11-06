import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';
import saveUserData from '../Utils/resumeUpload';

interface VerifyingPageProps {
  userData?: {
    fullName: string;
    email: string;
    industry: string;
    intendedJob: string;
    gender: string;
  };
  resumeFile?: File | null;
  onBack?: () => void;
}

const VerifyingPage = ({ userData, resumeFile, onBack }: VerifyingPageProps = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Get data from location state if not passed as props
  const finalUserData = userData || location.state?.userData || {
    fullName: 'Not provided',
    email: 'Not provided',
    industry: 'Not provided',
    intendedJob: 'Not provided',
    gender: 'Not provided'
  };

  const finalResumeFile = resumeFile || location.state?.resumeFile || null;
  const finalOnBack = onBack || (() => navigate(-1));

  // Generate resume preview URL
  const resumeUrl = finalResumeFile ? URL.createObjectURL(finalResumeFile) : null;
  const isPdf = finalResumeFile?.type === 'application/pdf';

  const handleSubmit = async () => {
    if (!finalResumeFile) {
      alert("Please upload a resume");
      return;
    }

    setIsLoading(true);

    try {
      // Call saveUserData with the form data and resume file
      await saveUserData(finalUserData, finalResumeFile);
      
      navigate('/resume-analyzing', { 
        state: { 
          success: true,
          message: 'Profile saved successfully!' 
        } 
      });
    } catch (error) {

      console.error('Error in handleSubmit:', error);
      alert(`Failed to save profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    }
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      navigate('/resume-analyzing');
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #3E1E68 0%, #5D2F77 50%, #E45A92 100%)',
      padding: '2rem 1rem',
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
        {/* Progress Indicator */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.7)',
            fontWeight: '500',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Step 2 of 3 Onboarding
          </p>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginTop: '0.5rem',
            fontFamily: 'Teko, sans-serif',
            lineHeight: 1.2
          }}>
            You are really close to start your career journey!
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.8)',
            marginTop: '0.5rem'
          }}>
            Review your details before proceeding to the AI assessment
          </p>
        </div>

        {/* Main Content - Two Panel Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
          animation: 'fadeIn 0.8s ease-out 0.2s both'
        }}>
          {/* Left Panel - Verify Information */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transition: 'all 0.3s ease'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1.5rem',
              fontFamily: 'Teko, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{
                width: '4px',
                height: '1.5rem',
                background: 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)',
                borderRadius: '2px'
              }}></span>
              Verify Your Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Full Name */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  Full Name
                </label>
                <p style={{
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {finalUserData.fullName}
                </p>
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  Email Address
                </label>
                <p style={{
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  wordBreak: 'break-all'
                }}>
                  {finalUserData.email}
                </p>
              </div>

              {/* Industry */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  Field / Industry
                </label>
                <p style={{
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {finalUserData.industry}
                </p>
              </div>

              {/* Intended Role */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  Intended Role / Occupation
                </label>
                <p style={{
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {finalUserData.intendedJob}
                </p>
              </div>

              {/* Gender */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  Gender
                </label>
                <p style={{
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {finalUserData.gender}
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1.5rem',
              fontFamily: 'Teko, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{
                width: '4px',
                height: '1.5rem',
                background: 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)',
                borderRadius: '2px'
              }}></span>
              Resume Preview
            </h2>

            {finalResumeFile ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {isPdf ? (
                  <>
                    <iframe
                      src={resumeUrl || ''}
                      style={{
                        width: '100%',
                        height: '600px',
                        borderRadius: '0.75rem',
                        border: '2px solid rgba(255,255,255,0.2)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        marginBottom: '1rem'
                      }}
                      title="Resume Preview"
                    />
                    <a
                      href={resumeUrl || ''}
                      download={finalResumeFile.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#FFACAC',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        textDecoration: 'none',
                        transition: 'all 0.3s',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'rgba(255, 172, 172, 0.1)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 172, 172, 0.3)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLAnchorElement).style.backgroundColor = 'rgba(255, 172, 172, 0.2)';
                        (e.target as HTMLAnchorElement).style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLAnchorElement).style.backgroundColor = 'rgba(255, 172, 172, 0.1)';
                        (e.target as HTMLAnchorElement).style.transform = 'translateX(0)';
                      }}
                    >
                      <Download size={16} />
                      Download Resume
                    </a>
                  </>
                ) : (
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '0.75rem',
                    border: '2px dashed rgba(255,255,255,0.2)',
                    padding: '2rem'
                  }}>
                    <FileText size={48} color="#FFACAC" style={{ marginBottom: '1rem' }} />
                    <p style={{
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '500',
                      marginBottom: '0.5rem',
                      textAlign: 'center'
                    }}>
                      {finalResumeFile.name}
                    </p>
                    <p style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '0.875rem',
                      textAlign: 'center'
                    }}>
                      {(finalResumeFile.size / 1024).toFixed(2)} KB
                    </p>
                    <a
                      href={resumeUrl || ''}
                      download={finalResumeFile.name}
                      style={{
                        marginTop: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#FFACAC',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        textDecoration: 'none',
                        transition: 'all 0.3s',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'rgba(255, 172, 172, 0.1)',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 172, 172, 0.3)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLAnchorElement).style.backgroundColor = 'rgba(255, 172, 172, 0.2)';
                        (e.target as HTMLAnchorElement).style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLAnchorElement).style.backgroundColor = 'rgba(255, 172, 172, 0.1)';
                        (e.target as HTMLAnchorElement).style.transform = 'scale(1)';
                      }}
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '0.75rem',
                border: '2px dashed rgba(255,255,255,0.2)',
                padding: '2rem'
              }}>
                <FileText size={48} color="rgba(255,255,255,0.3)" style={{ marginBottom: '1rem' }} />
                <p style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  No resume uploaded
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          animation: 'fadeIn 1s ease-out 0.4s both'
        }}>
          {/* Back Button */}
          <button
            onClick={finalOnBack}
            disabled={isLoading}
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'Teko, sans-serif',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              opacity: isLoading ? 0.5 : 1,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)';
                (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)';
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)';
            }}
          >
            ← Back
          </button>

          {/* Confirm & Continue Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              padding: '0.875rem 2rem',
              background: isLoading 
                ? 'rgba(255,255,255,0.2)' 
                : 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'Teko, sans-serif',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              opacity: isLoading ? 0.7 : 1,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: isLoading 
                ? 'none' 
                : '0 0 30px rgba(228, 90, 146, 0.5)'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(228, 90, 146, 0.8)';
                (e.target as HTMLButtonElement).style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(228, 90, 146, 0.5)';
              (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            {isLoading ? 'Processing...' : 'Confirm & Continue →'}
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VerifyingPage;
