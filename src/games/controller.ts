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
    @Body() body: string
  ) {

    const name = body['name']

    const color: Color = Object.values(Color)[(Math.floor(Math.random() * Object.keys(Color).length))]

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

    // const {board, color} = body
    const {board} = body
    if(board && moves(game['board'], board) > 1) throw new BadRequestError('You can make one move at time')

    //IsEnum() Validator is not working with Partial?
    // if(color && !(color in Color)) throw new BadRequestError(`The color: ${color} is not valid`)

    return Game.merge(game, body).save()
  }

}