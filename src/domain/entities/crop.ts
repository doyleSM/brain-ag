import { BaseEntity } from './base';

export class Crop extends BaseEntity {
  private _name: string;

  constructor(name: string, id?: string) {
    super(id);
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
