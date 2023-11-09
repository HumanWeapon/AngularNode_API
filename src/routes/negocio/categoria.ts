// Elaborado Por Breydy Flores
import {Router} from 'express';
import validarToken from '.././validarToken';
import { activateCategoria, deleteCategoria, getAllCategorias, getCategoria, inactivateCategoria, postCategoria, updateCategoria } from '../../controllers/negocio/categoria-controller';

const routerCategoria = Router()

routerCategoria.get('/getAllCategorias',validarToken, getAllCategorias);//consulta todas lascategorias en la base de datos
routerCategoria.get('/getCategoria',validarToken, getCategoria);//consulta una categoria en la base de datos
routerCategoria.post('/postCategoria',validarToken, postCategoria); // Inserta una categoria en la base de datos
routerCategoria.delete('/deleteCategoria',validarToken, deleteCategoria); //Elimina una catoria en la base de datos
routerCategoria.post('/updateCategoria',validarToken, updateCategoria); // actualiza una categoria en la base de datos
routerCategoria.post('/inactivateCategoria',validarToken, inactivateCategoria);//Inactiva una Categoria en la DB
routerCategoria.post('/activateCategoria',validarToken, activateCategoria);//Activa una Categoria en la DB

export default routerCategoria;

