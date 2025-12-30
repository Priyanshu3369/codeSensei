// testModels.js
import dotenv from 'dotenv';
import fetch from "node-fetch";

dotenv.config();

console.log('=== DEBUGGING API KEY ===');
console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
console.log('API Key length:', process.env.GEMINI_API_KEY?.length);
console.log('API Key first 20 chars:', process.env.GEMINI_API_KEY?.substring(0, 20));
console.log('API Key last 5 chars:', process.env.GEMINI_API_KEY?.slice(-5));
console.log('Has whitespace?', /\s/.test(process.env.GEMINI_API_KEY || ''));
console.log('========================\n');

const listModels = async () => {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim(); // Trim any whitespace
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
    
    console.log('Making request to:', url.replace(apiKey, 'API_KEY_HIDDEN'));
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error("Error response:", JSON.stringify(data, null, 2));
      return;
    }
    
    console.log("Available models:");
    console.log(JSON.stringify(data, null, 2));
    
    const contentModels = data.models?.filter(m => 
      m.supportedGenerationMethods?.includes('generateContent')
    );
    
    console.log("\n\nModels supporting generateContent:");
    contentModels?.forEach(m => console.log(`- ${m.name}`));
    
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

listModels();