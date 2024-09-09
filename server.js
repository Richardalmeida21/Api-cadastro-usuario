import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.nome,
        age: req.body.idade
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, name, age } = req.body;
  console.log(`Tentando atualizar usuário com ID: ${userId}`);

  try {
      const user = await prisma.user.update({
          where: {
              id: userId
          },
          data: {
              email,
              name,
              age
          }
      });

      console.log(`Usuário atualizado: ${JSON.stringify(user)}`);
      res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
  } catch (error) {
      console.error(`Erro ao atualizar usuário: ${error.message}`);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  console.log(`Tentando deletar usuário com ID: ${userId}`);

  try {
      const user = await prisma.user.delete({
          where: {
              id: userId
          }
      });

      console.log(`Usuário deletado: ${JSON.stringify(user)}`);
      res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
      console.error(`Erro ao deletar usuário: ${error.message}`);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

app.get('/users', async (req, res) => {
  try {
    let users = [];
    if (req.query) {
      users = await prisma.user.findMany({
        where: {
          name: req.query.nome,
          email: req.query.email,
          age: req.query.idade
        }
      });
    } else {
      users = await prisma.user.findMany();
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});