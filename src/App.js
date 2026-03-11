import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { IncidentsProvider } from './context/IncidentsContext';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import Form from './pages/Form';
import './App.css';

function App() {
  return (
    <IncidentsProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>🛡️ Безопасность в промышленности и производстве</h1>
            <nav className="App-nav">
              <Link to="/">Главная</Link>
              <Link to="/detail">Детализация</Link>
              <Link to="/add">Добавить инцидент</Link>
              <Link to="/edit">Редактировать</Link>
              <Link to="/delete">Удалить</Link>
            </nav>
          </header>
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail" element={<Detail />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/delete" element={<Delete />} />
              <Route path="/delete/:id" element={<Delete />} />
              <Route path="/add" element={<Form />} />
            </Routes>
          </main>
          <footer className="App-footer">
            <p>© 2026 Система учета инцидентов безопасности</p>
          </footer>
        </div>
      </Router>
    </IncidentsProvider>
  );
}

export default App;
