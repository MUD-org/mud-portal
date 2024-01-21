import log from './logging';

export class ApiError extends Error {
  private statusCode: number;
  constructor(name: string, statusCode: number, message?: string) {
      super(message);
      this.name = name;
      this.statusCode = statusCode;
  }

  debug() {
    log.info(`HTTP-${this.statusCode} [${this.name}]: ${this.message}`);
  }
}