import { BaseError } from './base.error';

export class ConflictError extends BaseError {
  constructor(messages: string | string[]) {
    super(messages);
    this.name = 'ConflictError';
  }
}
