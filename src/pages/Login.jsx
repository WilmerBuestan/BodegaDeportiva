import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const usuarios = [
  { usuario: 'admin', contrasena: '1234', rol: 'Administrador' },
  { usuario: 'bodeguero', contrasena: 'abcd', rol: 'Bodeguero' }
];

export default function Login() {
  const [form, setForm] = useState({ usuario: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = usuarios.find(
      u => u.usuario === form.usuario && u.contrasena === form.contrasena
    );
    if (user) {
      localStorage.setItem('usuario', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🔐 Login - Bodega Deportiva</h2>
      <input className="form-control mb-2" placeholder="Usuario" onChange={e => setForm({ ...form, usuario: e.target.value })} />
      <input className="form-control mb-2" type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, contrasena: e.target.value })} />
      <button className="btn btn-primary" onClick={handleLogin}>Ingresar</button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
