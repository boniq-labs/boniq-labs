import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import { sequelize } from './config/db.js';

const seedDatabase = async () => {
  try {
    // 1. Create database if it doesn't exist
    console.log('Connecting to MySQL to check database...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
    });
    
    const dbName = process.env.DB_NAME || 'boniq_portfolio';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database ${dbName} exists or was created.`);
    await connection.end();

    // 2. Connect Sequelize and sync models
    console.log('Syncing models...');
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // drop and recreate tables for a clean slate
    console.log('Models synced.');

    // 3. Create Admin User
    console.log('Creating admin user...');
    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123'
    });
    console.log('Admin user created: admin@example.com / password123');

    // 4. Create dummy Projects
    console.log('Creating projects...');
    await Project.bulkCreate([
      { 
        title: 'Cosmic Analytics Dashboard', 
        description: 'A futuristic data visualization dashboard using WebGL and real-time streaming data.', 
        imageUrl: 'https://source.unsplash.com/random/800x600/?dashboard',
        githubLink: '#',
        liveDemo: '#',
        technologies: ['Vue.js', 'Three.js', 'Tailwind CSS'] 
      },
      { 
        title: 'Aura Social Network', 
        description: 'A decentralized social platform with glassmorphism UI and end-to-end encryption built on blockchain.', 
        imageUrl: 'https://source.unsplash.com/random/800x600/?social',
        githubLink: '#',
        liveDemo: '#',
        technologies: ['React', 'Web3.js', 'Node.js'] 
      },
      { 
        title: 'Nexus E-Commerce', 
        description: 'Headless e-commerce platform built for speed and seamless checkout experiences with Stripe integration.', 
        imageUrl: 'https://source.unsplash.com/random/800x600/?ecommerce',
        githubLink: '#',
        liveDemo: '#',
        technologies: ['Next.js', 'GraphQL', 'Stripe'] 
      }
    ]);

    // 5. Create dummy Skills
    console.log('Creating skills...');
    await Skill.bulkCreate([
      { name: 'Vue.js', category: 'Frontend', level: 95 },
      { name: 'React', category: 'Frontend', level: 85 },
      { name: 'Tailwind', category: 'Frontend', level: 90 },
      { name: 'Node.js', category: 'Backend', level: 88 },
      { name: 'Express', category: 'Backend', level: 85 },
      { name: 'MySQL', category: 'Database', level: 80 },
      { name: 'Git & GitHub', category: 'Tools', level: 90 }
    ]);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
