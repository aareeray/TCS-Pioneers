const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pioneer = sequelize.define('Pioneer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activeYears: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shortBio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  keyContributions: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  portraitImageUrl: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  tags: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

module.exports = Pioneer;
