"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
app.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.db = yield pool.getConnection();
            try {
                const session = yield req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
                const time_zone = yield req.db.query(`SET time_zone = '-8:00'`);
                console.log('Successfully connected to the database');
                req.db.connection.config.namedPlaceholders = true;
            }
            finally {
                req.db.release();
                next();
            }
        }
        catch (err) {
            console.log(err.message);
            if (req.db)
                req.db.release();
            res.status(500).json({ error: err, reason: err.message });
            return;
        }
    });
});
module.exports = pool;
//# sourceMappingURL=db.js.map