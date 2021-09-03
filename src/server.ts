import { Request, Response } from 'express';

// Initialize express ( Require SYNTAX )
const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
module.exports = app;

// parse requests of content-type: application/JSON payloads
// parse requests of content type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// A simple route
app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: "Welcome to Victor's Express Server. :)" });
});

// Import car.routes component
require('@routes/car.routes')(app);

// Set port, listen for requests
const port = process.env.PORT || 3000;
const server = app.listen(port, (): void =>
  console.log(`Listening on http://localhost:${port}`)
);
