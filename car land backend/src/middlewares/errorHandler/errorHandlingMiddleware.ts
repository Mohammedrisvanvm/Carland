import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err: Error, req: Request, res: Response): void => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err instanceof MongooseError.CastError && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    stack: err.stack,
  });
};
export { notFound, errorHandler };
