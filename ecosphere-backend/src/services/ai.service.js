import { GoogleGenerativeAI } from '@google/generative-ai';

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async getAdvice(prompt, context = []) {
    try {
      const chat = this.model.startChat({
        history: context.map(msg => ({
          role: msg.role === 'ai' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const systemPrompt = `You are an expert ESG (Environmental, Social, and Governance) advisor for an enterprise platform called EcoSphere. Provide concise, actionable, and professional advice. 
User query: ${prompt}`;

      const result = await chat.sendMessage(systemPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Service Error:', error);
      return "I'm currently unable to process your request. Please ensure the API key is configured correctly.";
    }
  }
}

export default new AIService();
