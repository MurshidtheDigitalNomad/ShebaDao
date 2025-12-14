import Navbar from "../Components/Landing Page/Navbar";
import Hero from "../Components/Landing Page/Hero";
import Features from "../Components/Landing Page/Features";
import HowItWorks from "../Components/Landing Page/HowItWorks";
import VisionQuote from "../Components/Landing Page/VisionQuote";

const Landing = () => {
    return (
      <div>
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        {/* <MeetTheTeam /> */}
        <VisionQuote />
        {/* <Footer /> */}
      </div>
    );
  };
  
  export default Landing;