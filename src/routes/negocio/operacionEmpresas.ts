import {Router} from 'express';
import validarToken from '../validarToken';
import { getAllOpEmpresas, getOpEmpresa } from '../../controllers/negocio/operacionEmpresas-controller';


const routerOpEmpresa = Router()

routerOpEmpresa.get('/getAllOpEmpresas',validarToken , getAllOpEmpresas); // Obtiene todas las Empresas
routerOpEmpresa.post('/getOpEmpresa', getOpEmpresa); // Obtiene la Empresa especificada

export default routerOpEmpresa;