import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';  // ✅ Correct import for default export

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
