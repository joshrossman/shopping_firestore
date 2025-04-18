import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderWithNavigate from './components/Logging/AuthProvider.tsx'


const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(


    <App />



)
