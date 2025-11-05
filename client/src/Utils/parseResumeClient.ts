import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function ParseResume(text: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Extract structured info from this resume text. 

Fields to extract:

- full_name
- email
- phone
- skills (as array)
- experience_summary (2-3 lines)
- predicted_role
- education

Return ONLY valid JSON. No backticks, no markdown formatting.

Resume text:
${text}
`;

    const result = await model.generateContent(prompt);
    let output = result.response.text();

    // Remove markdown JSON block if present
    output = output.replace(/```json/gi, "").replace(/```/g, "").trim();

    return JSON.parse(output);
  } catch (e: any) {
    console.error("ParseResume Error:", e);

    throw new Error("AI resume parsing failed — please try again.");
  }
}
