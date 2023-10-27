import {Router} from 'express';
import validarToken from '.././validarToken';
import { deleteTelefono, getAllTelefonos,getTelefono, postTelefono, updateTelefono } from '../../controllers/negocio/tipotelefono-controller';


const routertipoTelefono = Router()

routertipoTelefono.get('/getAllTelefonos', validarToken,getAllTelefonos);//Consulta todos los Telefonos de la Base de Datos
routertipoTelefono.get('/getTelefono',validarToken,getTelefono);//Consulta un Telefono en la Base de Datos
routertipoTelefono.delete('/deleteTelefono',validarToken,deleteTelefono);//Elimina el Telefono de la Base de Datos
routertipoTelefono.post('/updateTelefono', validarToken,updateTelefono);//Actualiza el Telefono en la Base de Datos
routertipoTelefono.post('/postTelefono', validarToken,postTelefono);//Inserta un nuevo Telefono en la Base de Datos

export default routertipoTelefono;