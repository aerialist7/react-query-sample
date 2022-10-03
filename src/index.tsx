import { App } from './App'
import { createRoot } from 'react-dom/client'

const container = document.createElement('div')
document.body.appendChild(container)
createRoot(container).render(<App/>)
