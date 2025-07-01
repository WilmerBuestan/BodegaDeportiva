import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-dark bg-dark mb-4 px-3">
      <Link className="navbar-brand" to="/dashboard">🏕️ Tienda del Cuco</Link>
      <div>
        <Link className="btn btn-outline-light me-2" to="/productos">🧺 Productos</Link>
        <button className="btn btn-outline-danger" onClick={handleLogout}>🚪 Salir</button>
      </div>
    </nav>
  );
}
