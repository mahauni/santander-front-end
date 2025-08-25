import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'

import App from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
