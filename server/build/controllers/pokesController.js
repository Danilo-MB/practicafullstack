"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokesController = void 0;
const database_1 = __importDefault(require("../database"));
class PokesController {
    constructor() {
        this.getById = function (id, callback) {
            database_1.default.query('SELECT * FROM poke WHERE id = ?', [id], callback);
        };
        this.create = function (req, res) {
            //console.log(JSON.stringify(req.body));
            let resultado = this.getById(req.body.id, (err, result, fields) => {
                console.log("Actualizando");
                console.log(result);
                if (err)
                    throw err;
                if (result.length === 1) {
                    database_1.default.query('UPDATE poke SET descr = ? WHERE id = ?', [req.body.desc, req.body.id], function (error, results, fields) {
                        if (error) {
                            console.log("Error updating" + error);
                            res.json({
                                message: "error",
                                error: error
                            });
                        }
                        else {
                            res.json({ message: 'ok' });
                        }
                    });
                }
                else {
                    database_1.default.query('INSERT INTO poke (id, descr) VALUES (?,?)', [req.body.id, req.body.desc], function (error, results, fields) {
                        if (error) {
                            console.log("Error creating connection: " + error);
                            res.json({
                                message: "error",
                                error: error
                            });
                        }
                        else {
                            res.json({ message: 'ok' });
                        }
                    });
                }
            });
        };
    }
    index(req, res) {
        database_1.default.query('SELECT * FROM poke', (err, result, fields) => {
            res.json(result);
        });
    }
    delete(req, res) {
        res.json({ text: 'deleting a description' });
    }
    update(req, res) {
        res.json({ text: 'updating a description' });
    }
}
exports.pokesController = new PokesController();
