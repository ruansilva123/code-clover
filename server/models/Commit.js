const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Commit = sequelize.define('Commit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    repository_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'commits',
    timestamps: true,
});

module.exports = Commit;
