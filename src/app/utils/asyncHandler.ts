import express, { Request, Response, NextFunction } from 'express';
// Wrap Async Await Routes to handle rejected Promises
export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
