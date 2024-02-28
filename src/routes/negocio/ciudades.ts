import {Router} from 'express';
import validarToken from '.././validarToken';
import { activateCiudad, deleteCiudad, getAllCiudades, getCiudad, getCiudades, inactivateCiudad, postCiudad, updateCiudad } from '../../controllers/negocio/ciudades-controller';

const routerCiudades = Router()

routerCiudades.get('/getAllCiudades',validarToken, getAllCiudades);//consulta todas las ciudades en la base de datos
routerCiudades.get('/getCiudad',validarToken, getCiudad);//consulta una ciudad en la base de datos
routerCiudades.get('/getCiudades',validarToken, getCiudades);//consulta una ciudad en la base de datos
routerCiudades.post('/postCiudad',validarToken, postCiudad); // Inserta una ciudad en la base de datos
routerCiudades.delete('/deleteCiudad',validarToken, deleteCiudad); //Elimina una ciudad en la base de datos
routerCiudades.post('/updateCiudad',validarToken, updateCiudad); // actualiza una ciudad en la base de datos
routerCiudades.post('/inactivateCiudad',validarToken, inactivateCiudad);//Inactiva una Ciudad en la DB
routerCiudades.post('/activateCiudad',validarToken, activateCiudad);//Activa una Ciudad en la DB


export default routerCiudades;













/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */