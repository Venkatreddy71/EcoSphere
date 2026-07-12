import 'dotenv/config';
import aiService from './src/services/ai.service.js';

async function test() {
  try {
    const data = { emissions: 1000, issues: 5, goals: 2 };
    console.log('Testing recommendation...');
    const result = await aiService.getRecommendation(data);
    console.log('Result:', result);
  } catch (error) {
    console.error('Test Failed:', error);
  }
}

test();
