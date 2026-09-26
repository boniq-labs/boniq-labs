import { Op } from 'sequelize';
import User from '../models/User.js';

const initAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@system';
    const adminName = process.env.ADMIN_NAME || 'goxriddle';
    const adminPassword = process.env.ADMIN_PASSWORD || 'gutuza.24@';
    
    const adminExists = await User.findOne({ 
      where: { 
        [Op.or]: [
          { email: adminEmail },
          { name: adminName }
        ]
      } 
    });
    
    if (!adminExists) {
      console.log('Admin user not found in database. Creating default admin...');
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword
      });
      console.log('Admin user created successfully in database.');
    } else {
      console.log('Admin user already exists in database.');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error.message);
  }
};

export default initAdmin;
