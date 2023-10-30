import {Router} from 'express';
import validarToken from '.././validarToken';
import { deleteTipoDireccion, getAllTipoDirecciones, getTipoDireccion, postTipoDireccion, updateTipoDireccion } from '../../controllers/negocio/tipoDireccion-controller';

const routerTipoDireccion = Router()

routerTipoDireccion.get('/getAllTipoDirecciones',validarToken, getAllTipoDirecciones);//consulta todas las direcciónes en la base de datos
routerTipoDireccion.get('/getTipoDireccion',validarToken, getTipoDireccion);//consulta una dirección en la base de datos
routerTipoDireccion.post('/postTipoDireccion',validarToken, postTipoDireccion); // Inserta una dirección en la base de datos
routerTipoDireccion.delete('/deleteTipoDireccion',validarToken, deleteTipoDireccion); //Elimina una dirección en la base de datos
routerTipoDireccion.post('/updateTipoDireccion',validarToken, updateTipoDireccion); // actualiza una dirección en la base de datos

export default routerTipoDireccion;
















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */