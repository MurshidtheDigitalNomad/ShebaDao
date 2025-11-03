import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../Components/StartingPage/LoadingAnimation";
import StartingForm from "../Components/StartingPage/StartingForm";

function StartProcess() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleCompleteLoad = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (formData: { fullName: string; email: string; industry: string; intendedRole: string; gender: string }, file: File | null) => {
    console.log("User Data:", formData);
    console.log("Uploaded File:", file);
    // Navigate to verify page with form data and file
    navigate("/verify", { state: { userData: formData, resumeFile: file } });
  };

  return (
    <>
      {!showForm && <LoadingAnimation onComplete={handleCompleteLoad} />}
      {showForm && <StartingForm onSubmit={handleFormSubmit} />}
    </>
  );
}

export default StartProcess;