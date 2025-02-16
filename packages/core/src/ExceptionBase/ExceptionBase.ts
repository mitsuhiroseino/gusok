export default class ExceptionBase extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}
