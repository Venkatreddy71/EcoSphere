import 'dotenv/config';
import { recommend, forecast } from './src/controllers/ai.controller.js';

async function test() {
  const req = { user: { id: 'test_user_id' } };
  const res = {
    json: (data) => console.log('Response JSON:', data),
    status: (code) => {
      console.log('Response Status:', code);
      return { json: (data) => console.log('Response JSON:', data) };
    }
  };
  const next = (err) => console.error('Next Error:', err);

  console.log('Testing recommend...');
  await recommend(req, res, next);
  
  console.log('Testing forecast...');
  await forecast(req, res, next);
}

test();
