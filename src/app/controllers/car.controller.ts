// TODO: Implement it async, and soft-delete
// import express, { Request, Response, NextFunction } from 'express';
import { NextFunction, Request, Response } from 'express';
const createError = require('http-errors');
const Car = require('@models/car.model');
import { asyncHandler } from '@utils/asyncHandler';

// ASYNCHRONOUS VERSION:  Create and Save a new Car
exports.create = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
    const createCar = await Car.create(car);
    if (!createCar) throw createError(500, `Some error occurred while creating car`);
    res.status(200).json([createCar]);
  }
);

// ASYNCHRONOUS VERSION: Retrieve all Cars from the database.
exports.findAll = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cars = await Car.getAll();
    if (!cars) throw createError(500, `Some error occurred while retrieving cars.`);
    res.status(200).json([cars]);
  }
);

// ASYNCHRONOUS VERSION: Find a single Car with a carId
exports.findOne = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cars = await Car.findById(req.params.carId);
    if (!cars) throw createError(500, `Some error occurred while retrieving cars`);
    res.status(200).json([cars]);
  }
);

// ASYNCHRONOUS VERSION: Update a Car identified by the carId in the request
exports.update = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate Request
    if (!req.body) throw createError(400, `Content cannot be empty!`);
    console.log(req.body);
    const carUpdate = await Car.updateById(req.params.carId, new Car(req.body));
    if (!carUpdate) createError(500, `Error updating Car with id ${req.params.carId}.`);
    res.status(200).json([carUpdate]);
  }
);

// ASYNCHRONOUS VERSION: Delete a Car with the specified carId in the request
exports.delete = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) throw createError(400, `Content cannot be empty!`);
    console.log(req.body);
    const carDelete = await Car.remove(req.params.carId, new Car(req.body));
    if (!carDelete) createError(500, `Error removing Car with id ${req.params.carId}.`);
    res.status(200).json({ message: `Car was deleted successfully!` });
  }
);

// ASYNCHRONOUS VERSION: Delete all Cars from the database.
exports.deleteAll = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const carsDelete = await Car.removeAll();
    if (!carsDelete) createError(500, `Some error occurred while removing all cars.`);
    res.status(200).json({ message: `All Cars were deleted successfully!` });
  }
);
