import { ExternalLink, Star } from 'lucide-react';
import { ProvideJobRecommendations } from '../../Utils/provideJobRecommendations';
import {useState, useEffect} from 'react';
 
const JobList = () => {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const loadJobs = async () => {
      try {
        const jobs = await ProvideJobRecommendations(userId!);
        setJobs(jobs);
      } catch (err) {
        console.error('Error loading jobs:', err);
      }
    };
    loadJobs();
  }, []);

    return (
      <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'white',
          fontFamily: 'Teko, sans-serif',
          marginBottom: '1.5rem'
        }}>
          Recommended Jobs for You
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Match Percentage Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                padding: '0.5rem 1rem',
                background: `linear-gradient(135deg, ${job.matchPercentage >= 90 ? '#FFACAC' : job.matchPercentage >= 85 ? '#E45A92' : '#5D2F77'} 0%, ${job.matchPercentage >= 90 ? '#E45A92' : job.matchPercentage >= 85 ? '#5D2F77' : '#3E1E68'} 100%)`,
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Star size={16} fill="white" />
                {job.matchPercentage}% Match
              </div>
  
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: 'white',
                  fontFamily: 'Teko, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  {job.title}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.875rem'
                }}>
                  <span>{job.company}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderRadius: '9999px',
                    color: '#3b82f6'
                  }}>
                    {job.type}
                  </span>
                </div>
              </div>
  
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '1rem',
                lineHeight: 1.6,
                fontWeight: '400'
              }}>
                {job.description}
              </p>
  
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '1rem'
              }}>
                {job.skills.map((skill:string, index: number) => (
                  <span
                    key={index}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      borderRadius: '0.5rem',
                      color: '#a78bfa',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
  
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.125rem' }}>
                  {job.salary}
                </div>
                <button
                  style={{
                    padding: '0.75rem 2rem',
                    background: 'linear-gradient(135deg, #E45A92 0%, #5D2F77 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(93, 47, 119, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Apply Now
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default JobList;