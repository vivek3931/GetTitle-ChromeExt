const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    bio: { 
        type: DataTypes.TEXT,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    followerCount: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    connectionCount: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Profile;