import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }
  if (error instanceof ZodError) {
    res.status(400).json({
      message: error.errors,
    });
    return;
  }
  console.error(error);
  res.status(500).json({
    message: "Internal server error",
  });
  console.error(error);
};
