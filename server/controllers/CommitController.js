const { Commit, Repository, Modifies, sequelize } = require('../models');

module.exports = {
    async index(req, res) {
        try {
            const commits = await Commit.findAll({
                include: [{ model: Modifies, as: 'modifies' }],
            });
            return res.status(200).json(commits);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const commit = await Commit.findByPk(req.params.id, {
                include: [
                    { model: Repository, as: 'repository' },
                    { model: Modifies, as: 'modifies' },
                ],
            });
            if (!commit) return res.status(404).json({ error: 'Commit not found' });
            return res.status(200).json(commit);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        const t = await sequelize.transaction();
        try {
            const { message, repository_id, modifies } = req.body;
            const repository = await Repository.findByPk(repository_id);
            if (!repository) {
                await t.rollback();
                return res.status(400).json({ error: 'repository_id does not exist' });
            }

            const commit = await Commit.create({ message, repository_id }, { transaction: t });

            if (Array.isArray(modifies) && modifies.length > 0) {
                const rows = modifies.map((m) => ({
                    file_name: m.file_name,
                    line: m.line,
                    line_content: m.line_content,
                    commit_id: commit.id,
                }));
                await Modifies.bulkCreate(rows, { transaction: t });
            }

            await t.commit();

            const created = await Commit.findByPk(commit.id, {
                include: [{ model: Modifies, as: 'modifies' }],
            });
            return res.status(201).json(created);
        } catch (err) {
            await t.rollback();
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const commit = await Commit.findByPk(req.params.id);
            if (!commit) return res.status(404).json({ error: 'Commit not found' });
            const { message, repository_id } = req.body;
            await commit.update({ message, repository_id });
            return res.status(200).json(commit);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const commit = await Commit.findByPk(req.params.id);
            if (!commit) return res.status(404).json({ error: 'Commit not found' });
            await commit.destroy();
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};
