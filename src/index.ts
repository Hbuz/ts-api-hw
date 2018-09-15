import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import Game from "./games/controller"
import setupDb from './db'

const port = process.env.PORT

const app = createKoaServer({
   controllers: [Game]
})


setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))