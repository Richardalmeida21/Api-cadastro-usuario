import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.nome,
            age: req.body.idade
        }
    })

    res.status(201).json(req.body)

})

app.put('/users/:id', async (req, res) => {

    await prisma.user.update({

        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.nome,
            age: req.body.idade
        }
    })

    res.status(201).json(req.body)

})

app.delete('/users/id:', async (req, res) => {

    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuário deletado com sucesso!'})

})


app.get('/users', async (req, res) => {

   const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.listen(3000)