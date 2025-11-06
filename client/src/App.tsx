import './App.css'
import Landing from './routes/landingpage.route'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartProcess from './routes/startingpage.route';
import VerifyingPage from './Components/VerifyingPage';
import ResumeAnalysisAnimation from './Components/TestInstructionPage/ResumeAnalysisAnimation';
import AITestInstruction from './Components/TestInstructionPage/AITestInstruction';
import AITestPage from './Components/TestPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/start" element={<StartProcess />} />
        <Route path="/verify" element={<VerifyingPage />} />
        <Route path="/resume-analyzing" element={<ResumeAnalysisAnimation />} />
        <Route path="/ai-test-instructions" element={<AITestInstruction />} />
        <Route path="/test" element={<AITestPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
