import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

export default function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4 ms-5 ps-5">
        <Header />
        <h2 className="mb-4">🎉 Bienvenido, {usuario?.usuario}</h2>
        <p className="mb-4">Rol: {usuario?.rol}</p>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card shadow-sm border-0 h-100 text-center p-4 dashboard-card delay-1">
              <h4>📦 Productos</h4>
              <p>Administra el inventario y gestiona nuevos productos deportivos.</p>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm border-0 h-100 text-center p-4 dashboard-card delay-2">
              <h4>📊 Reportes</h4>
              <p>Genera reportes en PDF para mantener el control del stock.</p>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm border-0 h-100 text-center p-4 dashboard-card delay-3">
              <h4>⚙️ Configuración</h4>
              <p>Personaliza el sistema, roles de acceso y preferencias del usuario.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
