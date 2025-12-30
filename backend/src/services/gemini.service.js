export const reviewCodeWithGemini = async ({ code, language }) => {
  try {
    const prompt = `
You are a senior software engineer.

Review the following ${language} code and provide structured feedback strictly in JSON format with these exact fields:

{
  "syntax_issues": [],
  "code_smells": [],
  "performance_issues": [],
  "readability_score": 0,
  "security_risks": [],
  "best_practices": [],
  "optimization_tips": []
}

Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY valid JSON, no markdown formatting or additional text.
`;

    console.log('📡 Calling Gemini 2.5 Flash API...');
    
    // Using gemini-2.5-flash - the latest and most capable model
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    
    // Check for API errors
    if (data.error) {
      console.error('❌ Gemini API Error:', data.error);
      throw new Error(data.error.message || 'Gemini API error');
    }

    // Extract text from response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error('No response from Gemini');
    }

    console.log('📄 Raw Gemini Response (first 100 chars):', text.substring(0, 100) + '...');
    
    // Clean up response - remove markdown code blocks if present
    let cleanedResponse = text.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '');
    }
    
    // Extract JSON if there's extra text
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Gemini response');
    }
    
    const parsedResponse = JSON.parse(jsonMatch[0]);
    console.log('✅ Code review completed successfully');
    
    return parsedResponse;
    
  } catch (error) {
    console.error('❌ Gemini Error:', error.message);
    throw new Error(`Failed to review code: ${error.message}`);
  }
};