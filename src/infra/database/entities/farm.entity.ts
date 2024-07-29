import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { CropEntity } from './crop.entity';
import { FarmerEntity } from './farmer.entity';

@Entity({ name: 'farms' })
export class FarmEntity {
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

  @Column({
    length: 100,
    nullable: false,
  })
  city: string;

  @Column({
    length: 2,
    nullable: false,
  })
  state: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    name: 'total_area',
  })
  totalAreaHectares: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    name: 'cultivable_area',
  })
  cultivableAreaHectares: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    name: 'vegetation_area',
  })
  vegetationAreaHectares: number;

  @OneToOne(() => FarmerEntity)
  @JoinColumn({
    name: 'farmer_id',
    referencedColumnName: 'id',
  })
  farmer: FarmerEntity;

  @ManyToMany(() => CropEntity)
  @JoinTable({
    name: 'farms_crops',
    joinColumn: {
      name: 'farm_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'crop_id',
      referencedColumnName: 'id',
    },
  })
  crops: CropEntity[];
}
