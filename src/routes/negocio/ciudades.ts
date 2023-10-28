import {Router} from 'express';
import validarToken from '.././validarToken';
import { deleteCiudad, getAllCiudades, getCiudad, postCiudad, updateCiudad } from '../../controllers/negocio/ciudades-controller';

const routerCiudades = Router()

routerCiudades.get('/getAllCiudades',validarToken, getAllCiudades);//consulta todas las ciudades en la base de datos
routerCiudades.get('/getCiudad',validarToken, getCiudad);//consulta una ciudad en la base de datos
routerCiudades.post('/postCiudad',validarToken, postCiudad); // Inserta una ciudad en la base de datos
routerCiudades.delete('/deleteCiudad',validarToken, deleteCiudad); //Elimina una ciudad en la base de datos
routerCiudades.post('/updateCiudad',validarToken, updateCiudad); // actualiza una ciudad en la base de datos

export default routerCiudades;













/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */