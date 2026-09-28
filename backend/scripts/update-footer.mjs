import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connectionUrl = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;
const isRailway = !!connectionUrl && (connectionUrl.includes('railway') || connectionUrl.includes('rlwy'));

const sequelize = new Sequelize(connectionUrl, {
  dialect: 'mysql',
  logging: console.log,
  dialectOptions: isRailway ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {},
});

const run = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Connected.');
    
    // Check if profile exists
    const [profiles] = await sequelize.query('SELECT * FROM Profiles LIMIT 1');
    console.log('Profile record:', profiles[0] ? 'Found' : 'Not found');
    if (profiles[0]) {
      console.log('Profile data keys:', Object.keys(profiles[0]));
      console.log('Has footerData:', 'footerData' in profiles[0]);
    }
    
    // Update profile with footerData if missing
    await sequelize.query(`
      UPDATE Profiles 
      SET footerData = '{"siteName":"boniq","tagline":"Let\\'s collaborate on your next project and bring your visionary ideas to life.","ctaText":"Start a Conversation","copyrightText":"All Rights Reserved.","version":"v2.0.0","showCredits":true,"credits":[{"icon":"🎨","text":"Designed by boniq"},{"icon":"⚙️","text":"Developed by boniq"},{"icon":"🚀","text":"Powered by Vue 3"}],"links":[{"label":"Privacy","url":"/privacy"},{"label":"Terms","url":"/terms"},{"label":"GitHub","url":"https://github.com/boniq"}]}'
      WHERE id = 1
    `);
    console.log('Profile updated with footerData');
    
    process.exit(0);
  } catch (error) {
    console.error('FAILED:', error.message);
    process.exit(1);
  }
};

run();