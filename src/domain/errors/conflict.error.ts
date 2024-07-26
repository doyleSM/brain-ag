import { BaseError } from './base.error';

export class ConflictError extends BaseError {
  public statusCode: number;

  constructor(messages: string | string[]) {
    super(messages);
    this.name = 'ConflictError';
  }
}
