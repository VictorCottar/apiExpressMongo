import express from 'express';
import dbConnect from './database/dbConnect.js';
const app = express();
const connection = await dbConnect();

app.use(express.json());

connection.on('error', (erro) => console.error('Erro ao conectar ao banco de dados', erro));
connection.once('open', () => console.log('Conexão realizada com sucesso'));


const livros = [
{    id: 1,
    titulo: 'O Senhor dos Anéis',
},
{
    id: 2,
    titulo: 'Harry Potter',
} 
]

function buscaLivro(id) {
    return livros.findIndex(livro => { 
         return livro.id === Number(id);
    });
}


app.get('/', (req, res) => {
    res.status(200).send('Curso de Node.js');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    if (index === -1 ? res.status(404).send('Livro não encontrado') : res.status(200).json(livros[index])); 
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso');
});

app.put('/livros/:id', (req, res) => { 
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).send('Livro atualizado com sucesso');
});

app.delete('/livros/:id', (req, res) => { 
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send('Livro removido com sucesso');
});

export default app;