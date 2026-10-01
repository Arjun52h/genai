# 🤖 GenAI Interview Preparation Platform

An AI-powered interview preparation platform that helps candidates prepare for technical interviews by analyzing their **resume, candidate profile, and job description** and generating personalized interview questions, preparation guidance, and interview reports.

The platform uses **Google Gemini AI** to generate relevant interview content based on the candidate's background and target role.

---

## 🚀 Features

* 📄 **Resume-Based Analysis**

  * Analyze candidate resumes and extract relevant skills, projects, and experience.
  * Generate interview preparation based on the candidate's profile.

* 🎯 **Job Description Analysis**

  * Analyze a target job description.
  * Identify important skills, technologies, and requirements.

* 🤖 **AI-Generated Interview Questions**

  * Generate personalized technical and role-specific interview questions.
  * Questions are tailored using the candidate's resume and job description.

* 💡 **Personalized Preparation**

  * Helps candidates identify areas they should prepare for before an interview.
  * Provides relevant questions based on their skills and experience.

* 📊 **AI Interview Report**

  * Generate an AI-powered report based on interview responses.
  * Provides structured feedback and preparation insights.

* 🔐 **Secure Backend**

  * Node.js and Express backend handles API requests and AI integration.
  * MongoDB Atlas is used for data storage.

* 📱 **Responsive UI**

  * Built with React and designed to work across desktop and mobile screen sizes.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### AI

* Google Gemini API
* `@google/genai`

### Validation & Data Processing

* Zod
* Zod-to-JSON-Schema

### Deployment

* Vercel — Frontend
* Render — Backend

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React + Vite UI    │
                    └──────────┬───────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Node.js + Express    │
                    │      Backend         │
                    └───────┬───────┬──────┘
                            │       │
                ┌───────────┘       └────────────┐
                ▼                                ▼
      ┌──────────────────┐             ┌──────────────────┐
      │  Google Gemini   │             │   MongoDB Atlas   │
      │       AI         │             │     Database      │
      └──────────────────┘             └──────────────────┘
```

---

## 📂 Project Structure

```text
genai-interview-platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> The exact folder structure may vary depending on the current implementation.

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Arjun52h/genai.git
cd genai
```

---

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key
```

### Example

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interview-platform
GEMINI_API_KEY=your_api_key
```

**Never commit your `.env` file or API keys to GitHub.**

---

## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will usually be available at:

```text
http://localhost:5173
```

---

## 🔄 Application Workflow

```text
1. User enters candidate information
              ↓
2. User provides/uploads resume
              ↓
3. User provides target job description
              ↓
4. Frontend sends data to backend
              ↓
5. Backend validates the request
              ↓
6. Gemini AI analyzes the information
              ↓
7. AI generates personalized questions
              ↓
8. User practices the interview
              ↓
9. Responses are evaluated
              ↓
10. AI-generated interview report
              ↓
11. Feedback & preparation areas
```

---

## 🧠 AI Integration

The application uses Google's Gemini models to generate personalized interview content.

The backend sends structured candidate information to the Gemini API, including:

* Candidate profile
* Resume information
* Technical skills
* Projects
* Experience
* Target job description

The AI then generates relevant interview questions and structured interview feedback.

Structured AI responses are validated using **Zod** to ensure that the generated data follows the expected format.

---

## 📊 Example Use Case

A candidate applying for a **Full Stack Developer** position can provide:

### Candidate Skills

```text
React.js
Node.js
Express.js
MongoDB
JavaScript
REST APIs
```

### Job Description

```text
Looking for a Full Stack Developer with experience
in React, Node.js, MongoDB and REST APIs.
```

The platform can generate questions such as:

```text
1. Explain the difference between MongoDB and SQL databases.

2. How does the React component lifecycle work?

3. How would you design a REST API using Express.js?

4. How would you handle authentication in a
   Node.js application?

5. Explain a challenging project you have worked on.
```

The questions are generated according to the candidate's profile and target role rather than using only a fixed question bank.

---

## 🧪 Validation

The project uses **Zod** for validating structured data received from the AI service.

This helps ensure that AI-generated responses follow the expected schema before being processed by the application.

```text
Gemini Response
       ↓
Structured Output
       ↓
Zod Validation
       ↓
Application
```

---

## 🌐 Deployment

### Frontend

The React frontend can be deployed using **Vercel**.

### Backend

The Node.js/Express backend can be deployed using **Render**.

The deployed frontend communicates with the backend through REST APIs.

---

## 🔒 Security Considerations

* API keys are stored in environment variables.
* `.env` files are excluded from Git using `.gitignore`.
* Backend APIs validate incoming data.
* AI-generated structured responses are validated before use.
* Database credentials are not exposed to the frontend.

---

## 🔮 Future Improvements

* 🎙️ Voice-based mock interviews
* 🗣️ Speech-to-text interview responses
* 📈 Interview performance tracking
* 📚 Personalized preparation roadmap
* 🧑‍💻 Coding interview support
* 📊 Skill-gap analysis
* 🏆 Interview performance history
* 🔐 User authentication and profiles
* 📄 Automatic resume parsing
* 💬 Real-time AI interviewer
* 🎥 Video interview mode

---

## 📌 Key Learning Outcomes

Through this project, I worked with:

* Building a full-stack React application
* Designing REST APIs using Node.js and Express
* Integrating Generative AI into a web application
* Working with Google Gemini API
* MongoDB Atlas and database integration
* Structured AI responses using Zod
* Frontend-backend communication
* Environment variable management
* API debugging and deployment
* CORS configuration
* Deploying frontend and backend separately

---

## 👨‍💻 Author

**Arjun Gautam**

B.Tech — Computer Science & Artificial Intelligence

GitHub: [Arjun52h](https://github.com/Arjun52h)

---

## ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.
