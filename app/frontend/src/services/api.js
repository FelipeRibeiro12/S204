import axios from 'axios';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from './fireBaseConfig.js';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// LOGIN
export const login = async (matricula, senha) => {
  try {
    const response = await api.post('/auth/login', { matricula, senha });
    console.log('Resposta do backend:', response.data);

    const customToken = response.data.token;
    if (!customToken) {
      throw new Error('Resposta inválida do servidor');
    }

    await signInWithCustomToken(auth, customToken);

    const user = await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        if (user) resolve(user);
        else reject(new Error('Falha ao obter usuário autenticado'));
      });
    });

    const idToken = await user.getIdToken();

    return {
      token: idToken,
      usuario: {
        tipo: response.data.tipo,
        curso: response.data.curso,
        matricula: response.data.matricula
      }
    };

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// REGISTER
export const register = async (matricula, senha, curso) => {
  try {
    const response = await api.post('/auth/register', { matricula, senha, curso });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

// LISTAR COMPONENTES
export const listComponents = async () => {
  try {
    const response = await api.get('/components/list');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar componentes:', error);
    throw error;
  }
};

// ADICIONAR COMPONENTE
export const addComponent = async (id, tipo, especificacao) => {
  try {
    const user = auth.currentUser;
    const token = await user.getIdToken();

    const componente = { id, tipo, especificacao };

    const response = await api.post('/components/add', componente, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar componente:', error);
    throw error;
  }
};

// EMPRESTAR COMPONENTE
export const borrowComponent = async (componentId) => {
  try {
    const user = auth.currentUser;
    const token = await user.getIdToken();

    const emprestimo = { componentId };

    const response = await api.post('/emprestimos', emprestimo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar empréstimo:', error);
    throw error;
  }
};

// DEVOLVER COMPONENTE
export const returnComponent = async (componentId) => {
  try {
    const user = auth.currentUser;
    const token = await user.getIdToken();

    const response = await api.post('/components/return', { componentId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao devolver componente:', error);
    throw error;
  }
};