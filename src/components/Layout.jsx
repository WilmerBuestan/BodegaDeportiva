// src/components/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  const [colapsado, setColapsado] = useState(false);

  return (
    <div className="d-flex">
      <Sidebar colapsado={colapsado} setColapsado={setColapsado} />
      <div
        className="container-fluid"
        style={{
          marginLeft: colapsado ? '70px' : '220px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
