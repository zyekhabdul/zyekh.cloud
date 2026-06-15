import React from 'react'
import { createRoot } from 'react-dom/client'
import TerminalView from './components_fixed/TerminalView'
import './styles/terminal-fixed.css'

function App(){
  return (
    <div style={{ padding: 24, minHeight: '100vh', background: 'var(--terminal-bg, #0b0b0d)' }}>
      <TerminalView />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
