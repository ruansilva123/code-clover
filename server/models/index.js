const sequelize = require('../config/database');
const User = require('./User');
const Repository = require('./Repository');
const Commit = require('./Commit');
const Modifies = require('./Modifies');

User.hasMany(Repository, { foreignKey: 'user_id', as: 'repositories', onDelete: 'CASCADE' });
Repository.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Repository.hasMany(Commit, { foreignKey: 'repository_id', as: 'commits', onDelete: 'CASCADE' });
Commit.belongsTo(Repository, { foreignKey: 'repository_id', as: 'repository' });

Commit.hasMany(Modifies, { foreignKey: 'commit_id', as: 'modifies', onDelete: 'CASCADE' });
Modifies.belongsTo(Commit, { foreignKey: 'commit_id', as: 'commit' });

module.exports = {
    sequelize,
    User,
    Repository,
    Commit,
    Modifies,
};
