import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { SavedItemsProvider } from './SavedItemsContext';
import ShortsView from './ShortsView';
import MyPage from './MyPage';

function App() {
  return (
    <SavedItemsProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<ShortsView />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
          <nav className="bottom-nav">
            <Link to="/" className="nav-item">
              <span className="nav-icon">홈</span>
            </Link>
            <Link to="/mypage" className="nav-item">
              <span className="nav-icon">마이</span>
            </Link>
          </nav>
        </div>
      </Router>
    </SavedItemsProvider>
  );
}

export default App;
