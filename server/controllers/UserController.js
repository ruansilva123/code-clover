const { User, Repository } = require('../models');

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [{ model: Repository, as: 'repositories' }],
            });
            if (!user) return res.status(404).json({ error: 'User not found' });
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { email } = req.body;
            const user = await User.create({ email });
            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            await user.update({ email: req.body.email });
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            await user.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};
