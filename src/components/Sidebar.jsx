import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ colapsado, setColapsado }) {
  const location = useLocation();

  return (
    <div className={`sidebar ${colapsado ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={() => setColapsado(!colapsado)}>
        {colapsado ? '☰' : '✖'}
      </button>

      <div className="sidebar-header">
        {!colapsado && <h4>🏕️ Bodega Deportiva</h4>}
      </div>

      <ul className="sidebar-menu">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">🏠 {colapsado ? '' : 'Presentación'}</Link>
        </li>
        <li className={location.pathname === '/productos' ? 'active' : ''}>
          <Link to="/productos">🧺 {colapsado ? '' : 'Administrar Productos'}</Link>
        </li>
        <li>
          <button
            className="btn btn-sm btn-danger mt-4 w-100"
            onClick={() => {
              localStorage.removeItem('usuario');
              window.location.href = '/';
            }}
          >
            🚪 {colapsado ? '' : 'Cerrar sesión'}
          </button>
        </li>
      </ul>
    </div>
  );
}
