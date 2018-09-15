"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
let GameController = class GameController {
    async allGames() {
        const games = await entity_1.Game.find();
        return { games };
    }
    createGame(body) {
        const { name } = body;
        const enumValues = Object.keys(entity_1.Color)
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n));
        const color = Object.values(entity_1.Color)[(Math.floor(Math.random() * enumValues.length))];
        const board = JSON.parse(JSON.stringify(entity_1.defaultBoard));
        const newGame = entity_1.Game.create({ name, color, board });
        return newGame.save();
    }
    async updateGame(id, body) {
        const game = await entity_1.Game.findOne(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError('Cannot find game');
        const { board } = body;
        if (board && entity_1.moves(game['board'], board) > 1)
            throw new routing_controllers_1.BadRequestError('You can make one move at time');
        return entity_1.Game.merge(game, body).save();
    }
};
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "createGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_1.Game]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map