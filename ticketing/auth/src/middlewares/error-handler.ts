import { NextFunction, Request, Response } from "express"
import CustomError from "../errors/custom-error"

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError)
    return response.status(error.statusCode).json({ errors: error.serializeErrors() })

  response.status(400).json({ errors: [{ message: 'Something went wrong' }] })
}

export default errorHandler