import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from './ErrorBoundary'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found. Check your index.html.')
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
