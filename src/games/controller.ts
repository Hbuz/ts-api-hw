import { JsonController, Get, Param, Post, HttpCode, Body, Put, NotFoundError, BadRequestError } from 'routing-controllers'
import { Game, Color, moves, defaultBoard } from './entity'

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
    @Body() body: Partial<Game>
  ) {

    const { name } = body

    const enumValues: number[] = Object.keys(Color)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n))

    const color: string = Object.values(Color)[(Math.floor(Math.random() * enumValues.length))]

    const board:JSON = JSON.parse(JSON.stringify(defaultBoard))

    const newGame: Game = Game.create({name, color, board})

    return newGame.save()
  }


  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() body: Partial<Game>
  ) {
    
    const game= await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')

    const {board} = body
    if(board && moves(game['board'], board) > 1) throw new BadRequestError('You can make one move at time')

    return Game.merge(game, body).save()
  }
}