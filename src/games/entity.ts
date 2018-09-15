import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsEnum } from 'class-validator'


// export enum Color {
//   red = 'red',
//   blue = 'blue',
//   green = 'green',
//   yellow = 'yellow',
//   magenta = 'magenta'
// }

export enum Color {
  red,
  blue,
  green,
  yellow,
  magenta
}


export const moves = (board1, board2) =>{
  const lungh = board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length
    return lungh
}


export const defaultBoard = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]


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
