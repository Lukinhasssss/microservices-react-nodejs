import CustomError from "./custom-error"

class UnauthorizedError extends CustomError {
  statusCode = 401

  constructor() {
    super('Unauthorized')
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }

  serializeErrors() {
    return [{ message: 'Unauthorized' }]
  }

}

export default UnauthorizedError