# EcoSphere

EcoSphere is a modern, enterprise-grade Environmental, Social, and Governance (ESG) platform. It helps organizations seamlessly track carbon emissions, monitor compliance, manage CSR initiatives, and gain actionable sustainability insights powered by Artificial Intelligence.

---

## 🌟 Key Features

- **Real-Time ESG Dashboard:** Track total emissions, compliance issues, and active sustainability goals in real-time.
- **AI Advisor (Powered by Groq & Llama 3):** 
  - Chat with an expert AI about ESG strategies.
  - Automatically generate actionable ESG recommendations.
  - Perform risk analysis based on your company's current metrics.
  - Forecast future carbon emissions based on historical transaction data.
- **Carbon Transactions:** Log and track CO2e emissions across different scopes, departments, and products.
- **Compliance & Audits:** Schedule environmental audits and track compliance issues to resolution.
- **CSR & Employee Engagement:** Create Corporate Social Responsibility (CSR) activities and challenges. Reward employees with points, XP, and badges.
- **Document Intelligence:** Upload ESG reports and extract key metrics automatically using OCR.
- **Real-time Collaboration:** Powered by Socket.io, providing live notifications and live dashboard updates across the enterprise.

---

## 🧠 How It Works & Architecture Explanation

EcoSphere is built on a decoupled Client-Server architecture designed for scalability, real-time interactivity, and enterprise data security.

### 1. Frontend Client (`ecosphere-client`)
The user interface is a Single Page Application (SPA) built using **React** and **Vite**. 
- **State & UI:** It securely stores the user's JWT (JSON Web Token) in local storage after login to maintain session state. 
- **Real-Time Data:** It uses `socket.io-client` to maintain a persistent WebSocket connection to the server, instantly reflecting changes across the enterprise without needing a page refresh.
- **AI Integration:** The frontend handles interactions with the AI Advisor via a dedicated chat drawer. The "Recommend", "Risk", and "Forecast" buttons trigger specific contextual prompts behind the scenes.

### 2. Backend API (`ecosphere-backend`)
The backend is a RESTful API built on **Node.js** and **Express.js**.
- **Data Layer:** It uses **Prisma ORM** to define structured, type-safe interactions with the **PostgreSQL** database. The database securely houses users, carbon transactions, compliance issues, and conversation history.
- **Security Middleware:** All secure endpoints are wrapped in a `protect` middleware that validates the incoming JWT.
- **AI Service Engine:** The `ai.service.js` module handles communication with the **Groq API**. When you ask the AI for a recommendation, the backend aggregates your actual enterprise data (like total emissions, open compliance issues, and active goals) via Prisma, injects it into an optimized system prompt, and sends it to the Llama-3 model for processing. The insights are then streamed back to the client.

### 3. The Data Flow
1. **User Action:** A user logs a new carbon transaction on the frontend.
2. **API Request:** An authenticated HTTP POST request is sent to the backend.
3. **Database Write:** The backend Express controller handles the request, validates the data, and writes the transaction to PostgreSQL via Prisma.
4. **Real-Time Sync:** The backend emits a `socket.io` event (`transaction_added`) to all connected enterprise clients.
5. **AI Context:** When the user subsequently asks the AI Advisor for an emissions forecast, the backend dynamically queries the latest transactions from PostgreSQL, feeds the historical timeline into Groq's LLM, and returns a predictive forecast.

---

## 🏗️ Tech Stack

### Frontend (ecosphere-client)
- **Framework:** React 19 + Vite
- **Styling:** Custom CSS (Modern, Responsive, Glassmorphism)
- **Real-time:** Socket.io-client
- **Icons & Assets:** Lucide React (or equivalent modern icons)

### Backend (ecosphere-backend)
- **Server:** Node.js + Express.js
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **AI Integration:** Groq SDK (Llama-3.3-70b-versatile)
- **Authentication:** JSON Web Tokens (JWT)
- **Real-time:** Socket.io

---

## 📂 Project Structure

```text
EcoSphere/
│
├── ecosphere-client/       # React + Vite Frontend Application
│   ├── src/                # React components, styles, and assets
│   ├── package.json
│   └── vite.config.js
│
├── ecosphere-backend/      # Node.js + Express Backend API
│   ├── prisma/             # Prisma schema and migrations
│   ├── src/
│   │   ├── controllers/    # API Request handlers
│   │   ├── routes/         # Express routes (AI, Auth, ESG, etc.)
│   │   ├── services/       # Core business logic (AI Service, etc.)
│   │   └── middleware/     # Auth and Error handling
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point & Socket.io initialization
│   └── package.json
│
└── README.md               # You are here!
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

### 1. Clone the repository

```bash
git clone https://github.com/Venkatreddy71/EcoSphere.git
cd EcoSphere
```

### 2. Backend Setup

```bash
cd ecosphere-backend
npm install
```

Create a `.env` file in the `ecosphere-backend` directory and configure the following:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/ecosphere?schema=public"
JWT_SECRET="your_jwt_secret"
GROQ_API_KEY="your_groq_api_key_here"
FRONTEND_URL="http://localhost:5173"
```

Run database migrations and start the server:

```bash
npx prisma generate
npx prisma db push
npm run dev
```

### 3. Frontend Setup

In a new terminal window:

```bash
cd ecosphere-client
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`.

---

## 💡 Usage

1. Open `http://localhost:5173` in your browser.
2. Log in using your enterprise credentials.
3. Use the **Dashboard** to get a bird's-eye view of your ESG metrics.
4. Click the **🤖 Floating AI Button** at the bottom right to open the AI Advisor drawer. You can chat directly or use the one-click "Recommend", "Risk Anal.", and "Forecast" tools.
5. Navigate to the **Transactions** or **Compliance** tabs to manage specific ESG records.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push your branch: `git push origin feature-name`
5. Open a Pull Request.

---

## 👥 Authors

**Venkat Reddy**
- GitHub: [Venkatreddy71](https://github.com/Venkatreddy71)

**Harsha Vardhan**
- GitHub: [harsha12886](https://github.com/harsha12886)

**Chidara Sahasra**
- GitHub: [chidarasahasra](https://github.com/chidarasahasra)

**Krishna Sahithi**
- Github:[krishna-sahithi](https://github.com/krishnasahithisuraboina7)

---

*If you found this project helpful, please consider giving it a ⭐ on GitHub. Together, we can build a greener future.*
