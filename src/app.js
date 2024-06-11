import express from 'express';
import dbConnect from './database/dbConnect.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';
const connection = await dbConnect();


connection.on('error', (erro) => console.error('Erro ao conectar ao banco de dados', erro));
connection.once('open', () => console.log('Conexão realizada com sucesso'));


const app = express();
routes(app);

 
app.use((erro, req, res, next) => {
    erro instanceof mongoose.CastError ? res.status(400).json({ message: 'ID com tamanho inválido' }) : res.status(500).json({ message: `${erro.message} - Erro interno do servidor` });
});

export default app;