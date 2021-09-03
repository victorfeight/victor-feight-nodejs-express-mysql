import { NextFunction } from 'express';

// create a database connection
const mysql = require('mysql2/promise');

// Create the Connection Pool, set configuration via dotenv
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// import express() call
const app = require('@src/server');

// We expect a MySQL Connection Pool as the Request
app.use(async function (req: any, res: any, next: NextFunction) {
  try {
    req.db = await pool.getConnection();
    try {
      const session = await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
      const time_zone = await req.db.query(`SET time_zone = '-8:00'`);
      console.log('Successfully connected to the database');
      req.db.connection.config.namedPlaceholders = true;
    } finally {
      req.db.release();
      next();
    }
  } catch (err: any) {
    console.log(err.message);
    if (req.db) req.db.release();
    res.status(500).json({ error: err, reason: err.message });
    return;
  }
});

module.exports = pool;
