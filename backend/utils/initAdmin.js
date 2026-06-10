import { Op } from 'sequelize';
import User from '../models/User.js';

const initAdmin = async () => {
  try {
    const adminEmail = 'admin@system';
    const adminName = 'goxriddle';
    
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
        password: 'gutuza.24@'
      });
      console.log('Admin user created successfully in database.');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error.message);
  }
};

export default initAdmin;
