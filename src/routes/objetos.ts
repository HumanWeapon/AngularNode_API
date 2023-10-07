import {Router} from 'express';
import validarToken from './validarToken';
import { deleteObjeto, getAllObjetos, getObjeto, postObjeto, updateObjetos } from '../controllers/objetos-controller';

const routerObjetos = Router()

routerObjetos.get('/getAllObjetos', getAllObjetos);//consulta todos los objetos en la base de datos
routerObjetos.get('/getObjeto', getObjeto);//consulta un objeto en la base de datos
routerObjetos.post('/postObjeto', postObjeto); // Inserta un objeto en la base de datos
routerObjetos.delete('/deleteObjeto', deleteObjeto); //Elimina un objeto en la base de datos
routerObjetos.post('/updateObjetos', updateObjetos); // actualiza un objeto en la base de datos

export default routerObjetos;