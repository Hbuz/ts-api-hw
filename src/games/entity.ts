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


export const moves = (board1, board2) =>{
// console.log("BOARD 1: "+board1)
// console.log("BOARD 2: "+board2)
  const lungh = board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length
    console.log("MOVES: "+lungh)
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

  @IsEnum(Color)
  @Column('text', { nullable: false })
  color: string

  @Column('json', { nullable: false })
  board: JSON

}
