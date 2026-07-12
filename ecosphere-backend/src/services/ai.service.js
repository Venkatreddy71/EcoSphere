import Groq from 'groq-sdk';

class AIService {
  constructor() {
    this.model = 'llama-3.3-70b-versatile';
  }

  getGroq() {
    return new Groq({
      apiKey: process.env.GROQ_API_KEY || 'dummy_key'
    });
  }

  async getAdvice(prompt, context = []) {
    try {
      const messages = [
        {
          role: 'system',
          content: 'You are an expert ESG (Environmental, Social, and Governance) advisor for an enterprise platform called EcoSphere. Provide concise, actionable, and professional advice.'
        },
        ...context.map(msg => ({
          role: msg.role === 'ai' || msg.role === 'model' ? 'assistant' : 'user',
          content: msg.content
        })),
        {
          role: 'user',
          content: prompt
        }
      ];

      const completion = await this.getGroq().chat.completions.create({
        messages,
        model: this.model,
        max_tokens: 1000
      });

      return completion.choices[0]?.message?.content || "No advice generated.";
    } catch (error) {
      console.error('Groq AI Service Error:', error);
      return "I'm currently unable to process your request. Please ensure your GROQ_API_KEY is configured correctly.";
    }
  }

  async getRecommendation(contextData) {
    try {
      const prompt = `Based on the following ESG context for an enterprise:
      Emissions: ${contextData.emissions} co2e
      Active Compliance Issues: ${contextData.issues}
      Active Goals: ${contextData.goals}
      Provide 3 highly actionable, specific recommendations to improve their ESG score. Format as a bulleted list.`;

      const completion = await this.getGroq().chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: this.model,
        max_tokens: 800
      });

      return completion.choices[0]?.message?.content || "Unable to generate recommendations.";
    } catch (error) {
      console.error('Groq AI Service Error:', error);
      return "Unable to generate recommendations at this time.";
    }
  }

  async getRiskAnalysis(contextData) {
    try {
      const prompt = `Based on the following ESG data:
      Emissions: ${contextData.emissions} co2e
      Active Compliance Issues: ${contextData.issues}
      Provide a concise risk analysis summary highlighting potential regulatory, financial, and reputational risks.`;

      const completion = await this.getGroq().chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: this.model,
        max_tokens: 800
      });

      return completion.choices[0]?.message?.content || "Unable to generate risk analysis.";
    } catch (error) {
      console.error('Groq AI Service Error:', error);
      return "Unable to generate risk analysis at this time.";
    }
  }

  async getForecast(historicalData) {
    try {
      const prompt = `Based on this historical emissions data: ${JSON.stringify(historicalData)}. 
      Forecast the emissions for the next quarter. Provide a brief explanation of the trend.`;

      const completion = await this.getGroq().chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: this.model,
        max_tokens: 800
      });

      return completion.choices[0]?.message?.content || "Unable to generate forecast.";
    } catch (error) {
      console.error('Groq AI Service Error:', error);
      return "Unable to generate forecast at this time.";
    }
  }
}

export default new AIService();
