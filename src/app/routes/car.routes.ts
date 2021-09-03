module.exports = (app: any) => {
  const car = require('@controllers/car.controller');
  const createError = require('http-errors');

  // Create a new Car
  app.post('/car', car.create);

  // Get all Cars
  app.get('/car', car.findAll);

  // Get a single Car with carId
  app.get('/car/:carId', car.findOne);

  // Update a Car with carId
  app.put('/car/:carId', car.update);

  // Delete a Car with carId
  app.delete('/car/:carId', car.delete);

  // Delete all cars
  app.delete('/car', car.deleteAll);

  app.use((req: any, res: any, next: any) => {
    next(createError(404));
  });

  // Error Handler
  app.use((error: any, req: any, res: any, next: any) => {
    // Logging the error
    console.log('Error status: ', error.status);
    console.log('Message: ', error.message);

    // HTTP Status code, default to 500 if no status (ie file reading error)
    res.status(error.status || 500);

    // Response
    res.json({
      status: error.status,
      message: error.message,
      stack: error.stack
    });
  });
};
