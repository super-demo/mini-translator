/**
 * @name HttpError
 * @param {string} message - error message.
 * @returns {object} - error object.
 */

export default class HttpError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = "HttpError"
    this.statusCode = statusCode
  }
}
