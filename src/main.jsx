import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import EventPage from "./components/EventPage.jsx";

if (typeof window !== 'undefined') {
  import('smoothscroll-polyfill').then(({ polyfill }) => {
    polyfill();
  });
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/event" element={<EventPage />} />
    </Routes>
  </BrowserRouter>
)
