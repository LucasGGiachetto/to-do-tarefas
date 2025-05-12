const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar usuário (cadastro)
router.post('/usuario', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email, password }
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      userId: user.id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar usuário (email já existe?)' });
  }
});

// Listar todos os usuários (caso queira ver depois)
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  });
  res.json(users);
});

module.exports = router;
