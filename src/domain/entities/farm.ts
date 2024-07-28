import { ValidationError } from '../errors/validation.error';
import { BaseEntity } from './base';
import { Crop } from './crop';
import { Farmer } from './farmer';

export class Farm extends BaseEntity {
  private _name: string;
  private _city: string;
  private _state: string;
  private _totalAreaHectares: number;
  private _cultivableAreaHectares: number;
  private _vegetationAreaHectares: number;
  private _crops: Crop[] = [];
  private _farmer: Farmer;

  constructor(
    name: string,
    city: string,
    state: string,
    totalAreaHectares: number,
    cultivableAreaHectares: number,
    vegetationAreaHectares: number,
    id?: string,
  ) {
    super(id);
    this._name = name;
    this._city = city;
    this._state = state;
    this._totalAreaHectares = totalAreaHectares;
    this._cultivableAreaHectares = cultivableAreaHectares;
    this._vegetationAreaHectares = vegetationAreaHectares;

    if (cultivableAreaHectares + vegetationAreaHectares > totalAreaHectares) {
      throw new ValidationError('Agricultural and vegetation area cannot be greater than total area');
    }
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new ValidationError('Name cannot be empty');
    }
    this._name = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    if (!value || value.trim().length === 0) {
      throw new ValidationError('City cannot be empty');
    }
    this._city = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    if (!value || value.trim().length === 0) {
      throw new ValidationError('State cannot be empty');
    }
    this._state = value;
  }

  get totalAreaHectares(): number {
    return this._totalAreaHectares;
  }

  set totalAreaHectares(value: number) {
    if (value < 0 || value < this._cultivableAreaHectares + this._vegetationAreaHectares) {
      throw new ValidationError('Invalid total area');
    }
    this._totalAreaHectares = value;
  }

  get cultivableAreaHectares(): number {
    return this._cultivableAreaHectares;
  }

  set cultivableAreaHectares(value: number) {
    if (value < 0 || value + this._vegetationAreaHectares > this._totalAreaHectares) {
      throw new ValidationError('Invalid agricultural area');
    }
    this._cultivableAreaHectares = value;
  }

  get vegetationAreaHectares(): number {
    return this._vegetationAreaHectares;
  }

  set vegetationAreaHectares(value: number) {
    if (value < 0 || this._cultivableAreaHectares + value > this._totalAreaHectares) {
      throw new ValidationError('Invalid vegetation area');
    }
    this._vegetationAreaHectares = value;
  }

  set farmer(value: Farmer) {
    this._farmer = value;
  }

  get farmer(): Farmer {
    return this._farmer;
  }

  get crops(): Crop[] {
    return this._crops;
  }

  addCrops(crops: Crop[]): void {
    this._crops.push(...crops);
  }

  removeCrop(crop: Crop): void {
    const index = this._crops.indexOf(crop);
    if (index > -1) {
      this._crops.splice(index, 1);
    }
  }

  removeCrops(crops: Crop[]): void {
    crops.forEach((crop) => this.removeCrop(crop));
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      city: this.city,
      state: this.state,
      totalAreaHectares: this.totalAreaHectares,
      cultivableAreaHectares: this.cultivableAreaHectares,
      vegetationAreaHectares: this.vegetationAreaHectares,
      crops: this.crops.map((crop) => crop.toJson()),
      farmer: this.farmer.toJson(),
    };
  }
}
