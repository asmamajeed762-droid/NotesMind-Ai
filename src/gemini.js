import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);


export const generateSummary = async (text) => {

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });


  const result = await model.generateContent(
    `Summarize this note in simple bullet points:\n${text}`
  );


  return result.response.text();

};