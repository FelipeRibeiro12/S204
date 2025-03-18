import React, { useEffect, useState } from 'react';
import { listComponents, borrowComponent, returnComponent } from '../../services/api';

const BorrowReturnPage = () => {
  const [components, setComponents] = useState([]);
  const [matricula, setMatricula] = useState('');

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const data = await listComponents();
        setComponents(data);
      } catch (error) {
        console.error('Erro ao buscar componentes:', error);
      }
    };

    fetchComponents();
  }, []);

  const handleBorrow = async (componentId) => {
    try {
      await borrowComponent(componentId, matricula);
      alert('Componente emprestado com sucesso!');
    } catch (error) {
      alert('Erro ao emprestar componente: ' + error.message);
    }
  };

  const handleReturn = async (componentId) => {
    try {
      await returnComponent(componentId);
      alert('Componente devolvido com sucesso!');
    } catch (error) {
      alert('Erro ao devolver componente: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Emprestar/Devolver Componentes</h2>
      <input
        type="text"
        placeholder="Matrícula do Aluno"
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
        style={styles.input}
      />
      <ul>
        {components.map((component) => (
          <li key={component.id} style={styles.listItem}>
            {component.nome} - Quantidade: {component.quantidade}
            {component.emprestadoPara ? (
              <button onClick={() => handleReturn(component.id)} style={styles.returnButton}>
                Devolver
              </button>
            ) : (
              <button onClick={() => handleBorrow(component.id)} style={styles.borrowButton}>
                Emprestar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    width: '300px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  borrowButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  returnButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default BorrowReturnPage;