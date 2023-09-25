import express, {Application} from 'express';
import cors from 'cors';
import routesProduct from '../routes/product';
import routesUser from '../routes/usuario';
import { User } from './usuario';
import sequelize from '../db/connection';

class Server{
    private app: Application;
    private port: string | undefined;

    constructor(){
        console.log('Estoy en el constructor');
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnectValidate();
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('App corriendo en el puerto '+this.port);
        })
    }
    routes(){
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/users/login', routesUser);
    }
    midlewares(){
        this.app.use(express.json());

        //Cors
        this.app.use(cors());
    }
    async dbConnect() {
        try {
            await User.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async dbConnectValidate(){
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
    
}
export default Server;