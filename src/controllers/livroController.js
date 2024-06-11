import livro from '../models/Livro.js';

class LivroController {

    static async listarLivros(req, res, next) {
        try {
            const listaLivros = await livro.find({});

            if (!listaLivros) {
                return res.status(500).json({ message: 'Falha na requisição dos livros' });
            }

            res.status(200).json(listaLivros);
        } catch (erro) {
            next(erro);
        }
    };

    static async listarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);

            if (!livroEncontrado) {
                return res.status(500).json({ message: 'Falha na requisição do livro' });
            }

            res.status(200).json(livroEncontrado);
        } catch (erro) {
            next(erro);
        }
    };

    static async cadastrarLivro(req, res, next) {
        try {
            let livro = new livro(req.body);
            const livroResultado = await livro.save();

            if (!livroResultado) {
                return res.status(500).json({ message: 'Falha ao cadastrar livro' });
            }

            res.status(201).send(livroResultado.toJSON());
        } catch (erro) {
            next(erro);
        }
    };

    static async atualizarLivro(req, res, next) {
        try {
            const id = req.params.id;

            if (!await livro.findByIdAndUpdate(id, req.body)) {
                return res.status(500).json({ message: 'Falha na atualização do livro' });
            }

            res.status(200).json({ message: 'Atualizado com sucesso' });
        } catch (erro) {
            next(erro);
        }
    };

    static async deletarLivro(req, res, next) {
        try {
            const id = req.params.id;

            if (!await livro.findByIdAndDelete(id)) {
                return res.status(500).json({ message: 'Falha ao deletar livro' });
            }
             
            res.status(200).json({ message: 'Deletado com sucesso' });
        } catch (erro) {
            next(erro);
        }
    };

    static async listarLivrosPorEditora(req, res, next) {

        try {
            const editora = req.query.editora;
            const listarLivrosPorEditora = await livro.find({ editora: editora }); 
            
            if (!listarLivrosPorEditora) {
                return res.status(500).json({ message: 'Falha na requisição dos livros' });
            }

            res.status(200).json(listarLivrosPorEditora);                
        } catch (erro) {
            next(erro);
        }
    };

};

export default LivroController;