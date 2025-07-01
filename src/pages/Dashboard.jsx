import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4 ms-5 ps-5">
        <h2>Bienvenido, {usuario?.usuario}</h2>
        <p>Rol: {usuario?.rol}</p>
      </div>
    </div>
  );
}