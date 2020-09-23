import {Request, Response} from 'express';
import pool from '../database';
import { MysqlError } from 'mysql';

class PokesController {

    public index(req: Request, res: Response){
        pool.query('SELECT * FROM poke', (err, result, fields) => {
            res.json(result);
        });
    }

    public getById(id: string, callback:(err: MysqlError | null, result: any, fields: any) => any ){
        pool.query('SELECT * FROM poke WHERE id = ?', [id], callback);
    }

    public create(req: Request, res: Response){
        //console.log(JSON.stringify(req.body));
        let resultado = this.getById(req.body.id, (err, result, fields) => {
            console.log("Actualizando");
            console.log(result);
            if(err) throw err;
            if(result.length === 1){
                pool.query('UPDATE poke SET descr = ? WHERE id = ?', [req.body.desc, req.body.id], function (error, results, fields){
                    if (error) {
                        console.log("Error updating" + error);
                        res.json({
                            message: "error",
                            error: error
                        })
                    } else {
                        res.json({message: 'ok'});
                    } 
                });
            }else{
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