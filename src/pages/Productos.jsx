import React, { useState, useEffect } from 'react';
import productosData from '../data/productos';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AOS from 'aos';
import 'aos/dist/aos.css';




function Productos() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos');
    return guardados ? JSON.parse(guardados) : productosData;
  });

  const [formulario, setFormulario] = useState({});
  const [imagenPreview, setImagenPreview] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [idEliminar, setIdEliminar] = useState(null);

useEffect(() => {
  AOS.init({ duration: 700, once: true });
  localStorage.setItem('productos', JSON.stringify(productos));
}, [productos]);


  const handleChange = e => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleImagen = e => {
    const archivo = e.target.files[0];
    if (archivo) {
      const urlTemporal = URL.createObjectURL(archivo);
      setImagenPreview(urlTemporal);
      setFormulario({ ...formulario, imagen: urlTemporal });
    }
  };

  const handleAgregar = () => {
    const nuevo = { ...formulario, id: Date.now() };
    setProductos([...productos, nuevo]);
    setFormulario({});
    setImagenPreview(null);
  };

  const handleEditar = (producto) => {
    setFormulario(producto);
    setImagenPreview(producto.imagen || null);
    setModoEdicion(true);
  };

  const handleGuardar = () => {
    const actualizados = productos.map(p =>
      p.id === formulario.id ? formulario : p
    );
    setProductos(actualizados);
    setFormulario({});
    setImagenPreview(null);
    setModoEdicion(false);
  };

  const confirmarEliminar = () => {
    const actualizados = productos.filter(p => p.id !== idEliminar);
    setProductos(actualizados);
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const generarReportePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Inventario - Bodega Deportiva', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['Código', 'Nombre', 'Categoría', 'Marca', 'Stock', 'Precio']],
      body: productos.map(p => [
        p.codigo, p.nombre, p.categoria, p.marca, p.stock, `$${p.precio}`
      ])
    });
    doc.save('reporte_inventario.pdf');
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid ms-5 ps-5" style={{ marginLeft: '220px' }}>
        <Header />

        <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
          <h2>🧺 Productos Deportivos</h2>
          <button className="btn btn-outline-secondary" onClick={generarReportePDF}>
            📄 Generar PDF
          </button>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="🔎 Buscar por nombre o categoría"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        <div className="card p-3 shadow-sm mb-4">
          <h5>{modoEdicion ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</h5>
          <div className="row g-2">
            {[['codigo','Código'],['nombre','Nombre'],['categoria','Categoría'],['subcategoria','Subcategoría'],['marca','Marca'],['talla','Talla'],['color','Color'],['ubicacion','Ubicación'],['unidad','Unidad']]
              .map(([key, label]) => (
                <div key={key} className="col-md-3">
                  <input
                    name={key}
                    className="form-control"
                    placeholder={label}
                    value={formulario[key] || ''}
                    onChange={handleChange}
                  />
                </div>
              ))}

            <div className="col-md-3">
              <input
                name="stock"
                type="number"
                className="form-control"
                placeholder="Stock"
                value={formulario.stock || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                name="stock_minimo"
                type="number"
                className="form-control"
                placeholder="Stock Mínimo"
                value={formulario.stock_minimo || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                name="precio"
                type="number"
                className="form-control"
                placeholder="Precio ($)"
                value={formulario.precio || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="file"
                className="form-control"
                onChange={handleImagen}
              />
              {imagenPreview && <img src={imagenPreview} alt="Preview" className="img-fluid mt-2" />}
            </div>
          </div>

          <div className="mt-3">
            {modoEdicion ? (
              <button className="btn btn-success me-2" onClick={handleGuardar}>💾 Guardar</button>
            ) : (
              <button className="btn btn-primary" onClick={handleAgregar}>➕ Agregar</button>
            )}
          </div>
        </div>

<div className="row g-4">
  {productosFiltrados.map(p => (
<div
  key={p.id}
  className="col-12 col-sm-6 col-md-4 col-lg-3"
  data-aos="zoom-in"
>
  <ProductCard producto={p} onEditar={handleEditar} onEliminar={setIdEliminar} />
</div>

  ))}
</div>


        <div className="modal fade" id="modalEliminar" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">¿Estás seguro de eliminar este producto?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={confirmarEliminar} data-bs-dismiss="modal">Eliminar</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Productos;
