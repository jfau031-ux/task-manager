import { ApplicationError } from './application.error.js';

export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
