export class BaseError extends Error {
  public messages: string[];

  constructor(messages: string | string[]) {
    super(Array.isArray(messages) ? messages.join('; ') : messages);
    this.name = 'BaseError';
    this.messages = Array.isArray(messages) ? messages : [messages];
  }
}
