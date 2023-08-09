/* eslint max-classes-per-file: ["error", 7] */
/* eslint no-use-before-define: ["error", { "classes": false }] */

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof Unauthorized) {
      return 401;
    }
    if (this instanceof Forbidden) {
      return 403;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof ValidationError) {
      return 409;
    }
    if (this instanceof IncorrectCredentials) {
      return 409;
    }

    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class ValidationError extends GeneralError {}
class Unauthorized extends GeneralError {}
class IncorrectCredentials extends GeneralError {}
class Forbidden extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  ValidationError,
  Unauthorized,
  IncorrectCredentials,
  Forbidden,
};
