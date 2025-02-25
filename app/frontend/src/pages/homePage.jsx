// src/components/Home.jsx
import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Inatel ACADEMICO</h1>
        <input style={styles.search} type="text" placeholder="Buscar" />
      </header>
      <nav style={styles.nav}>
        <button style={styles.navButton}>Avisos</button>
        <button style={styles.navButton}>Horários</button>
        <button style={styles.navButton}>Notas</button>
        <button style={styles.navButton}>Frequência</button>
        <button style={styles.navButton}>Menu</button>
      </nav>
      <div style={styles.content}>
        <p>Carregando...</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  title: {
    fontSize: '24px',
  },
  search: {
    padding: '8px',
    fontSize: '16px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#fff',
  },
  navButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    padding: '20px',
  },
};

export default HomePage;