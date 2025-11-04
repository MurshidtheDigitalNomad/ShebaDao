import { supabase } from './supabaseSetup';

interface FormData {
  fullName: string;
  email: string;
  industry: string;
  intendedJob: string;
  gender: string;
  [key: string]: string;
}

async function saveUserData(formData: FormData, file: File): Promise<void> {
  try {
    // Generate a unique file name
    const fileName = `${Date.now()}_${file.name}`;

    // Upload file to Supabase Storage (private bucket)
    const { error: uploadError } = await supabase.storage
      .from('resume')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    // Get public URL for the uploaded file
    const { data: signedUrlData } =  supabase.storage
      .from('resume')
      .getPublicUrl(fileName);

    const resumeUrl = signedUrlData.publicUrl;

    // Save user info + signed resume URL to Supabase DB
    const { error: dbError } = await supabase
      .from('users_shebadao_mvp')
      .insert([{
        fullname: formData.fullName,
        email: formData.email,
        industry: formData.industry,
        intendedjob: formData.intendedRole,
        gender: formData.gender,
        resumeurl: resumeUrl,
      }]);

    if (dbError) throw dbError;

  } catch (err) {
    console.error('Error saving data:', err);
    throw err;
  }
}

export default saveUserData;
