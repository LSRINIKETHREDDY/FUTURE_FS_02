import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PublicForm from './pages/PublicForm';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicForm />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>

      {/* Temporary Nav for easy access */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 100, display: 'flex', gap: '10px' }}>
        <Link to="/" className="glass-panel" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Form</Link>
        <Link to="/admin" className="glass-panel" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Admin</Link>
      </div>
    </Router>
  );
}

export default App;
