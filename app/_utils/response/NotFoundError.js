import HttpError from './HttpError';

export default class NotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}
