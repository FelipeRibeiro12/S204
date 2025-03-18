// backend/middlewares/authMiddleware.js
const { db } = require('../services/fireBaseConfig.cjs');

const authenticate = async (req, res, next) => {
  const { matricula } = req.body;

  try {
    const userRef = db.collection('usuarios').doc(matricula);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const userData = userDoc.data();
    req.user = userData;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const isAdmin = (req, res, next) => {
  const { tipo } = req.user;

  if (tipo !== 'ADM') {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  next();
};

module.exports = { authenticate, isAdmin };