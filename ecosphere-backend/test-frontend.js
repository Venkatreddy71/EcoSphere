const fetch = globalThis.fetch;

async function test() {
  try {
    console.log("Mocking login...");
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@ecosphere.com', password: 'password123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.data?.token;

    if (!token) {
      console.log('Login failed:', loginData);
      return;
    }

    console.log("Testing recommend...");
    const recommendRes = await fetch('http://localhost:5000/api/ai/recommend', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('Recommend Status:', recommendRes.status);
    const recommendData = await recommendRes.json();
    console.log('Recommend Data:', recommendData);

  } catch (err) {
    console.error(err);
  }
}

test();
