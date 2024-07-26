export type CreateFarmOutputDto = {
  id: string;
  name: string;
  city: string;
  state: string;
  totalAreaHectares: number;
  cultivableAreaHectares: number;
  vegetationAreaHectares: number;
  crops: {
    id: string;
    name: string;
  }[];
  farmer: {
    id: string;
    name: string;
    cpfCnpj: string;
  };
};
