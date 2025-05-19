import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:5000/components/list')
        .then(res => res.json())
        .then(data => setComponents(data))
        .catch(err => console.error('Erro ao carregar componentes:', err));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Bem-vindo, {user.matricula}</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>

      {user.tipo === 'ADM' ? (
        <div style={styles.panel}>
          <h2>Painel do ADM</h2>
          <button onClick={() => navigate('/add-components')} style={styles.button}>Adicionar Componente</button>
          <button onClick={() => navigate('/manage-components')} style={styles.button}>Gerenciar Componentes</button>
          <button onClick={() => navigate('/borrow-return')} style={styles.button}>Emprestar / Devolver</button>
        </div>
      ) : (
        <div style={styles.panel}>
          <h2>Painel do Aluno</h2>
          <button onClick={() => navigate('/search-components')} style={styles.button}>Procurar Componentes</button>
          <button onClick={() => navigate('/my-components')} style={styles.button}>Meus Componentes</button>
        </div>
      )}

      <div>
        <h3>Componentes Disponíveis</h3>
        <ul>
          {components.map(c => (
            <li key={c.id}>{c.nome} - Quantidade: {c.quantidade}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  panel: {
    marginBottom: '30px',
  },
  button: {
    display: 'block',
    margin: '10px 0',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default HomePage;