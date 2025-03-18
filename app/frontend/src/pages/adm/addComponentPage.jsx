import React, { useState } from 'react';
import { addComponent } from '../../services/api';
import { v4 as uuidv4 } from 'uuid';  // Importando a função para gerar UUID

const AddComponentPage = () => {
  const [tipo, setTipo] = useState('');
  const [especificacao, setEspecificacao] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleAddComponent = async () => {
    try {
      if (!tipo || !especificacao || !quantidade) {
        alert('Preencha todos os campos!');
        return;
      }
      
      const id = uuidv4(); // Gera o UUID no frontend
      console.log("ID gerado no frontend:", id);
      console.log(id, tipo, especificacao, quantidade);

      const response = await addComponent(id, tipo, especificacao, quantidade);
      alert(`Componente adicionado com sucesso! ID: ${response.id}`);
    } catch (error) {
      alert('Erro ao adicionar componente: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Adicionar Componente</h2>
      <div style={styles.form}>
        <select
          style={styles.select}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Selecione o tipo do componente</option>
          <option value="Resistor">Resistor</option>
          <option value="Capacitor">Capacitor</option>
        </select>

        <input
          style={styles.input}
          type="text"
          placeholder="Especificação"
          value={especificacao}
          onChange={(e) => setEspecificacao(e.target.value)}
        />
        
        <input
          style={styles.input}
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        
        <button onClick={handleAddComponent} style={styles.button}>
          Adicionar
        </button>
      </div>
    </div>
  );
};

const styles = { /* seus estilos aqui */ };

export default AddComponentPage;
