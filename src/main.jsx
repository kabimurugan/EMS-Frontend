import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { userAuth } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    // <userAuth.Provider>
        <App />
    // {/* </userAuth.Provider> */}
)
