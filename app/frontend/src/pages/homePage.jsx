import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HomePage = () => {
  const [components, setComponents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user; // Dados do usuário passados no login

  useEffect(() => {
    // Buscar componentes do backend
    fetch('http://localhost:5000/components/list')
      .then((response) => response.json())
      .then((data) => setComponents(data))
      .catch((error) => console.error('Erro ao buscar componentes:', error));
  }, []);

  return (
    <div>
      <h1>Bem-vindo, {user.matricula}</h1>

      {user.tipo === 'ADM' ? (
        <div>
          <h2>Painel do ADM</h2>
          <button onClick={() => navigate('/add-components')}>Adicionar Componente</button>
          <button onClick={() => navigate('/manage-components')}>Gerenciar Componentes</button>
          <button onClick={() => navigate('/borrow-return')}>Emprestar / Devolver</button>
        </div>
      ) : (
        <div>
          <h2>Painel do Aluno</h2>
          <button onClick={() => navigate('/search-components')}>Procurar Componentes</button>
          <button onClick={() => navigate('/my-components')}>Meus Componentes</button>
        </div>
      )}

      <h3>Componentes Disponíveis</h3>
      <ul>
        {components.map((component) => (
          <li key={component.id}>
            {component.nome} - Quantidade: {component.quantidade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;