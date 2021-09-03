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
// Constructor for Car, CRUD MySQL Model
const sql = require('@models/db');
const createError = require('http-errors');
// Car constructor
const Car = function (car) {
    this.make = car.make;
    this.model = car.model;
    this.year = car.year;
    this.deleted_flag = car.deleted_flag;
};
// ASYNCHRONOUS CREATE QUERY
Car.create = (newCar) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `INSERT INTO car (make, model, year) 
        VALUES (:make, :model, :year)`;
    try {
        const { make, model, year } = newCar;
        const [data] = yield sql.query(sqlQuery, { make, model, year });
        let inserted_id = [data][0].insertId;
        console.log('Created car: ', Object.assign({ id: inserted_id }, newCar));
        return [data][0];
    }
    catch (error) {
        throw error;
    }
});
// ASYNCHRONOUS FIND BY ID QUERY
Car.findById = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `SELECT * FROM car WHERE id = ${carId} AND deleted_flag = false`;
    try {
        const [data] = yield sql.query(sqlQuery);
        if (![data][0].length) {
            throw createError(404, `No found Car with id ${carId}.`);
        }
        console.log('found customer: ', [data][0]);
        return [data][0];
    }
    catch (error) {
        throw error;
    }
});
// ASYNCHRONOUS UPDATE BY ID
Car.updateById = (id, car) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `UPDATE car SET make = ?, model = ?, year = ?, deleted_flag = ? WHERE id = ?`;
    try {
        const carProperties = [car.make, car.model, car.year, (car.deleted_flag = 0), id];
        const [data] = yield sql.query(sqlQuery, carProperties);
        if ([data][0].affectedRows == 0) {
            throw createError(404, `Car with id ${id} not found`);
        }
        // Return proper car
        console.log('Updated car: ', Object.assign({ id: id }, car));
        return Object.assign({ id: id }, car);
    }
    catch (error) {
        throw error;
    }
});
// ASYNCHRONOUS SOFT REMOVE
Car.remove = (id, car) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `UPDATE car SET deleted_flag = 1 WHERE id = ?`;
    // const sqlQuery = `DELETE FROM car WHERE id = ?`;
    try {
        const carProperties = [(car.deleted_flag = 1), id];
        const [data] = yield sql.query(sqlQuery, carProperties);
        if (!data.changedRows) {
            throw createError(404, `Car with id ${id} not found`);
        }
        console.log('Removed car with id: ', id);
        return [data][0];
    }
    catch (error) {
        throw error;
    }
});
// ASYNCHRONOUS REMOVE ALL
Car.removeAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `UPDATE car SET deleted_flag = 1`;
    try {
        const [data] = yield sql.query(sqlQuery);
        if (!data.changedRows) {
            throw createError(400, `Bad request: The database is empty`);
        }
        console.log(`Deleted ${[data][0].affectedRows} cars`);
        return [data][0];
    }
    catch (error) {
        throw error;
    }
});
// ASYNCHRONOUS GET ALL QUERY
Car.getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `SELECT * FROM car WHERE deleted_flag = false`;
    try {
        // result([data, year, model], null);
        // const [[{ make: data, year, model }]] = await sql.query(sqlQuery);
        // console.log('Cars: ', data, year, model);
        const [data] = yield sql.query(sqlQuery);
        if ([data][0].length === 0) {
            throw createError(400, `Bad request: The database is empty`);
        }
        console.log('Cars: ', data);
        return [data][0];
    }
    catch (error) {
        throw error;
    }
});
module.exports = Car;
//# sourceMappingURL=car.model.js.map