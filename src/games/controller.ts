import { JsonController, Get, Param, Post, HttpCode, Body, BodyParam, Put, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity'
import { validate } from 'class-validator';
import { moves, defaultBoard, Color } from '../lib/utils'

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
    @BodyParam("name") name: string
  ) {

    const color: string = Object.values(Color)[(Math.floor(Math.random() * Object.keys(Color).length))]

    const board: JSON = JSON.parse(JSON.stringify(defaultBoard))

    return Game.create({ name, color, board }).save()
  }


  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() body: Partial<Game>
  ) {

    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')

    const { name, board, color } = body

    if (board && moves(game['board'], board) > 1) throw new BadRequestError('You can make one move at time')

    const changedGame: Game = Game.create({ name, color, board })
    if (color) {
      const checkColor: number = await validate(changedGame).then(errors => {
        return errors.length
      })
      if (checkColor > 0) throw new BadRequestError('Invalid color!!! Option available: red, yellow, blue, magenta, green')
    }

    return Game.merge(game, changedGame).save()
  }

}