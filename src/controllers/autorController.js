import { autor } from '../models/Autor.js';

class AutorController {

    static async listarAutores(req, res, next) {
        try {
            const listaAutores = await autor.find({});

            if (!listaAutores) {
                return res.status(500).json({ message: 'Falha ao listar autores' });
            }

            res.status(200).json(listaAutores);
        } catch (erro) {
            next(erro);
        }
    };

    static async listarAutorPorId(req, res, next) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);

            if (!autorEncontrado) {
                return res.status(404).json({ message: 'ID do autor não encontrado' });
            }

            res.status(200).json(autorEncontrado);
        } catch (erro) {
            next(erro);
        }
    };

    static async cadastrarAutor(req, res, next) {
        try {
            const novoAutor = await autor.create(req.body);

            if (!novoAutor) {
                return res.status(500).json({ message: 'Falha ao criar autor' });
            }

            res.status(201).json({ message: 'Criado com sucesso', autor: novoAutor });
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            if (!await autor.findByIdAndUpdate(id, { $set: req.body })) {
                return res.status(500).send({ message: 'Falha ao atualizar autor' });
            }

            res.status(200).send({ message: 'Autor atualizado com sucesso' });
        } catch (erro) {
            next(erro);
        }
    };

    static deletarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            if (!await autor.findByIdAndDelete(id)) {
                return res.status(500).send({ message: 'Falha ao remover autor' });
            }

            res.status(200).send({ message: 'Autor removido com sucesso' });
        } catch (erro) {
            next(erro);
        }
    };

};

export default AutorController;