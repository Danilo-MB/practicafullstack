import {Request, Response} from 'express';
import pool from '../database';

class PokesController {

    public index(req: Request, res: Response){
        pool.query('SELECT * FROM poke', (err, result, fields) => {
            res.json(result);
        });
    }

    public create(req: Request, res: Response){
        console.log(JSON.stringify(req.body));
        pool.query('INSERT INTO poke (id, descr) VALUES (?,?)', [req.body.id, req.body.desc], function (error, results, fields){
            if (error) {
                console.log("Error creating connection: " + error);
                res.json({
                    message: "error",
                    error: error
                })
            } else {
                res.json({message: 'ok'});
            }
        });
    }

    public delete(req: Request, res: Response){
        res.json({text: 'deleting a description'})
    }

    public update(req: Request, res: Response){
        res.json({text: 'updating a description'})
    }
}

export const pokesController = new PokesController();