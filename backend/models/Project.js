import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  githubLink: {
    type: DataTypes.STRING,
  },
  liveDemo: {
    type: DataTypes.STRING,
  },
  technologies: {
    type: DataTypes.JSON, // Stores an array of strings in MySQL JSON column
    defaultValue: [],
  },
}, {
  timestamps: true,
});

export default Project;
