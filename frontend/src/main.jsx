import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

// Use the local Vite proxy during development, but switch to the deployed backend
// in production when no explicit VITE_API_URL is provided.
const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  : (import.meta.env.VITE_API_URL || 'https://kaufhaus-backend.onrender.com').replace(/\/$/, '')

const originalFetch = window.fetch.bind(window)
window.fetch = (input, init) => {
  if (typeof input === 'string' && input.startsWith('/api/')) {
    const target = API_BASE_URL ? `${API_BASE_URL}${input}` : input
    return originalFetch(target, init)
  }
  return originalFetch(input, init)
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
)