import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
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

const connectDB = async () => {
  try {
    // Ensure database exists before Sequelize connects
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();

    await sequelize.authenticate();
    console.log(`MySQL Connected via Sequelize: ${dbName}`);
    
    // Sync models
    await sequelize.sync({ alter: true });
    console.log(`All models were synchronized successfully.`);
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error.message}`);
    console.log('Server will continue running, but DB-dependent features will fail.');
  }
};

export { sequelize, connectDB };
export default connectDB;
