const sequelize = require('../config/database.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A',
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.JSONB, // keep it JSON if your DB supports it
        allowNull: true,
        defaultValue: {
            street: '',
            city: '',
            zip: '',
            geo: { lat: '', lng: '' },
        },
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Manager', 'User'),
        allowNull: false,
        defaultValue: 'User',
    },
}, {
    timestamps: true,
});

module.exports = User;
