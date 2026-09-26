import { Sequelize } from 'sequelize';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || process.env.DB_NAME || 'boniq_portfolio';
const dbUser = process.env.MYSQLUSER || process.env.DB_USER || 'root';
const dbPass = process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD || process.env.DB_PASS || '';
const dbHost = process.env.MYSQLHOST || process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.MYSQLPORT || process.env.DB_PORT || 3306;

const connectionUrl = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;
const isRailway = !!connectionUrl && (connectionUrl.includes('railway') || connectionUrl.includes('rlwy'));

let sequelize;
if (connectionUrl) {
  sequelize = new Sequelize(connectionUrl, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: isRailway ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
  });
} else {
  sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPass,
    {
      host: dbHost,
      port: dbPort,
      dialect: 'mysql',
      logging: false,
    }
  );
}

const run = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Connected.');
    
    await sequelize.sync({ alter: true });
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@system';
    const adminName = process.env.ADMIN_NAME || 'goxriddle';
    const adminPassword = process.env.ADMIN_PASSWORD || 'gutuza.24@';
    
    let admin = await User.findOne({ where: { email: adminEmail } });
    
    if (admin) {
      console.log('Admin already exists. Updating password...');
      admin.password = adminPassword;
      admin.name = adminName;
      await admin.save();
    } else {
      console.log('Creating new admin...');
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword
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
