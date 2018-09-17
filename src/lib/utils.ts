export const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length


export const defaultBoard = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]

export enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
  yellow = 'yellow',
  magenta = 'magenta'
}