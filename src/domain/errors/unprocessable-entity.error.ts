import { BaseError } from './base.error';

export class UnprocessableEntityError extends BaseError {
  public statusCode: number;

  constructor(messages: string | string[]) {
    super(messages);
    this.name = 'UnprocessableEntityError';
  }
}
