import {Router} from 'express';
import validarToken from '.././validarToken';
import { deleteContacto, getAllContactos, getContacto, postContacto, updateContacto, activateContacto, inactivateContacto, getAllContactosconTipoContacto } from '../../controllers/negocio/contacto-controller';
import { getcontactosActivos } from '../../controllers/negocio/Telefonos-controller';

const routerContacto = Router()

routerContacto.get('/getAllContactos',validarToken, getAllContactos);//consulta todas las direcciónes en la base de datos
routerContacto.get('/getAllContactosconTipoContacto',validarToken, getAllContactosconTipoContacto);//consulta todas las direcciónes en la base de datos
routerContacto.get('/getcontactosActivos',validarToken, getcontactosActivos);//consulta todas las direcciónes en la base de datos
routerContacto.post('/getContacto',validarToken, getContacto);//consulta una dirección en la base de datos
routerContacto.post('/postContacto',validarToken, postContacto); // Inserta una dirección en la base de datos
routerContacto.delete('/deleteContacto',validarToken, deleteContacto); //Elimina una dirección en la base de datos
routerContacto.post('/updateContacto',validarToken, updateContacto); // actualiza una dirección en la base de datos
routerContacto.post('/inactivateContacto',validarToken, inactivateContacto);//Inactiva una Pyme en la DB
routerContacto.post('/activateContacto',validarToken, activateContacto);//Activa una Pyme en la DB

export default routerContacto;











/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */