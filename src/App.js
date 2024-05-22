import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import Donate from './components/Donate';
import SignUp from './components/SignUp';
import Login from './components/Login';



import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
