const { db } = require('../services/fireBaseConfig.cjs');
const Component = require('../models/component.cjs');
const auth = require('../services/authService.cjs');
const logger = require('./logger.cjs'); // Importa o logger

// Adicionar um novo componente (apenas ADM)
const addComponent = async (req, res) => {
  const { id, tipo, especificacao, quantidade } = req.body;

  logger.info("🔹 Função addComponent foi chamada!");

  try {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      console.log('ID inválido recebido:', id);
      logger.error('ID inválido recebido:', id);
      return res.status(400).json({ error: 'ID inválido. O ID deve ser uma string não vazia!' });
    }

    if (!tipo || !especificacao || !quantidade) {
      logger.error('Campos obrigatórios não preenchidos');
      return res.status(400).json({ error: 'Preencha todos os campos, incluindo o ID!' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      logger.error('Token não fornecido');
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    if (decodedToken.tipo !== 'ADM') {
      logger.error('Acesso negado: usuário não é ADM');
      return res.status(403).json({ error: 'Apenas administradores podem adicionar componentes' });
    }

    logger.info('ID recebido do frontend:', id);

    // ⚠️ Verifique se o ID contém apenas caracteres válidos para o Firestore
    if (!/^[a-zA-Z0-9-_]+$/.test(id)) {
      logger.error(`ID inválido para Firestore: ${id}`);
      return res.status(400).json({ error: 'O ID contém caracteres inválidos para o Firestore!' });
    }

    const componentRef = db.collection('componentes').doc(id.trim()); // 🔹 Trim para evitar espaços em branco

    await componentRef.set({
      id,
      tipo,
      especificacao,
      quantidade,
    });

    logger.info('✅ Componente adicionado com sucesso:', id);

    res.json({
      id,
      tipo,
      especificacao,
      quantidade
    });
  } catch (error) {
    logger.error('❌ Erro ao adicionar componente:', error);
    res.status(500).json({ error: error.message });
  }
};

// Listar componentes disponíveis (todos os usuários)
const listComponents = async (req, res) => {
  try {
    const componentsSnapshot = await db.collection('componentes').get();
    const components = [];

    componentsSnapshot.forEach((doc) => {
      const componentData = doc.data();
      const component = new Component(
        doc.id,
        componentData.tipo,
        componentData.especificacao,
        componentData.quantidade,
        componentData.emprestadoPara
      );
      components.push(component);
    });

    res.json(components);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Emprestar componente (apenas ADM)
const borrowComponent = async (req, res) => {
  const { componentId, matricula } = req.body;

  try {
    const componentRef = db.collection('componentes').doc(componentId);
    await componentRef.update({ emprestadoPara: matricula });

    res.json({ message: 'Componente emprestado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Devolver componente (apenas ADM)
const returnComponent = async (req, res) => {
  const { componentId } = req.body;

  try {
    const componentRef = db.collection('componentes').doc(componentId);
    await componentRef.update({ emprestadoPara: null });

    res.json({ message: 'Componente devolvido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addComponent, listComponents, borrowComponent, returnComponent };