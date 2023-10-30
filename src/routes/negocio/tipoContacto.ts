import {Router} from 'express';
import validarToken from '.././validarToken';
import { deleteTipoContacto, getAllTipoContactos, getTipoContacto, postTipoContacto, updateTipoContacto } from '../../controllers/negocio/tipoContacto-controller';

const routerTipoContacto = Router()

routerTipoContacto.get('/getAllTipoContactos',validarToken, getAllTipoContactos);//consulta todas las direcciónes en la base de datos
routerTipoContacto.get('/getTipoContacto',validarToken, getTipoContacto);//consulta una dirección en la base de datos
routerTipoContacto.post('/postTipoContacto',validarToken, postTipoContacto); // Inserta una dirección en la base de datos
routerTipoContacto.delete('/deleteTipoContacto',validarToken, deleteTipoContacto); //Elimina una dirección en la base de datos
routerTipoContacto.post('/updateTipoContacto',validarToken, updateTipoContacto); // actualiza una dirección en la base de datos

export default routerTipoContacto;
















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */