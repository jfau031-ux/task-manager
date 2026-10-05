import { ApplicationError } from './application.error.js';

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
