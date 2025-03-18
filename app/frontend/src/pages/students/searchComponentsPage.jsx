import React, { useEffect, useState } from 'react';
import { listComponents } from '../../services/api';

const SearchComponentsPage = () => {
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

  return (
    <div style={styles.container}>
      <h2>Procurar Componentes</h2>
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

const styles = {
  container: {
    padding: '20px',
  },
};

export default SearchComponentsPage;