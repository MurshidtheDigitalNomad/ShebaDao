import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResumeAnalysisAnimation.css";

interface Props {
  duration?: number; // in ms
}

const ResumeAnalysis = ({ duration = 6500 }: Props) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
    }, intervalTime);

    const timeout = setTimeout(() => {
      navigate("/ai-test-start");
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, navigate]);

  return (
    <div className="analysis-container">
      <div className="analysis-animation">
        <div className="magnifying-glass"></div>
        <div className="resume-lines"></div>
      </div>
      <h2>Our AI analyzes your resume in 5 key areas:</h2>
      <ul>
        <li>Skills & Experience</li>
        <li>Education</li>
        <li>Projects & Achievements</li>
        <li>Soft Skills & Communication</li>
        <li>Career Fit & Intent</li>
      </ul>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
