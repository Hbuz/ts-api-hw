import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsEnum } from 'class-validator'


export enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
  yellow = 'yellow',
  magenta = 'magenta'
}


@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: false })
  name: string

  @IsEnum(Color)  //NOT WORKING WITH PARTIAL?
  @Column('enum', { nullable: false })
  color: Color

  @Column('json', { nullable: false })
  board: JSON

}
