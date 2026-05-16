const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TimelineEvent = sequelize.define('TimelineEvent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('History', 'Technology', 'Business', 'Awards', 'Products'),
    allowNull: false
  },
  decadeGroup: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Store related IDs as JSONB arrays (integers)
  relatedPioneerIds: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  relatedProductIds: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  importanceLevel: {
    type: DataTypes.ENUM('major', 'minor', 'milestone'),
    defaultValue: 'minor'
  }
}, {
  timestamps: true
});

module.exports = TimelineEvent;
