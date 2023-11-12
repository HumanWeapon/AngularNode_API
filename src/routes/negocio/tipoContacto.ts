import {Router} from 'express';
import validarToken from '.././validarToken';
import { activateTipoContacto, deleteTipoContacto, getAllTipoContactos, getTipoContacto, inactivateTipoContacto, postTipoContacto, updateTipoContacto } from '../../controllers/negocio/tipoContacto-controller';
import routertipoTelefono from './tipotelefono';

const routerTipoContacto = Router()

routerTipoContacto.get('/getAllTipoContactos',validarToken, getAllTipoContactos);//consulta todas las direcciónes en la base de datos
routerTipoContacto.get('/getTipoContacto',validarToken, getTipoContacto);//consulta una dirección en la base de datos
routerTipoContacto.post('/postTipoContacto',validarToken, postTipoContacto); // Inserta una dirección en la base de datos
routerTipoContacto.delete('/deleteTipoContacto',validarToken, deleteTipoContacto); //Elimina una dirección en la base de datos
routerTipoContacto.post('/updateTipoContacto',validarToken, updateTipoContacto); // actualiza una dirección en la base de datos
routerTipoContacto.post('/inactivateTipoContacto',validarToken, inactivateTipoContacto);//Inactiva una Pyme en la DB
routerTipoContacto.post('/activateTipoContacto',validarToken, activateTipoContacto);//Activa una Pyme en la DB

export default routerTipoContacto;
















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */