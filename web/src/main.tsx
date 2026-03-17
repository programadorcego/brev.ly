import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import ReactQueryClientProvider from './providers/react-query-client-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryClientProvider>
      <App />
    </ReactQueryClientProvider>
  </StrictMode>,
)
