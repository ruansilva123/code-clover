const { Repository, User, Commit } = require('../models');

module.exports = {
    async index(req, res) {
        try {
            const repositories = await Repository.findAll({
                include: [{ model: User, as: 'user' }],
            });
            return res.status(200).json(repositories);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const repository = await Repository.findByPk(req.params.id, {
                include: [
                    { model: User, as: 'user' },
                    { model: Commit, as: 'commits' },
                ],
            });
            if (!repository) return res.status(404).json({ error: 'Repository not found' });
            return res.status(200).json(repository);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { name, user_id } = req.body;
            const user = await User.findByPk(user_id);
            if (!user) return res.status(400).json({ error: 'user_id does not exist' });
            const repository = await Repository.create({ name, user_id });
            return res.status(201).json(repository);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const repository = await Repository.findByPk(req.params.id);
            if (!repository) return res.status(404).json({ error: 'Repository not found' });
            const { name, user_id } = req.body;
            await repository.update({ name, user_id });
            return res.status(200).json(repository);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const repository = await Repository.findByPk(req.params.id);
            if (!repository) return res.status(404).json({ error: 'Repository not found' });
            await repository.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};
