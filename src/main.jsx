import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loadBrandFonts } from './utils/loadBrandFonts'
import './index.css'
import App from './App.jsx'

loadBrandFonts()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
