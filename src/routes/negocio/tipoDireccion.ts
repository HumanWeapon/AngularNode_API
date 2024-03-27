import {Router} from 'express';
import validarToken from '.././validarToken';
import { activateTipoDireccion, deleteTipoDireccion, getAllTipoDirecciones, getTipoDireccion, inactivateTipoDireccion, postTipoDireccion, updateTipoDireccion } from '../../controllers/negocio/tipoDireccion-controller';
import routerTipoEmpresa from './tipoEmpresa';

const routerTipoDireccion = Router()

routerTipoDireccion.get('/getAllTipoDirecciones',validarToken, getAllTipoDirecciones);//consulta todas las direcciónes en la base de datos
routerTipoDireccion.get('/getTipoDireccion',validarToken, getTipoDireccion);//consulta una dirección en la base de datos
routerTipoDireccion.get('/getTipoDirecciones',validarToken, getTipoDireccion);//consulta una dirección en la base de datos
routerTipoDireccion.post('/postTipoDireccion',validarToken, postTipoDireccion); // Inserta una dirección en la base de datos
routerTipoDireccion.delete('/deleteTipoDireccion',validarToken, deleteTipoDireccion); //Elimina una dirección en la base de datos
routerTipoDireccion.post('/updateTipoDireccion',validarToken, updateTipoDireccion); // actualiza una dirección en la base de datos
routerTipoDireccion.post('/inactivateTipoDireccion',validarToken, inactivateTipoDireccion);//Inactiva una Direccion en la DB
routerTipoDireccion.post('/activateTipoDireccion',validarToken, activateTipoDireccion);//Activa una Direccion en la DB

export default routerTipoDireccion;
















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */