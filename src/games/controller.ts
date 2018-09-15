import { JsonController, Get, Param, Post, HttpCode, Body, Put, NotFoundError, BadRequestError } from 'routing-controllers'
import { Game, Color } from './entity'
import { validate } from 'class-validator';

@JsonController()
export default class GameController {

  @Get('/games')
  async allGames() {
    const games: Game[] = await Game.find()
    return { games }
  }


  @Post('/games')
  @HttpCode(201)
  createGame(
    @Body() body: string
  ) {

    const name: string = body['name']

    const color: string = Object.values(Color)[(Math.floor(Math.random() * Object.keys(Color).length))]

    const board: JSON = JSON.parse(JSON.stringify(defaultBoard))

    const newGame: Game = Game.create({ name, color, board })

    return newGame.save()
  }


  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() body: Partial<Game>
  ) {

    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')

    //Other way for color validating
    /* 
    const {board, color} = body
    if(color && !(color in Color)) throw new BadRequestError(`The color: ${color} is not valid`)
    */
    const { name, board, color } = body

    if (board && moves(game['board'], board) > 1) throw new BadRequestError('You can make one move at time')

    const newGame: Game = Game.create({ name, color, board })
    if (color) {
      const checkColor: number = await validate(newGame).then(errors => { // errors is an array of validation errors
        return errors.length
      })
      if (checkColor > 0) throw new BadRequestError('color must be a valid enum value')
    }

    return Game.merge(game, newGame).save()
  }

}


const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length


const defaultBoard = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]