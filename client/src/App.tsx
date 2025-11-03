import './App.css'
import Landing from './routes/landingpage.route'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartProcess from './routes/startingpage.route';
import VerifyingPage from './Components/VerifyingPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/start" element={<StartProcess />} />
        <Route path="/verify" element={<VerifyingPage />} />
      </Routes>
    </Router>
  )
}

export default App
