import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Remove the old EventPage import and use lazy instead:
const EventPage = lazy(() => import("./components/EventPage.jsx"));

if (typeof window !== 'undefined') {
  import('smoothscroll-polyfill').then(({ polyfill }) => {
    polyfill();
  });
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/event/:id"
        element={
          <Suspense fallback={<div className="bg-black min-h-screen" />}>
            <EventPage />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
)