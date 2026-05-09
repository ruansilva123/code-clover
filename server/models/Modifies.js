const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Modifies = sequelize.define('Modifies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    line: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    line_content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    commit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'modifies',
    timestamps: true,
});

module.exports = Modifies;
