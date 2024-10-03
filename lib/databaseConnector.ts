import mysql from 'mysql2/promise';
import { Pool } from 'pg';
import sqlite3 from 'sqlite3';

export async function connectToDatabase(config: any) {
  switch (config.type) {
    case 'MySQL':
      return await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database,
      });
    case 'PostgreSQL':
      return new Pool({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database,
      });
    case 'SQLite':
      return new sqlite3.Database(config.database);
    default:
      throw new Error('Unsupported database type');
  }
}