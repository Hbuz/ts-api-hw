import { JsonController, Get, Param, Post, HttpCode, Body, Put, NotFoundError, BadRequestError } from 'routing-controllers'
import { Game, Color, moves, defaultBoard } from './entity'

@JsonController()
export default class GameController {

  @Get('/games') //Try without async await
  async allGames() {
    const games: Game[] = await Game.find()
    return { games } //With envelope?
  }

  // @Get('/games/:id')
  // getGame(
  //   @Param('id') id: number
  // ) {
  //   return Game.findOne(id)
  // }

  @Post('/games')
  @HttpCode(201)
  createGame(
    @Body() name: string
  ) {
    // console.log("CHWDWD   "+JSON.stringify(name))
    const enumColor: string[] = Object.values(Color)

    const enumValues: number[] = Object.keys(Color)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n))

      // console.log("COLRO: "+JSON.stringify(Color))
      // console.log("ENUM VALUES: "+enumValues)

    const randomIndex: number = (Math.floor(Math.random() * enumValues.length))
    // console.log("Random: "+randomIndex)

    // const newColor = enumColor[randomIndex]
    const color: string = enumColor[randomIndex]

    // const newBoard = JSON.parse(JSON.stringify(defaultBoard))
    // const board:JSON = JSON.parse(JSON.stringify(defaultBoard))
    // const obj: any = {'m': defaultBoard}
    const board:JSON = JSON.parse(JSON.stringify(defaultBoard))

    const newGame: Game = Game.create({name:name["name"], color, board})

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

    // const newArr = game['board']
    // console.log("MOVESS: "+JSON.stringify(game['board']))
    // console.log("MOVESS: "+JSON.stringify(board))
    // console.log("MOVESS: "+moves(game.board, board))
    // const arr = JSON.parse(JSON.stringify(Object(board)))
    // console.log("ssddddddddddddddss:"+ arr)
    // console.log("ssddddddddddddddss:"+ moves([
    //   ['o', 'o', 'o'],
    //   ['o', 'o', 'o'],
    //   ['o', 'o', 'o']
    // ], [
    //   ['o', 'o', 'o'],
    //   ['o', 'o', 'o'],
    //   ['o', 'x', 'x']
    // ]))
    // const a = game['board']
  
    if(board && moves(game['board'], board) > 1) throw new BadRequestError('You can make one move at time')

    return Game.merge(game, newValue).save()
  }
}