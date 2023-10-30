import {Router} from 'express';
import validarToken from '.././validarToken';
import { deleteTipoEmpresa, getAllTipoEmpresa, getTipoEmpresa, postTipoEmpresa, updateTipoEmpresa } from '../../controllers/negocio/tipoEmpresa-controller';

const routerTipoEmpresa = Router()

routerTipoEmpresa.get('/getAllTipoEmpresa',validarToken, getAllTipoEmpresa);//consulta todas las direcciónes en la base de datos
routerTipoEmpresa.get('/getTipoEmpresa',validarToken, getTipoEmpresa);//consulta una dirección en la base de datos
routerTipoEmpresa.post('/postTipoEmpresa',validarToken, postTipoEmpresa); // Inserta una dirección en la base de datos
routerTipoEmpresa.delete('/deleteTipoEmpresa',validarToken, deleteTipoEmpresa); //Elimina una dirección en la base de datos
routerTipoEmpresa.post('/updateTipoEmpresa',validarToken, updateTipoEmpresa); // actualiza una dirección en la base de datos

export default routerTipoEmpresa;