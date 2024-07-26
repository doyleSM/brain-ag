import { BaseError } from './base.error';

export class ValidationError extends BaseError {
  public statusCode: number;

  constructor(messages: string | string[]) {
    super(messages);
    this.name = 'ValidationError';
  }
}
