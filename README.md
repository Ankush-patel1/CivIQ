# CivIQ - AI-Powered Civic Assistant for Indian Elections

CivIQ is a modern, full-stack web application designed to empower Indian citizens with accurate, context-aware information about the electoral process. Leveraging Google's Gemini Pro AI, CivIQ provides an interactive platform for voters to understand their rights, find polling information, and navigate the complexities of the democratic process.

## 🚀 Key Features

- **AI-Powered Chat**: Ask anything about Indian elections, voter registration, or candidate profiles.
- **Context-Aware Information**: Specifically tailored for the Indian democratic landscape.
- **Premium User Interface**: A sleek, responsive design built with React and Tailwind CSS.
- **FastAPI Backend**: High-performance asynchronous API handling for real-time AI interactions.
- **Accessibility Focused**: Built with ARIA standards to ensure inclusivity for all users.

## 🛠️ Technology Stack

- **Frontend**: 
  - React 19 (Vite)
  - Tailwind CSS 4
- **Backend**:
  - FastAPI (Python 3.12)
  - Google Gemini API
- **Deployment**:
  - Docker
  - Google Cloud Run

## 📦 Project Structure

```text
CivIQ/
├── backend/            # FastAPI application
├── frontend/           # React application
├── Dockerfile          # Container configuration
└── .env                # Environment variables
```

## ⚙️ Local Development Setup

### 1. Prerequisites
- Python 3.12+
- Node.js 18+
- Google Gemini API Key

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Create .env with GOOGLE_API_KEY=your_key
python main.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🚢 Deployment (Docker)

```bash
# Build frontend
cd frontend && npm run build && cd ..

# Build and run Docker
docker build -t civiq-app .
docker run -p 8080:8080 -e GOOGLE_API_KEY=your_key civiq-app
```

## 📜 License

Distributed under the MIT License.
