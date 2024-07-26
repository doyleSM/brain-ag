import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'crop' })
export class CropEntity {
  @PrimaryColumn({
    nullable: false,
    unique: true,
  })
  id: string;

  @Column({
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;
}
