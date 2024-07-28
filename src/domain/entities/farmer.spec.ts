import { ValidationError } from '../errors/validation.error';
import { Farmer } from './farmer';

describe('Farmer', () => {
  it('should create a Farmer', async () => {
    const farmer = new Farmer('12345678901', 'John Doe', '6bafa057-6f9f-4657-82c9-b18a89758a52');
    expect(farmer.toJson()).toEqual({
      cpfCnpj: '12345678901',
      name: 'John Doe',
      id: '6bafa057-6f9f-4657-82c9-b18a89758a52',
    });
  });

  it('should throw error if name is empty', async () => {
    expect(() => new Farmer('12345678901', '')).toThrow(new ValidationError('Name cannot be empty'));
  });

  it('should throw error if name is null', async () => {
    expect(() => new Farmer('12345678901', null)).toThrow(new ValidationError('Name cannot be empty'));
  });

  it('should update the name of the farmer', async () => {
    const farmer = new Farmer('12345678901', 'John Doe', '6bafa057-6f9f-4657-82c9-b18a89758a52');
    farmer.name = 'Jane Doe';
    expect(farmer.name).toEqual('Jane Doe');
  });
  it('should update the cpfCnpj of the farmer', async () => {
    const farmer = new Farmer('12345678901', 'John Doe', '6bafa057-6f9f-4657-82c9-b18a89758a52');
    farmer.cpfCnpj = '12345678902';
    expect(farmer.cpfCnpj).toEqual('12345678902');
  });
});
