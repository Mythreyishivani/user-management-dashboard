const sequelize = require('../config/database.js'); // make sure path is correct
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
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A', // default value to avoid sync errors
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.JSONB, // stores street, city, zipcode, geo {lat, lng}
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = User;
