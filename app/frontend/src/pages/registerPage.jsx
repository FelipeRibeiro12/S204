import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/fireBaseConfig";

const RegisterPage = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [curso, setCurso] = useState(''); // Estado para armazenar o curso selecionado

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Verifica se os dados foram preenchidos
      if (!matricula || !senha || !curso) {
        alert('Preencha todos os campos!');
        return;
      }
  
      // Cria um novo dado no Firestore com a matrícula como ID
      await setDoc(doc(db, 'alunos', matricula), {
        matricula,
        senha, // Em um cenário real, a senha deve ser criptografada!
        curso,
      });
  
      // Salva o usuário no localStorage
      const usuario = { matricula, senha, curso };
      const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuariosCadastrados.push(usuario);
      localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));
  
      console.log('Aluno cadastrado com sucesso!');
      navigate('/login'); // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
      alert('Erro ao cadastrar usuário: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Almoxarifado Inatel</h2>
      <div style={styles.form}>
        <select
          style={styles.select}
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        >
          <option value="">Selecione um curso</option>
          <option value="GES">Engenharia de Software (GES)</option>
          <option value="GEC">Engenharia de Computação (GEC)</option>
          <option value="GET">Engenharia de Telecomunicações (GET)</option>
          <option value="GEA">Engenharia de Controle e Automação (GEA)</option>
          <option value="GEL">Engenharia Elétrica (GEL)</option>
          <option value="GEP">Engenharia de Produção (GEP)</option>
          <option value="GEB">Engenharia Biomédica (GEB)</option>
        </select>
        
        <input
          style={styles.input}
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        
        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        
        <button onClick={handleRegister} style={styles.button}>
          Cadastrar Usuário
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f0f0',
    margin: 0, // Remove margens
    padding: 0, // Remove paddings
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px', // Define uma largura máxima
    padding: '20px', // Padding interno
    backgroundColor: '#f0f0f0',
    boxSizing: 'border-box', // Garante que padding não aumente a largura
  },
  input: {
    marginBottom: '10px',
    padding: '12px', // Padding interno
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc', // Borda simples
    width: '100%',
    boxSizing: 'border-box', // Garante que padding e borda não aumentem a largura
  },
  select: {
    marginBottom: '10px',
    padding: '12px', // Padding interno
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc', // Borda simples
    width: '100%',
    backgroundColor: '#fff',
    boxSizing: 'border-box', // Garante que padding e borda não aumentem a largura
  },
  button: {
    padding: '12px', // Padding interno
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%', // Ocupa 100% da largura do form
    marginBottom: '10px', // Adiciona margem inferior para espaçamento entre os botões
    boxSizing: 'border-box', // Garante que padding e borda não aumentem a largura
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default RegisterPage;