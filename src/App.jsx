import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import NewsNav from './pages/NewsNav';
import VideoView from './pages/VideoView';
import StoryTracker from './pages/StoryTracker';
import AdminMonitor from './pages/AdminMonitor';
import { AppProvider } from './context/AppContext';
import './index.css';
import './app-styles.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-wrapper">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsNav />} />
            <Route path="/video" element={<VideoView />} />
            <Route path="/tracker" element={<StoryTracker />} />
            <Route path="/monitor" element={<AdminMonitor />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
