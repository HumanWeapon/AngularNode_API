import {Router} from 'express';
import validarToken from '.././validarToken';
import { getAllPaises, getOnePaises } from '../../controllers/negocio/paises-controller';


const routerPaises = Router()

routerPaises.get('/getAllPaises',validarToken, getAllPaises);//Consulta todos los parametros en la base de datos
routerPaises.post('/getOnePaises',validarToken, getOnePaises);//Consulta todos los parametros en la base de datos

export default routerPaises;