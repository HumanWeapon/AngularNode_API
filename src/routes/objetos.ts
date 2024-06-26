import {Router} from 'express';
import validarToken from './validarToken';
import { activateObjeto, deleteObjeto, getAllObjetos, getAllObjetosMenu, getObjeto, get_id_Objetos, inactivateObjecto, objetosJSON, postObjeto, updateObjetos } from '../controllers/objetos-controller';

const routerObjetos = Router()

routerObjetos.get('/getAllObjetos',validarToken, getAllObjetos);//consulta todos los objetos en la base de datos
routerObjetos.get('/getObjeto',validarToken, getObjeto);//consulta un objeto en la base de datos
routerObjetos.get('/get_id_Objetos/:objeto',validarToken, get_id_Objetos);//Obtiene el ID del objeto
routerObjetos.post('/postObjeto',validarToken, postObjeto); // Inserta un objeto en la base de datos
routerObjetos.delete('/deleteObjeto',validarToken, deleteObjeto); //Elimina un objeto en la base de datos
routerObjetos.post('/updateObjetos',validarToken, updateObjetos); // actualiza un objeto en la base de datos
routerObjetos.post('/inactivateObjeto',validarToken, inactivateObjecto);//Inactiva una Pyme en la DB
routerObjetos.post('/activateObjeto',validarToken, activateObjeto);//Activa una Pyme en la DB
routerObjetos.post('/getAllObjetosMenu',validarToken, getAllObjetosMenu);//Activa una Pyme en la DB
routerObjetos.get('/objetosJSON/:id_rol/:submenu',validarToken, objetosJSON);//consulta todos los objetos en la base de datos



export default routerObjetos;