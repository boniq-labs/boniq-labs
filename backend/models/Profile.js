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
  },
  footerData: {
    type: DataTypes.JSON,
    defaultValue: {
      siteName: 'boniq',
      tagline: "Let's collaborate on your next project and bring your visionary ideas to life.",
      ctaText: "Start a Conversation",
      copyrightText: "All Rights Reserved.",
      version: "v2.0.0",
      showCredits: true,
      credits: [
        { icon: '🎨', text: 'Designed by boniq' },
        { icon: '⚙️', text: 'Developed by boniq' },
        { icon: '🚀', text: 'Powered by Vue 3' },
      ],
      links: [
        { label: 'Privacy', url: '/privacy' },
        { label: 'Terms', url: '/terms' },
        { label: 'GitHub', url: 'https://github.com/boniq' },
      ],
    },
  },
}, {
  timestamps: true,
});

export default Profile;
