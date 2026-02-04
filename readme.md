# 🏥 MediSlot – Smart Hospital Appointment Booking Platform

MediSlot is a **full‑stack hospital appointment booking system** with an **AI‑powered chat assistant** that helps patients identify the right doctor based on their symptoms and book appointments seamlessly using **text or voice**.

The platform supports **patients, hospitals, and doctors**, and is designed with scalability, real‑world workflows, and modern UI/UX in mind.

---

## 🚀 Key Features

### 👤 Patient Features
- 🔍 Search doctors by **specialization, hospital, location**
- 📅 View **date‑wise doctor availability**
- 🧠 **AI Chat Assistant** (Text + Voice)
  - Ask medical questions
  - Describe symptoms (e.g., *"fits"*)
  - AI suggests correct specialization (e.g., *Neurology*)
  - Displays matching doctors directly in chat
- 🩺 Book appointments with problem description
- 📄 View & cancel booked appointments

### 🏥 Hospital Features
- 🔐 Secure hospital login
- ➕ Add / update / delete doctors
- 🗓️ Set doctor availability
- 📊 View **date‑wise appointments**
- 👥 See patient details and problems

### 👨‍⚕️ Doctor Management
- Specialization, experience, designation
- Availability days & time
- Maximum slots per day

---

## 🤖 AI Chat Assistant (Core Highlight)

The AI assistant uses **Groq LLM (LLaMA‑3.3‑70B‑Versatile)** to:

1. Understand patient symptoms (text or voice)
2. Decide intent:
   - Normal medical query
   - Appointment booking
3. Extract correct **medical specialization**
4. Fetch matching doctors from database
5. Display **scrollable doctor cards inside chat UI**
6. Redirect user to booking page

### Example Flow
```
User: which doctor should I consult for fits?
AI: You should consult a Neurology doctor.
→ Neurologist cards displayed
→ Click → Book Appointment
```

---

## 🧑‍💻 Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🔊 Web Speech API (Voice input)
- 🔔 react-hot-toast
- 🔗 Axios

### Backend
- ⚡ FastAPI
- 🍃 MongoDB (PyMongo)
- 🔐 JWT Authentication
- 🌐 REST APIs

### AI / NLP
- 🧠 Groq API
- 🤖 Model: `llama-3.3-70b-versatile`

---

## 📂 Project Structure

```
MediSlot/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── doctor.py
│   │   │   ├── appointment.py
│   │   │   ├── availability.py
│   │   │   └── ai_chat.py
│   │   ├── schemas/
│   │   ├── services/
│   │   │   └── groq_service.py
│   │   └── utils/
│   │       └── dependencies.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   └── AppointmentsManager.jsx
│   │   ├── components/
│   │   │   └── ChatAssistant.jsx
│   │   ├── services/api.js
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`.env`)
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medislot
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

---

## ▶️ Running the Project

### 1️⃣ Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:
```
http://127.0.0.1:8000
```

---

### 2️⃣ Frontend Setup
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

## 🔐 Authentication & Roles

- **Patient** → Book appointments, chat with AI
- **Hospital** → Manage doctors & appointments

JWT tokens are stored in `localStorage` and attached to API requests.

---

## 🧪 Sample AI Prompts

- "Which doctor should I consult for chest pain?"
- "I am having fits and seizures"
- "Suggest a doctor for knee pain"
- "What are the symptoms of diabetes?"

---

## 🌟 Future Enhancements

- 🎙️ Full voice‑based booking flow
- 📍 Location‑based doctor ranking
- 🧠 Follow‑up AI questions before booking
- 📆 Slot selection inside chat
- 📱 Mobile‑first PWA

---

## 👨‍🎓 Author

**Chandra Sekhar Arasavalli**  
B.Tech Computer Science (2022–2026)  
Full‑Stack | AI | ML | Cloud Enthusiast

---

## 📜 License

This project is licensed for **educational and demonstration purposes**.

---

⭐ If you like this project, consider starring it on GitHub and extending it further!

