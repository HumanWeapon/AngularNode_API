import {Router} from 'express';
import {validarToken} from '.././validarToken';
import { activatePais, deletePais, getAllPaises, getPais, inactivatePais, postPais, updatePais } from '../../controllers/negocio/paises-controller';


const routerPaises = Router()

routerPaises.get('/getAllPaises',validarToken, getAllPaises);//Consulta todos los parametros en la base de datos
routerPaises.post('/getPais',validarToken, getPais);//Consulta solo un elemento en la base de datos
routerPaises.post('/postPais', validarToken,postPais);//Inserta una nuevo Pais en la Base de Datos
routerPaises.delete('/deletePais',validarToken,deletePais);//Elimina el Pais de la Base de Datos
routerPaises.post('/updatePais', validarToken,updatePais);//Actualiza el Pais en la Base de Datos
routerPaises.post('/inactivatePais',validarToken, inactivatePais);//Inactiva un Pais en la DB
routerPaises.post('/activatePais',validarToken, activatePais);//Activa un Pais en la DB

export default routerPaises;