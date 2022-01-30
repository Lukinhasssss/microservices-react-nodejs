import { NextFunction, Request, Response } from "express"
import DatabaseConnectionError from "../errors/database-connection-error"
import RequestValidationError from "../errors/request-validation-error"

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof RequestValidationError)
    return response.status(error.statusCode).json({ errors: error.serializeErrors() })

  if (error instanceof DatabaseConnectionError)
    return response.status(error.statusCode).json({ errors: error.serializeErrors() })

  response.status(400).json({ errors: [{ message: 'Something went wrong' }] })
}

export default errorHandler