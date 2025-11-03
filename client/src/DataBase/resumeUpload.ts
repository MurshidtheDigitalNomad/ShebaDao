import { db, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface FormData {
  fullName: string;
  email: string;
  intendedJob: string;
  [key: string]: string;
}

async function saveUserData(formData: FormData, file: File): Promise<void> {
  try {
    // Upload resume to Firebase Storage
    const storageRef = ref(storage, `resumes/${file.name}_${Date.now()}`);
    await uploadBytes(storageRef, file);

    // Get the downloadable URL
    const resumeUrl = await getDownloadURL(storageRef);

    // Save form data + resume URL to Firestore
    await addDoc(collection(db, "users_shebadao_mvp"), {
      fullName: formData.fullName,
      email: formData.email,
      intendedJob: formData.intendedJob,
      resumeUrl: resumeUrl,
      createdAt: Timestamp.now(),
    });

    alert("Profile saved successfully!");
  } catch (err) {
    console.error("Error saving data:", err);
    alert("Failed to save profile. Check console.");
  }
}

export default saveUserData;
