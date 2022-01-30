import { NextFunction, Request, Response } from "express";
import DatabaseConnectionError from "../errors/database-connection-error";
import RequestValidationError from "../errors/request-validation-error";

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof RequestValidationError) {
    const formattedError = error.errors.map(error => {
      return { field: error.param, message: error.msg }
    })

    return response.status(400).json({ errors: formattedError })
  }

  if (error instanceof DatabaseConnectionError)
    return response.status(500).json({ errors: [{ message: error.reason }] })

  response.status(400).json({ errors: [{ message: 'Something went wrong' }] })
}

export default errorHandler