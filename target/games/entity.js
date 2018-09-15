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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("typeorm/repository/BaseEntity");
const class_validator_1 = require("class-validator");
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color["Blue"] = "blue";
    Color["Green"] = "green";
    Color["Yellow"] = "yellow";
    Color["Magenta"] = "magenta";
})(Color = exports.Color || (exports.Color = {}));
exports.moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
exports.defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
];
let Game = class Game extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Game.prototype, "name", void 0);
__decorate([
    class_validator_1.IsEnum(Color),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Game.prototype, "color", void 0);
__decorate([
    typeorm_1.Column('json', { nullable: false }),
    __metadata("design:type", Object)
], Game.prototype, "board", void 0);
Game = __decorate([
    typeorm_1.Entity()
], Game);
exports.Game = Game;
//# sourceMappingURL=entity.js.map