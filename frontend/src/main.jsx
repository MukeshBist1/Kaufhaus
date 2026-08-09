import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://kaufhaus-backend.onrender.com').replace(/\/$/, '')
const originalFetch = window.fetch.bind(window)

window.fetch = (input, init) => {
  if (typeof input === 'string' && input.startsWith('/api/')) {
    return originalFetch(`${API_BASE_URL}${input}`, init)
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