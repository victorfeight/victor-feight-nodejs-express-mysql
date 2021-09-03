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
const createError = require('http-errors');
const Car = require('@models/car.model');
const asyncHandler_1 = require("@utils/asyncHandler");
// ASYNCHRONOUS VERSION:  Create and Save a new Car
exports.create = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request
    if (!req.body) {
        throw createError(400, `Content cannot be empty!`);
    }
    // Create a Car
    const car = new Car({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        deleted_flag: 0
    });
    // Save Car in the database
    const createCar = yield Car.create(car);
    if (!createCar)
        throw createError(500, `Some error occurred while creating car`);
    res.status(200).json([createCar]);
}));
// ASYNCHRONOUS VERSION: Retrieve all Cars from the database.
exports.findAll = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield Car.getAll();
    if (!cars)
        throw createError(500, `Some error occurred while retrieving cars.`);
    res.status(200).json([cars]);
}));
// ASYNCHRONOUS VERSION: Find a single Car with a carId
exports.findOne = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield Car.findById(req.params.carId);
    if (!cars)
        throw createError(500, `Some error occurred while retrieving cars`);
    res.status(200).json([cars]);
}));
// ASYNCHRONOUS VERSION: Update a Car identified by the carId in the request
exports.update = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate Request
    if (!req.body)
        throw createError(400, `Content cannot be empty!`);
    console.log(req.body);
    const carUpdate = yield Car.updateById(req.params.carId, new Car(req.body));
    if (!carUpdate)
        createError(500, `Error updating Car with id ${req.params.carId}.`);
    res.status(200).json([carUpdate]);
}));
// ASYNCHRONOUS VERSION: Delete a Car with the specified carId in the request
exports.delete = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        throw createError(400, `Content cannot be empty!`);
    console.log(req.body);
    const carDelete = yield Car.remove(req.params.carId, new Car(req.body));
    if (!carDelete)
        createError(500, `Error removing Car with id ${req.params.carId}.`);
    res.status(200).json({ message: `Car was deleted successfully!` });
}));
// ASYNCHRONOUS VERSION: Delete all Cars from the database.
exports.deleteAll = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const carsDelete = yield Car.removeAll();
    if (!carsDelete)
        createError(500, `Some error occurred while removing all cars.`);
    res.status(200).json({ message: `All Cars were deleted successfully!` });
}));
//# sourceMappingURL=car.controller.js.map