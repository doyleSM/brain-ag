import { BaseError } from './base.error';

export class NotFoundError extends BaseError {
  constructor(messages: string | string[]) {
    super(messages);
    this.name = 'NotFoundError';
  }
}
