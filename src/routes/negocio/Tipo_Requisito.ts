import {Router} from 'express';
import validarToken from '../validarToken';
import { deleteTipo_Requisito, getAllTipo_Requisito, postTipo_Requisito, updateTipo_Requisito } from '../../controllers/negocio/Tipo_requisito-controller';
import { getTipo_Requisito } from '../../controllers/negocio/Tipo_requisito-controller';


const routerTipo_Requisito = Router()

routerTipo_Requisito.get('/getAllTipo_Requisito',validarToken, getAllTipo_Requisito);//Muestra todos los Permisos registrados en la base de datos
routerTipo_Requisito.get('/getTipo_Requisito',validarToken, getTipo_Requisito);//Muestra un Permiso seleccionado
routerTipo_Requisito.post('/postTipo_Requisito',validarToken, postTipo_Requisito); // Inserta Permisos en la base de datos
routerTipo_Requisito.delete('/deleteTipo_Requisito',validarToken, deleteTipo_Requisito); // Elimina Permiso en la base de datos
routerTipo_Requisito.post('/updateTipoRequisito',validarToken, updateTipo_Requisito); // actualiza permiso en la base de datos

export default routerTipo_Requisito;