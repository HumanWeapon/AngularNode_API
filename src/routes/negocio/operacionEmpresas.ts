import {Router} from 'express';
import {validarToken} from '../validarToken';
import { getAllOpEmpresas, getOpEmpresa, postOpEmpresa } from '../../controllers/negocio/operacionEmpresas-controller';


const routerOpEmpresa = Router()

routerOpEmpresa.get('/getAllOpEmpresas',validarToken , getAllOpEmpresas); // Obtiene todas las Empresas
routerOpEmpresa.post('/getOpEmpresa', validarToken, getOpEmpresa); // Obtiene la Empresa especificada
routerOpEmpresa.post('/postOpEmpresa', validarToken, postOpEmpresa);//Inserta una nueva Empresa en la Base de Datos

export default routerOpEmpresa;