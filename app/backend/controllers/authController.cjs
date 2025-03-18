// backend/controllers/authController.js
const { db } = require('../services/fireBaseConfig.cjs');
const { generateCustomToken, verificarUsuario } = require('../services/authService.cjs'); // Importa a função

const login = async (req, res) => {
  const { matricula, senha } = req.body;

  try {
    const userRef = db.collection('usuarios').doc(matricula);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const userData = userDoc.data();

    if (userData.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Gera o token personalizado
    const customToken = await generateCustomToken(userData.matricula, userData.tipo);

    // Retorna o token para o frontend
    res.json({ token: customToken, ...userData, matricula});
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const { matricula, senha, curso } = req.body;

  try {
    if (!matricula || !senha || !curso) {
      return res.status(400).json({ error: 'Preencha todos os campos!' });
    }

    const userRef = db.collection('usuarios').doc(matricula);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return res.status(400).json({ error: 'Usuário já cadastrado!' });
    }

    await userRef.set({
      matricula,
      senha,
      curso,
      tipo: 'aluno',
    });

    res.json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection('usuarios').get();
    const users = [];

    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register, listUsers };