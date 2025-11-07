import { Award, Info, TrendingUp } from 'lucide-react';
import {useState, useEffect} from 'react';
import {generateSkillReport, fetchIndividualScores, generateAIReport} from '../../Utils/generateSkillReport';


const SkillReport = () => {
    const [skillData, setSkillData] = useState({
        overallScore: 0,
        englishScore: 0,
        logicalScore: 0,
        technicalScore: 0
    });
    const [aiReport, setAIReport] = useState({
        english_feedback: '',
        logical_feedback: '',
        technical_feedback: '',
        summary: '',
    });

    useEffect(() => {
        const fetchSkillData = async () => {
            try {
                const userId = localStorage.getItem('id');
                const score = await generateSkillReport(userId!);
                const { english, logical, technical } = await fetchIndividualScores(userId!);
                setSkillData({
                    overallScore: score,
                    englishScore: english,
                    logicalScore: logical,
                    technicalScore: technical,
                });
            } catch (error) {
                console.error('Error fetching skill data:', error);
            }
        };
        fetchSkillData();
    }, []);

    useEffect(() => {
        const fetchAIReport = async () => {
            try {
                const userId = localStorage.getItem('id');
                const report = await generateAIReport(userId!);
                setAIReport(report);
            } catch (error) {
                console.error('Error fetching AI report:', error);
            }
        };
        fetchAIReport();
    }, []);

    return (
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1.5rem',
        padding: '2rem',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <Award size={24} color="#E45A92" />
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Teko, sans-serif'
          }}>
            Detailed Skill Report
          </h2>
          <div style={{ cursor: 'pointer', marginLeft: 'auto' }} title="Score calculated based on AI test performance">
            <Info size={18} color="rgba(255,255,255,0.5)" />
          </div>
        </div>
  
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }} className="skill-grid">
          {/* English Score */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '1rem',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                English Comprehension
              </div>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Teko, sans-serif' }}>
                {skillData.englishScore}%
              </div>
            </div>
          
          </div>
  
          {/* Logical Score */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem',
            backgroundColor: 'rgba(234, 179, 8, 0.1)',
            borderRadius: '1rem',
            border: '1px solid rgba(234, 179, 8, 0.2)'
          }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                Logical Analysis
              </div>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Teko, sans-serif' }}>
                {skillData.logicalScore}%
              </div>
            </div>
          </div>
  
          {/* Technical Score */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '1rem',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                Technical Skills
              </div>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Teko, sans-serif' }}>
                {skillData.technicalScore}%
              </div>
            </div>
          </div>
  
          {/* Readiness */}
          <div style={{
            padding: '1.25rem',
            background: 'linear-gradient(135deg, rgba(228, 90, 146, 0.2) 0%, rgba(255, 172, 172, 0.2) 100%)',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 172, 172, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Job Readiness
            </div>
            <div style={{
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: 'Teko, sans-serif',
              background: 'linear-gradient(135deg, #E45A92 0%, #FFACAC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {skillData.overallScore}%
            </div>
          </div>
        </div>
  
        {/* Improvement Suggestion */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem 1.25rem',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(249, 115, 22, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <TrendingUp size={20} color="#f97316" />
          <div>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
              Detailed Skill Report for you:
              <div style={{ color: 'white', fontWeight: 600, marginTop: '0.5rem' }}>
                <p>{aiReport.english_feedback}</p>
                <p>{aiReport.logical_feedback}</p>
                <p>{aiReport.technical_feedback}</p>
                <p>{aiReport.summary}</p>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  };

export default SkillReport;