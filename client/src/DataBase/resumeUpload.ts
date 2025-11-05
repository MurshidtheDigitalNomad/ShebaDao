import { supabase } from './supabaseSetup';
import { extractResumeText } from '../Utils/extractResume';
import { ParseResume } from '../Utils/parseResumeClient';

interface FormData {
  fullName: string;
  email: string;
  industry: string;
  intendedJob: string;
  gender: string;
}

async function saveUserData(formData: FormData, file: File): Promise<void> {
  try {
    // 1️⃣ Upload resume file to Supabase storage
    const fileName = `${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('resume')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: fileUrlData } = supabase.storage
      .from('resume')
      .getPublicUrl(fileName);

    const resumeUrl = fileUrlData.publicUrl;

    // 4️⃣ Insert single DB row
    const { data: userData, error: insertError } = await supabase
      .from('users_shebadao_mvp')
      .insert([
        {
          fullname: formData.fullName,
          email: formData.email,
          industry: formData.industry,
          intendedjob: formData.intendedJob,
          gender: formData.gender,
          resumeurl: resumeUrl
        }
      ])
      .select('id')
      .single();

    if (insertError) throw insertError;

    //get user id

    let userId = userData.id;

    //extract resume text
    const rawText = await extractResumeText(file);

    //parse resume text
    const parsedJson = await ParseResume(rawText);

    //insert parsed resume
    const { error: insertParsedError } = await supabase
      .from('parsed_resume')
      .insert([
        {
          user_id: userId,
          file_path: fileName,
          raw_text: rawText,
          parsed_json: parsedJson,
          status: 'parsed'
        }
      ]);

    if (insertParsedError) throw insertParsedError;
      

    console.log("✅ Resume processed & stored!");

  } catch (err) {
    console.error("Error:", err);
    throw new Error("Resume processing failed — try again");
  }
}

export default saveUserData;
