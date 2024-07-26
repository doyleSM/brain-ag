export class CreateFarmDto {
  cpfCnpj: string;
  farmerName: string;
  farmName: string;
  city: string;
  state: string;
  totalAreaHectares: number;
  cultivableAreaHectares: number;
  vegetationAreaHectares: number;
  crops: string[];
}
