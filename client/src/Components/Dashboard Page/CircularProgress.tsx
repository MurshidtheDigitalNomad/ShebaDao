import { generateSkillReport } from "../../Utils/generateSkillReport";
import { useEffect, useState } from "react";

const CircularProgress = ({ percentage }: { percentage: number }) => {
    const circumference = 2 * Math.PI * 70;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const [skillScore, setSkillScore] = useState(0);

    useEffect(() => {
        const getSkillScore = async () => {
            const userId = localStorage.getItem('id');
            const score = await generateSkillReport(userId!);
            setSkillScore(score);
        }
        getSkillScore();
    }, []);
  
    return (
      <div style={{ position: 'relative', width: '180px', height: '180px', marginLeft: '30px'}}>
        <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="90"
            cy="90"
            r="70"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="90"
            cy="90"
            r="70"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E45A92" />
              <stop offset="100%" stopColor="#FFACAC" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'Teko, sans-serif'
          }}>
            {skillScore}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', marginTop: '-0.5rem' }}>
            Score
          </div>
        </div>
      </div>
    );
  };


export default CircularProgress;
