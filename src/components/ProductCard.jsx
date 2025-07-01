import React from 'react';

const ProductCard = ({ producto, onEditar, onEliminar }) => {
  return (
    <div className="card h-100 shadow-sm">
<img
  src={producto.imagen}
  className="card-img-top img-fluid"
  alt={producto.nombre}
  style={{
    objectFit: 'contain',
    height: '180px',
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: '5px'
  }}
/>

      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">
          <strong>Categoría:</strong> {producto.categoria}<br />
          <strong>Marca:</strong> {producto.marca}<br />
          <strong>Precio:</strong> ${parseFloat(producto.precio).toFixed(2)}<br />
          <strong>Stock:</strong> {producto.stock}
        </p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-warning btn-sm" onClick={() => onEditar(producto)}>✏️ Editar</button>
          <button
            className="btn btn-danger btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#modalEliminar"
            onClick={() => onEliminar(producto.id)}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
