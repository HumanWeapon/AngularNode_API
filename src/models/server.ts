import express, {Application} from 'express';
import cors from 'cors';

import { User } from './usuario-models';
import dataBase from '../db/connection';

// Rutas API
import routerPreguntas from '../routes/preguntas';
import routesUser from '../routes/usuario';
import routerPreguntasUsuario from '../routes/preguntas_usuario';
import routerParametros from '../routes/parametros';
import routerRoles from '../routes/rol';
import routerObjetos from '../routes/objetos';
import routerPermisos from '../routes/permisos';
import routerPaises from '../routes/negocio/paises';
import routerCiudades from '../routes/negocio/ciudades';
import routerTipoDireccion from '../routes/negocio/tipoDireccion';
import routerTipoContacto from '../routes/negocio/tipoContacto';
import routerContacto from '../routes/negocio/contacto';
import routerContactoTelefono from '../routes/negocio/contactoTelefono';
import routertipoTelefono from '../routes/negocio/tipotelefono';
import routerPyme from '../routes/negocio/pyme';
import routerBitacora from '../routes/Bitacora';
import routerTipoEmpresa from '../routes/negocio/tipoEmpresa';
import routerCategoria from '../routes/negocio/categoria';
import routerTipo_Requisito from '../routes/negocio/Tipo_Requisito';
import routerProductos from '../routes/negocio/productos';
import routerEmpresa from '../routes/negocio/empresas';
import routerOpEmpresa from '../routes/negocio/operacionEmpresas';
import routerDireccionContacto from '../routes/negocio/direccionContacto';

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
        this.app.use('/api/users', routesUser);
        this.app.use('/api/preguntas',routerPreguntas);
        this.app.use('/api/preguntasusuario',routerPreguntasUsuario);
        this.app.use('/api/parametros',routerParametros);
        this.app.use('/api/roles',routerRoles);
        this.app.use('/api/objetos',routerObjetos);
        this.app.use('/api/permisos', routerPermisos);
        this.app.use('/api/bitacora', routerBitacora);
        this.app.use('/api/paises', routerPaises);
        this.app.use('/api/ciudades', routerCiudades);   //FM
        this.app.use('/api/tipoDireccion', routerTipoDireccion); //FM
        this.app.use('/api/tipoContacto', routerTipoContacto); //FM
        this.app.use('/api/contacto', routerContacto); //FM
        this.app.use('/api/contactoTelefono', routerContactoTelefono); //FM
        this.app.use('/api/tipotelefono', routertipoTelefono);
        this.app.use('/api/pyme', routerPyme);
        this.app.use('/api/categoria',routerCategoria);//BF
        this.app.use('/api/tipoEmpresa',routerTipoEmpresa);
        this.app.use('/api/tipo_requisito', routerTipo_Requisito);
        this.app.use('/api/productos', routerProductos);
        this.app.use('/api/empresa',routerEmpresa);
        this.app.use('/api/opempresa',routerOpEmpresa);
        this.app.use('/api/direcontactos',routerDireccionContacto);
    }
    midlewares(){

        this.app.use(express.urlencoded({ extended: true }));
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
            await dataBase.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
export default Server;