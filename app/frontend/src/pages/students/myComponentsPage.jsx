import React, { useEffect, useState } from 'react';
import { listComponents } from '../../services/api';

const MyComponentsPage = () => {
  const [myComponents, setMyComponents] = useState([]);
  const userMatricula = '12345'; // Substitua pela matrícula do usuário logado

  useEffect(() => {
    const fetchMyComponents = async () => {
      try {
        const data = await listComponents();
        const filteredComponents = data.filter(
          (component) => component.emprestadoPara === userMatricula
        );
        setMyComponents(filteredComponents);
      } catch (error) {
        console.error('Erro ao buscar meus componentes:', error);
      }
    };

    fetchMyComponents();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Meus Componentes</h2>
      <ul>
        {myComponents.map((component) => (
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

export default MyComponentsPage;