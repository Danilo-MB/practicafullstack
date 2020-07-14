import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import pokesRoutes from './routes/pokesRoutes';
import morgan from 'morgan';
import cors from 'cors';

class Server {

    public app: Application;

    constructor(){
       this.app = express();
       this.config();
       this.routes();
    }

    config(): void {
        this.app.set('port', 3001);  // process.env.PORT || # puerto 
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded()); // (urlencoded(extended: false)) 44:55 del video
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/pokes', pokesRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port " + this.app.get('port'))
        });
    }
}

const server = new Server();
server.start();