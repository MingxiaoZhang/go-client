import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import GoBoard from './components/GoBoard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu';
import GamePage from './pages/Game';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/play/small" element={<GamePage size={"SMALL"} />} />
          <Route path="/play/medium" element={<GamePage size={"MEDIUM"} />} />
          <Route path="/play/large" element={<GamePage size={"LARGE"} />} />
          <Route path="/" element={<Menu />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
