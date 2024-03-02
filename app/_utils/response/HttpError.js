export default class HttpError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
