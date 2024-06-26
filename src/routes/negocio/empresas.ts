import {Router} from 'express';
import validarToken from '../validarToken';
import { activateEmpresa, deleteEmpresa, getAllEmpresas, getEmpresa, getEmpresaSearch, getEmpresasPymes, inactivateEmpresa, postEmpresa, updateEmpresa } from '../../controllers/negocio/empresas-controller';


const routerEmpresa = Router()

routerEmpresa.get('/getAllEmpresas',validarToken , getAllEmpresas); // Obtiene todas las Empresas
routerEmpresa.post('/getEmpresa', getEmpresa); // Obtiene la Empresa especificada
routerEmpresa.post('/postEmpresa', validarToken, postEmpresa);//Inserta una nueva Empresa en la Base de Datos
routerEmpresa.delete('/deleteEmpresa',validarToken,deleteEmpresa);//Elimina la Empresa de la Base de Datos
routerEmpresa.post('/updateEmpresa', validarToken,updateEmpresa);//Actualiza la Pyme en la Base de Datos
routerEmpresa.post('/inactivateEmpresa',validarToken, inactivateEmpresa);//Inactiva una Pyme en la DB
routerEmpresa.post('/activateEmpresa',validarToken, activateEmpresa);//Activa una Pyme en la DB
routerEmpresa.post('/getEmpresasPymes',validarToken, getEmpresasPymes);//Activa una Pyme en la DB
routerEmpresa.get('/getEmpresaSearch/:id_empresa',validarToken, getEmpresaSearch);//Activa una Pyme en la DB


export default routerEmpresa;