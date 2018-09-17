import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsEnum } from 'class-validator'
import { Color } from '../lib/utils'


@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: false })
  name: string

  @IsEnum(Color)
  @Column('text', { nullable: false })
  color: string

  @Column('json', { nullable: false })
  board: JSON

}