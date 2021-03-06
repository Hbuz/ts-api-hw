# :WIP

# tictactoe-server-game
Tic Tac Toe game on server side created with Typescript, TypeORM, Koa and class-validators using PostgreSQL as DB.

Start the application with the environmental variables PORT and DATABASE_URL

Example:
```DATABASE_URL='postgres://postgres:secret@localhost:5432/postgres' PORT=4000 yarn start```

The default board is:
[
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]

### Functionalities invoked by requests (examples with command line client [httpie](https://httpie.org/)):
* Get all existing games ```@GET``` --> ```$ http :4000/games``` 
* Create a new game ```@POST```     --> ```$ http post :4000/games name=ciao```
* Make a move ```@PUT```            --> ```$ http put :4000/games/1 board:='[["x","o","o"],["o","o","o"],["o","o","o"]]'```
