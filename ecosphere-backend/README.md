# EcoSphere Backend API

Enterprise ESG & Sustainability Management Platform Backend.
Built for speed, scalability, and seamless integration with the EcoSphere React Frontend.

## 🚀 Tech Stack
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Database:** MongoDB Atlas / Local
- **ORM:** Mongoose
- **Authentication:** JWT & bcrypt
- **AI Integration:** Google Gemini API
- **File Gen:** PDFKit, json2csv

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in your keys (especially `GEMINI_API_KEY`).
```bash
cp .env.example .env
```

### 3. Seed Database
Automatically populate the DB with mock data matching the frontend state.
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Server runs on `http://localhost:5000`

## 🐳 Docker Deployment
You can run the entire stack (API + MongoDB) using Docker:
```bash
docker-compose up -d --build
```

## 📚 API Structure
- `/api/auth` - User Authentication
- `/api/settings` - Departments & Categories
- `/api/environmental` - Emission Factors, Carbon Tx, Goals
- `/api/social` - Gamification, CSR, Challenges
- `/api/governance` - Policies, Audits, Compliance
- `/api/notifications` - Real-time system alerts
- `/api/reports` - PDF & CSV Exports
- `/api/ai` - Gemini 1.5 ESG Advisor Chat

## 🧪 Testing with Postman
All routes expect `application/json`.
Protected routes require the header: `Authorization: Bearer <token>`
Get your token by POSTing to `/api/auth/login` with `email: admin@ecosphere.com` and `password: password123`.
