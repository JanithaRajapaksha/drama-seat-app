import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SeatSelection from './SeatSelection';
import Login from './Login';
import './index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/seats" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/seats" element={isLoggedIn ? <SeatSelection /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);