"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokesController_1 = require("./../controllers/pokesController");
const express_1 = require("express");
class PokesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', pokesController_1.pokesController.index);
        this.router.post('/', pokesController_1.pokesController.create);
        this.router.delete('/:id', pokesController_1.pokesController.delete);
        this.router.put('/:id', pokesController_1.pokesController.update);
    }
}
const pokesRoutes = new PokesRoutes();
exports.default = pokesRoutes.router;
