import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'farmers' })
export class FarmerEntity {
  @PrimaryColumn({
    nullable: false,
    unique: true,
  })
  id: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({ length: 14, nullable: false, unique: true, name: 'cpf_cnpj' })
  cpfCnpj: string;
}
