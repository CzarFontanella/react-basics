import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header>
      <NavBar />
    </header>
    <main>
      <Home />
    </main>
    <footer>
      <Footer />
    </footer>
  </StrictMode>,
)
