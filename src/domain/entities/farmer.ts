import { BaseEntity } from './base';

export class Farmer extends BaseEntity {
  private _cpfCnpj: string;
  private _name: string;

  constructor(cpfCnpj: string, name: string, id?: string) {
    super(id);
    this._cpfCnpj = cpfCnpj;
    this._name = name;
  }

  get cpfCnpj(): string {
    return this._cpfCnpj;
  }

  set cpfCnpj(value: string) {
    this._cpfCnpj = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this._name = value;
  }

  toJson() {
    return {
      id: this.id,
      cpfCnpj: this.cpfCnpj,
      name: this.name,
    };
  }
}
