import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || process.env.DB_NAME || 'boniq_portfolio';
const dbUser = process.env.MYSQLUSER || process.env.DB_USER || 'root';
const dbPass = process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD || process.env.DB_PASS || '';
const dbHost = process.env.MYSQLHOST || process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.MYSQLPORT || process.env.DB_PORT || 3306;

// Allow direct connection URL if provided (Railway provides MYSQL_PUBLIC_URL or MYSQL_URL)
const connectionUrl = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

const isProduction = process.env.NODE_ENV === 'production';
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
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
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
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

const connectDB = async () => {
  try {
    // Railway databases are pre-created, but for local development we might want to create the db.
    if (!connectionUrl) {
      try {
        const connection = await mysql.createConnection({
          host: dbHost,
          port: dbPort,
          user: dbUser,
          password: dbPass,
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await connection.end();
      } catch (err) {
        console.log('Skipping db creation (might be a remote DB with limited privileges)');
      }
    }

    await sequelize.authenticate();
    console.log(`MySQL Connected via Sequelize: ${dbName}`);
    
    // Sync models - use alter in development, but be careful in production
    if (isProduction) {
      await sequelize.sync({ alter: true });
    } else {
      await sequelize.sync({ alter: true });
    }
    console.log(`All models were synchronized successfully.`);
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error.message}`);
    console.log('Server will continue running, but DB-dependent features will fail.');
  }
};

export { sequelize, connectDB };
export default connectDB;
