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
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ message: "Welcome to Victor's Express Server. :)" });
}));
// Import car.routes component
require('@routes/car.routes')(app);
// Set port, listen for requests
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
//# sourceMappingURL=server.js.map