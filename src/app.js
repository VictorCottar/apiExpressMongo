import express from 'express';
import dbConnect from './database/dbConnect.js';
import routes from './routes/index.js'
const connection = await dbConnect();


connection.on('error', (erro) => console.error('Erro ao conectar ao banco de dados', erro));
connection.once('open', () => console.log('Conexão realizada com sucesso'));


const app = express();
routes(app);

export default app;