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

  async getRecommendation(contextData) {
    try {
      const prompt = `Based on the following ESG context for an enterprise:
      Emissions: ${contextData.emissions} co2e
      Active Compliance Issues: ${contextData.issues}
      Active Goals: ${contextData.goals}
      Provide 3 highly actionable, specific recommendations to improve their ESG score. Format as a bulleted list.`;
      
      const result = await this.model.generateContent(prompt);
      return (await result.response).text();
    } catch (error) {
      console.error('AI Service Error:', error);
      return "Unable to generate recommendations at this time.";
    }
  }

  async getRiskAnalysis(contextData) {
    try {
      const prompt = `Based on the following ESG data:
      Emissions: ${contextData.emissions} co2e
      Active Compliance Issues: ${contextData.issues}
      Provide a concise risk analysis summary highlighting potential regulatory, financial, and reputational risks.`;
      
      const result = await this.model.generateContent(prompt);
      return (await result.response).text();
    } catch (error) {
      console.error('AI Service Error:', error);
      return "Unable to generate risk analysis at this time.";
    }
  }

  async getForecast(historicalData) {
    try {
      const prompt = `Based on this historical emissions data: ${JSON.stringify(historicalData)}. 
      Forecast the emissions for the next quarter. Provide a brief explanation of the trend.`;
      
      const result = await this.model.generateContent(prompt);
      return (await result.response).text();
    } catch (error) {
      console.error('AI Service Error:', error);
      return "Unable to generate forecast at this time.";
    }
  }
}

export default new AIService();
