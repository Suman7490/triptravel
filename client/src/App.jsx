
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header"
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <>


      {/* <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router> */}
      <h1 className="text-3xl font-bold text-center text-blue-500 text-">
        Hello, Tailwind + Vite!
      </h1>
    </>
  );
}

export default App;
