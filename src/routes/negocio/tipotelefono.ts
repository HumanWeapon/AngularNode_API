import {Router} from 'express';
import validarToken from '.././validarToken';
import { deleteTelefono, getAllTelefonos,getOneTelefono, postTelefono, updateTelefono } from '../../controllers/negocio/tipotelefono-controller';


const routertipoTelefono = Router()

routertipoTelefono.get('/getAllTelefonos', getAllTelefonos);//Consulta todos los Telefonos de la Base de Datos
routertipoTelefono.post('/getOneTelefono',getOneTelefono);//Consulta un Telefono en la Base de Datos
routertipoTelefono.delete('/deleteTelefono',deleteTelefono);//Elimina el Telefono de la Base de Datos
routertipoTelefono.post('/updateTelefono', updateTelefono);//Actualiza el Telefono en la Base de Datos
routertipoTelefono.post('/postTelefono', postTelefono);//Inserta un nuevo Telefono en la Base de Datos

export default routertipoTelefono;