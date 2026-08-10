import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

// Simple helper for API requests.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://kaufhaus-backend.onrender.com'

const apiFetch = (path, init) => {
  const url = path.startsWith('/api/') ? `${API_BASE_URL}${path}` : path
  return fetch(url, init)
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