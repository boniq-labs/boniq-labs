import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Profile = sequelize.define('Profile', {
  name: {
    type: DataTypes.STRING,
    defaultValue: 'boniq',
  },
  greeting: {
    type: DataTypes.STRING,
    defaultValue: 'Hi, I\'m',
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Full-Stack Software Engineer',
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: 'I craft immersive, high-performance web applications that merge stunning design with robust functionality. Code is my canvas, and innovation is my drive.',
  },
  avatarUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  cvUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  whatsapp: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  linkedin: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  instagram: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  github: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  twitter: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  dribbble: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  logoUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  faviconUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  siteUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  seoTitle: {
    type: DataTypes.STRING,
    defaultValue: 'boniq - Full Stack Developer Portfolio',
  },
  seoDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Full Stack Developer portfolio showcasing projects, skills, and experience.',
  },
  seoKeywords: {
    type: DataTypes.TEXT,
    defaultValue: 'developer, portfolio, full stack, web development, software engineer',
  }
}, {
  timestamps: true,
});

export default Profile;
