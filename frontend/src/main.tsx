import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App.tsx'
import './index.css'
import { UserProvider } from './contexts/UserContext.tsx'
import { GameListingsProvider } from './contexts/GameListingsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <GameListingsProvider>
        <App />
      </GameListingsProvider>
    </UserProvider>
  </React.StrictMode>,
)
