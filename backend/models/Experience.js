import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Experience = sequelize.define('Experience', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  current: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  technologies: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  timestamps: true,
});

export default Experience;