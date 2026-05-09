const { Modifies, Commit } = require('../models');

module.exports = {
    async index(req, res) {
        try {
            const modifies = await Modifies.findAll();
            return res.status(200).json(modifies);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const modify = await Modifies.findByPk(req.params.id, {
                include: [{ model: Commit, as: 'commit' }],
            });
            if (!modify) return res.status(404).json({ error: 'Modifies not found' });
            return res.status(200).json(modify);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { file_name, line, line_content, commit_id } = req.body;
            const commit = await Commit.findByPk(commit_id);
            if (!commit) return res.status(400).json({ error: 'commit_id does not exist' });
            const modify = await Modifies.create({ file_name, line, line_content, commit_id });
            return res.status(201).json(modify);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const modify = await Modifies.findByPk(req.params.id);
            if (!modify) return res.status(404).json({ error: 'Modifies not found' });
            const { file_name, line, line_content, commit_id } = req.body;
            await modify.update({ file_name, line, line_content, commit_id });
            return res.status(200).json(modify);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const modify = await Modifies.findByPk(req.params.id);
            if (!modify) return res.status(404).json({ error: 'Modifies not found' });
            await modify.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};
