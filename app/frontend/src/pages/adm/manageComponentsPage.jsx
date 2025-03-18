/*import React, { useEffect, useState } from 'react';
import { listComponents, deleteComponent } from '../../services/api';

const ManageComponentsPage = () => {
  const [components, setComponents] = useState([]);

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

  const handleDelete = async (componentId) => {
    try {
      await deleteComponent(componentId);
      setComponents(components.filter((component) => component.id !== componentId));
      alert('Componente removido com sucesso!');
    } catch (error) {
      alert('Erro ao remover componente: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Gerenciar Componentes</h2>
      <ul>
        {components.map((component) => (
          <li key={component.id} style={styles.listItem}>
            {component.nome} - Quantidade: {component.quantidade}
            <button onClick={() => handleDelete(component.id)} style={styles.deleteButton}>
              Remover
            </button>
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
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default ManageComponentsPage;*/