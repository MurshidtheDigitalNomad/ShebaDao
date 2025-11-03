import  { useState, useEffect } from 'react';
import {ArrowRight } from 'lucide-react';
import FileUpload from './FileUpload';

interface StartingFormProps {
  onSubmit: (formData: { fullName: string; email: string; industry: string; intendedRole: string; gender: string }, file: File | null) => void;
}

const StartingForm = ({ onSubmit }: StartingFormProps) => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      industry: '',
      intendedRole: '',
      gender: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
  
    useEffect(() => {
      const stepTimer = setTimeout(() => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
      }, 200 * currentStep);
      return () => clearTimeout(stepTimer);
    }, [currentStep]);
  
    const handleSubmit = () => {
      if (formData.fullName && formData.email && formData.industry && formData.intendedRole && formData.gender && file) {
        onSubmit(formData, file);
      }
    };
  
    const industries = [
      'Technology',
      'Marketing & Sales',
      'Finance & Banking',
      'Healthcare',
      'Education',
      'Engineering',
      'Design & Creative',
      'Customer Service',
      'Other'
    ];
  
    const roles = [
      'Web Developer',
      'Graphic Designer',
      'Video Editor',
      'Digital Marketer',
      'Writer',
      'Other'
    ];
  
    const genders = ['Male', 'Female', 'Others'];
  
    const steps = [
      { num: 1, label: 'Provide Your Info', active: true },
      { num: 2, label: 'Verify Resume', active: false },
      { num: 3, label: 'Sit for our AI Test', active: false }
    ];
  
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
          maxWidth: '700px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            opacity: currentStep >= 0 ? 1 : 0,
            transform: currentStep >= 0 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out'
          }}>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1rem',
              fontFamily: 'Teko, sans-serif',
              lineHeight: 1.1
            }}>
              Kickstart Your Career Journey
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '0.5rem'
            }}>
              Tell us who you are — and witness the power of our AI unlocking your path to success
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#FFACAC',
              fontStyle: 'italic'
            }}>
              Remember, Your skills matter. And we're here to help you prove them.
            </p>
          </div>
  
          {/* Progress Steps */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            opacity: currentStep >= 1 ? 1 : 0,
            transform: currentStep >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.2s',
            flexWrap: 'wrap'
          }}>
            {steps.map((step, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                padding: '0.75rem 1.25rem',
                borderRadius: '9999px',
                border: step.active ? '2px solid #FFACAC' : '2px solid rgba(255,255,255,0.2)',
                boxShadow: step.active ? '0 0 20px rgba(255, 172, 172, 0.4)' : 'none'
              }}>
                <div style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  background: step.active ? 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)' : 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  fontFamily: 'Teko, sans-serif'
                }}>
                  {step.num}
                </div>
                <span style={{
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }} className="step-label">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
  
          {/* Form Container */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            opacity: currentStep >= 2 ? 1 : 0,
            transform: currentStep >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.4s'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Full Name */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  style={{
                    width: '95%',
                    padding: '0.875rem 1rem',
                    borderRadius: '0.75rem',
                    border: '2px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #FFACAC';
                    e.target.style.boxShadow = '0 0 20px rgba(255, 172, 172, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid rgba(255,255,255,0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
  
              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  style={{
                    width: '95%',
                    padding: '0.875rem 1rem',
                    borderRadius: '0.75rem',
                    border: '2px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #FFACAC';
                    e.target.style.boxShadow = '0 0 20px rgba(255, 172, 172, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid rgba(255,255,255,0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
  
              {/* Industry Dropdown */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  Field / Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    borderRadius: '0.75rem',
                    border: '2px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #FFACAC';
                    e.target.style.boxShadow = '0 0 20px rgba(255, 172, 172, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid rgba(255,255,255,0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="" style={{ backgroundColor: '#3E1E68', color: 'rgba(255,255,255,0.5)' }}>Select your field</option>
                  {industries.map((industry, index) => (
                    <option key={index} value={industry} style={{ backgroundColor: '#3E1E68', color: 'white' }}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Intended Role / Occupation Dropdown */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  Intended Role / Occupation
                </label>
                <select
                  value={formData.intendedRole === 'Other' ? 'Other' : formData.intendedRole}
                  onChange={(e) => setFormData({ ...formData, intendedRole: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    borderRadius: '0.75rem',
                    border: '2px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #FFACAC';
                    e.target.style.boxShadow = '0 0 20px rgba(255, 172, 172, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid rgba(255,255,255,0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="" style={{ backgroundColor: '#3E1E68', color: 'rgba(255,255,255,0.5)' }}>Select your intended role</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role} style={{ backgroundColor: '#3E1E68', color: 'white' }}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Role Input - Shows when "Other" is selected */}
              {formData.intendedRole === 'Other' && (
                <div>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    Please specify your intended role
                  </label>
                  <input
                    type="text"
                    value={formData.intendedRole === 'Other' ? '' : formData.intendedRole}
                    onChange={(e) => setFormData({ ...formData, intendedRole: e.target.value || 'Other' })}
                    placeholder="Enter your intended role"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '0.75rem',
                      border: '2px solid rgba(255,255,255,0.2)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '2px solid #FFACAC';
                      e.target.style.boxShadow = '0 0 20px rgba(255, 172, 172, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '2px solid rgba(255,255,255,0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              )}

              {/* Gender Dropdown */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    borderRadius: '0.75rem',
                    border: '2px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #FFACAC';
                    e.target.style.boxShadow = '0 0 20px rgba(255, 172, 172, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid rgba(255,255,255,0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="" style={{ backgroundColor: '#3E1E68', color: 'rgba(255,255,255,0.5)' }}>Select your gender</option>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender} style={{ backgroundColor: '#3E1E68', color: 'white' }}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* File Upload */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  Upload Resume
                </label>
                <FileUpload file={file} setFile={setFile} />
              </div>
  
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!formData.fullName || !formData.email || !formData.industry || !formData.intendedRole || !formData.gender || !file}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  background: formData.fullName && formData.email && formData.industry && formData.intendedRole && formData.gender && file 
                    ? 'linear-gradient(135deg, #FFACAC 0%, #E45A92 100%)' 
                    : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  cursor: formData.fullName && formData.email && formData.industry && formData.intendedRole && formData.gender && file ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s',
                  boxShadow: formData.fullName && formData.email && formData.industry && formData.intendedRole && formData.gender && file 
                    ? '0 0 30px rgba(228, 90, 146, 0.5)' 
                    : 'none',
                  fontFamily: 'Teko, sans-serif',
                  opacity: formData.fullName && formData.email && formData.industry && formData.intendedRole && formData.gender && file ? 1 : 0.5
                }}
                onMouseEnter={(e) => {
                  if (formData.fullName && formData.email && formData.industry && formData.intendedRole && formData.gender && file) {
                    (e.target as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(228, 90, 146, 0.8)';
                    (e.target as HTMLButtonElement).style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(228, 90, 146, 0.5)';
                  (e.target as HTMLButtonElement).style.transform = 'scale(1)';
                }}
              >
                Continue → Verify My Profile
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
  
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&display=swap');
          
          input::placeholder {
            color: rgba(255,255,255,0.5);
          }
          
          @media (max-width: 640px) {
            .step-label {
              font-size: 0.75rem;
            }
          }
        `}</style>
      </div>
    );
  };

export default StartingForm;
