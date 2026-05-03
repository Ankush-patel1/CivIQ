# CivIQ — India's Premier AI Civic Assistant 🇮🇳

CivIQ is a state-of-the-art, full-stack platform designed to revolutionize how Indian citizens engage with the democratic process. Built for the **PromptWars** hackathon, it leverages Google's Gemini 2.0 AI to provide a high-performance, accessible, and secure guide through the complexities of Indian elections.

![CivIQ Dashboard Mockup](https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=1200)

## 🎯 The Mission
To bridge the information gap in the Indian electoral system by providing real-time, context-aware assistance to over 900 million voters, ensuring every citizen can exercise their right to vote with confidence.

## 🌟 Premium Features

- **🤖 Gemini 2.0 Integration**: A context-aware AI assistant trained on Indian electoral laws and procedures.
- **🗺️ Interactive Voter Journey**: A gamified, step-by-step roadmap from registration to the polling booth.
- **📊 Live Election Tracker**: Real-time status updates for State and National elections across India.
- **🛡️ Security Center**: Multi-factor awareness and rumor-busting tools to combat misinformation.
- **📱 Fluid Responsiveness**: A mobile-first design that looks stunning on everything from a budget smartphone to a 4K display.

## 🛠️ Technical Excellence

### Code Quality & Architecture
- **Frontend**: React 19 with Vite for ultra-fast HMR and bundle optimization.
- **Backend**: FastAPI (Python 3.12) utilizing asynchronous handlers for non-blocking AI inferences.
- **Design System**: A custom CSS-in-JS and Vanilla CSS hybrid approach using fluid typography (`clamp()`) and glassmorphism.

### 🔒 Security
- **JWT & Firebase Auth**: Secure, industry-standard authentication flow.
- **Rate Limiting**: Backend protection using `slowapi` to prevent abuse.
- **CORS Policy**: Strict origin validation to protect user data and API integrity.
- **Input Sanitization**: Robust validation on both client and server sides.

### ♿ Accessibility (A11y)
- Full ARIA landmark support for screen readers.
- High-contrast color palettes and scalable typography.
- Keyboard-navigable interface and focus-trap management.
- Semantic HTML5 structure for optimal SEO and readability.

### ⚡ Efficiency
- **Lazy Loading**: Code-splitting at the route level to minimize initial load time.
- **Optimized Assets**: SVG-first iconography and compressed media.
- **Caching Strategy**: Intelligent data fetching with local fallbacks for high availability.

## 🚀 Deployment & Setup

### Environment Configuration
Create a `.env` file with the following keys:

| Variable | Description |
| :--- | :--- |
| `GEMINI_API_KEY` | Google AI Studio Key |
| `VITE_FIREBASE_API_KEY` | Firebase Web Config |
| `VITE_GOOGLE_MAPS_API_KEY` | Maps JS API Key |

### Quick Start
```powershell
# Windows
.\start_local.ps1

# Manual Backend
cd backend && pip install -r requirements.txt && python main.py

# Manual Frontend
cd frontend && npm install && npm run dev
```

## 🧪 Testing
- **Backend**: Pytest suite for API endpoints and utility logic.
- **Frontend**: Unit tests for date logic and state management.
- **Performance**: Lighthouse audited for SEO, Accessibility, and Best Practices.

## 📜 License
Distributed under the MIT License. Built with ❤️ for the Indian Electorate.
