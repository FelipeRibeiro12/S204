// frontend/src/services/api.js
const { signInWithCustomToken } = require('firebase/auth');
const { auth } = require('./fireBaseConfig.js');

const API_BASE_URL = 'http://localhost:5000';
console.log('Usuário logado:', auth.currentUser);

const login = async (matricula, senha) => {
  try {
    // Faz a requisição para o backend para obter o token personalizado
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricula, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao fazer login');
    }

    const data = await response.json();

    // Autentica o usuário no Firebase usando o token personalizado
    await signInWithCustomToken(auth, data.token);

    console.log('Usuário autenticado com sucesso!');
    return data; // Retorna os dados do usuário
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

const register = async (matricula, senha, curso) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matricula, senha, curso }),
  });
  return response.json();
};

const listComponents = async () => {
  const response = await fetch(`${API_BASE_URL}/components/list`);
  return response.json();
};

const addComponent = async (id, tipo, especificacao, quantidade) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const token = await user.getIdToken();
    
    console.log('Token:', token);
    console.log('Recebidos no frontend:', id, tipo, especificacao, quantidade);

    const response = await fetch(`${API_BASE_URL}/components/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, tipo, especificacao, quantidade }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao adicionar componente');
    }

    const data = await response.json();
    console.log("✅ Resposta da API:", data);

    return data;
  } catch (error) {
    console.error('Erro na requisição:', error.message);
    throw error;
  }
};


const borrowComponent = async (componentId, matricula) => {
  const response = await fetch(`${API_BASE_URL}/components/borrow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ componentId, matricula }),
  });
  return response.json();
};

const returnComponent = async (componentId) => {
  const response = await fetch(`${API_BASE_URL}/components/return`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ componentId }),
  });
  return response.json();
};

module.exports = {
  login,
  register,
  listComponents,
  addComponent,
  borrowComponent,
  returnComponent,
};