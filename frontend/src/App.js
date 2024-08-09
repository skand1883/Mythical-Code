import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import CodingArena from "./components/CodingArena";
import Problem from './components/Problem';

function App() {

  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full min-h-screen poppins">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home loading={loading} setLoading={setLoading} />} />
        <Route path="/codingArena" element={<CodingArena />} />
        <Route path="/codingArena/:id" element={<Problem />} />
      </Routes>
    </div>
  );
}

export default App;
