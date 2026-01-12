# 🚀 CodeSensei — AI Powered Code Review Platform

CodeSensei is a modern, full-stack web application that provides **AI-powered code reviews** using **Google Gemini**.  
It helps developers instantly analyze code quality, readability, performance, and best practices — all in one place.

🌐 **Live Demo:** https://code-sensei-ten.vercel.app/

---

## ✨ Features

- 🤖 **AI Code Review** powered by **Gemini 2.5 Flash**
- 🧠 Structured feedback (syntax, performance, readability, best practices)
- 🔐 Secure authentication (JWT-based login & register)
- 📊 User dashboard with review history
- ⚡ Fast & cost-effective AI integration (free-tier optimized)
- 🎨 Modern UI with animations (React + Tailwind)
- 📱 Fully responsive design
- 🌍 Deployed on **Vercel (Frontend)** & **Render (Backend)**

---

## 🛠 Tech Stack

### Frontend
- **React + Vite**
- **Tailwind CSS**
- **Axios**
- **Lucide Icons**
- **JWT Authentication**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Google Gemini API**
- **JWT**
- **CORS**

### Deployment
- **Frontend:** Vercel  
- **Backend:** Render  

---

## 📂 Project Structure
```bash
frontend/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── services/
 │   ├── App.jsx
 │   └── main.jsx
backend/
 ├── src/
 │   ├── routes/
 │   ├── controllers/
 │   ├── services/
 │   ├── utils/
 │   └── server.js
```

---

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

## ▶️ Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Priyanshu3369/codeSensei.git
cd codeSensei
```

### 2️⃣ Start Backend
```bash
cd backend
npm install
npm start
```

Backend runs at:
```
http://localhost:5000
```

### 3️⃣ Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🧪 API Example (Submit Code for Review)
```json
POST /review
Authorization: Bearer <JWT_TOKEN>

{
  "language": "javascript",
  "code": "function add(a, b) { return a + b; }"
}
```

### Sample Response
```json
{
  "syntax_issues": [],
  "code_smells": [],
  "performance_issues": [],
  "readability_score": 85,
  "security_risks": [],
  "best_practices": [],
  "optimization_tips": []
}
```

---

## 🧠 AI Model Used

**Gemini 2.5 Flash**
- ✅ Fast
- ✅ Cost-effective
- ✅ Free-tier friendly
- ✅ Structured JSON output enforced

---

## 👨‍💻 Author

**Priyanshu**  
- GitHub: [@Priyanshu3369](https://github.com/Priyanshu3369)
- LinkedIn: [Priyanshu ML](https://linkedin.com/in/priyanshu-ml)

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project:
- ⭐ Star the repository
- 🐛 Report issues
- 🚀 Suggest new features

**Happy Coding! 💚**
