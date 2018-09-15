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
    console.log("CHWDWD   "+JSON.stringify(body))
    console.log("CHWDWD   "+body["name"])
    // const { name, ..._ } = body
    const enumColor: string[] = Object.values(Color)

    const enumValues: number[] = Object.keys(Color)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n))

      const randomIndex: number = (Math.floor(Math.random() * enumValues.length))

    const color: string = enumColor[randomIndex]

    const board:JSON = JSON.parse(JSON.stringify(defaultBoard))

    const newGame: Game = Game.create({name:body["name"], color, board})

    return newGame.save()
  }


  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() newValue: Partial<Game>
  ) {
    const {board} = newValue
    
    const game= await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')

    if(board && moves(game['board'], board) > 1) throw new BadRequestError('You can make one move at time')

    return Game.merge(game, newValue).save()
  }
}