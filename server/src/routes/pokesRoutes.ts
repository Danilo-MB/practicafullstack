import { pokesController } from './../controllers/pokesController';
import { Router } from 'express';

class PokesRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', pokesController.index);
        this.router.post('/', pokesController.create);
        this.router.delete('/:id', pokesController.delete);
        this.router.put('/:id', pokesController.update);
    }

}

const pokesRoutes = new PokesRoutes();
export default pokesRoutes.router;