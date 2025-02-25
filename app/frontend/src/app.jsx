// App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Importe o Outlet
import Navbar from './components/navbar'; // Exemplo de componente de navegação (opcional)

const App = () => {
  return (
    <div>
      {/* Exemplo de Navbar (opcional) */}
      <Navbar />

      {/* Outlet renderiza os componentes filhos das rotas */}
      <Outlet />
    </div>
  );
};

export default App;