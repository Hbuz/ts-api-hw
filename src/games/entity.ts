import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsEnum } from 'class-validator'


export enum Color {
  red,
  blue,
  green,
  yellow,
  magenta
}


@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: false })
  name: string

  @IsEnum(Color)  //NOT WORKING?
  @Column('enum', { nullable: false, enum: Color })
  color: Color

  @Column('json', { nullable: false })
  board: JSON

}
