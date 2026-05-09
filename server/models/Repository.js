const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Repository = sequelize.define('Repository', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'repositories',
    timestamps: true,
});

module.exports = Repository;
