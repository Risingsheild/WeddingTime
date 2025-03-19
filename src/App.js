
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Importing Components
import './App.css';
import Home from './pages/Home';
import RSVP from './pages/RSVP';
import Gallery from './pages/Gallery';
import EventSchedule from './pages/EventSchedule';
import Map from './pages/Map';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rsvp">RSVP</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/schedule">Event Schedule</Link></li>
              <li><Link to="/map">Map</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/schedule" element={<EventSchedule />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
