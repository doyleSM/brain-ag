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

  set name(value: string) {
    this._name = value;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
