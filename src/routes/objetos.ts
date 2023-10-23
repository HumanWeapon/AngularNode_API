import {Router} from 'express';
import validarToken from './validarToken';
import { deleteObjeto, getAllObjetos, getObjeto, postObjeto, updateObjetos } from '../controllers/objetos-controller';

const routerObjetos = Router()

routerObjetos.get('/getAllObjetos',validarToken, getAllObjetos);//consulta todos los objetos en la base de datos
routerObjetos.get('/getObjeto',validarToken, getObjeto);//consulta un objeto en la base de datos
routerObjetos.post('/postObjeto',validarToken, postObjeto); // Inserta un objeto en la base de datos
routerObjetos.delete('/deleteObjeto',validarToken, deleteObjeto); //Elimina un objeto en la base de datos
routerObjetos.post('/updateObjetos',validarToken, updateObjetos); // actualiza un objeto en la base de datos

export default routerObjetos;