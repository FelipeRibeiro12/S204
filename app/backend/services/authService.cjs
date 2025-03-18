// backend/services/authService.cjs
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

// Inicializa o Firebase Admin (se ainda não estiver inicializado)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth(); // 💡 Definição correta do auth

// Função para gerar token personalizado
const generateCustomToken = async (uid, tipo) => {
  try {
    const customToken = await auth.createCustomToken(uid, { tipo }); // Agora auth está definido corretamente
    return customToken;
  } catch (error) {
    console.error('Erro ao gerar token personalizado:', error);
    throw error;
  }
};

// Função para verificar o usuário
const verificarUsuario = async (matricula, senha) => {
  try {
    // Busca o usuário no Firestore usando a matrícula como ID
    const userRef = db.collection('usuarios').doc(matricula);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return null; // Usuário não encontrado
    }

    const userData = userDoc.data();

    // Verifica se a senha está correta
    if (userData.senha === senha) {
      return {
        uid: userData.matricula, // Usa a matrícula como UID
        tipo: userData.tipo, // Tipo do usuário (ex: 'ADM', 'ALUNO')
      };
    } else {
      return null; // Senha incorreta
    }
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
    throw error;
  }
};

module.exports = { generateCustomToken, verificarUsuario};