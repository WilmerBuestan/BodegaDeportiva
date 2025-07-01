import { Routes, Route, HashRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Login from './pages/Login';


function App() {
  return (
<HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
</HashRouter>
  );
}

export default App;
