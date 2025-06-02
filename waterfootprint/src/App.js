import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import './App.css';
import Form from './components/Form';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Donate from './components/Donate';
import WaterSavingTips from './components/WaterSavingTips';
import Waterfootprint from './components/Waterfootprint';
import NewsAndArticles from './components/NewsAndArticles';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/form" element={<Form />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/water-saving-tips" element={<WaterSavingTips />} />
          <Route path="/waterfootprint" element={<Waterfootprint />} />
          <Route path="/news" element={<NewsAndArticles />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
