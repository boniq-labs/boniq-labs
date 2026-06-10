import { Sequelize } from 'sequelize';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME || 'boniq_portfolio';

const sequelize = new Sequelize(
  dbName,
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

const run = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Connected.');
    
    await sequelize.sync({ alter: true });
    
    const adminEmail = 'admin@system';
    const adminName = 'goxriddle';
    
    let admin = await User.findOne({ where: { email: adminEmail } });
    
    if (admin) {
      console.log('Admin already exists. Updating password...');
      admin.password = 'gutuza.24@';
      admin.name = adminName;
      await admin.save();
    } else {
      console.log('Creating new admin...');
      await User.create({
        name: adminName,
        email: adminEmail,
        password: 'gutuza.24@'
      });
    }
    
    console.log('Admin user initialized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('FAILED:', error.message);
    process.exit(1);
  }
};

run();
