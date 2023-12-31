import {Router} from 'express';
import validarToken from '.././validarToken';
import { deleteContactoTelefono, getAllContactosTelefono, getContactoTelefono, postContactoTelefono, updateContactoTelefono, inactivateContactoTelefono, activateContactoTelefono} from '../../controllers/negocio/contactoTelefono-controller';

const routerContactoTelefono = Router()

routerContactoTelefono.get('/getAllContactosTelefono',validarToken, getAllContactosTelefono);//consulta todas los contactos en la base de datos
routerContactoTelefono.post('/getContactoTelefono',validarToken, getContactoTelefono);//consulta un contactos  en la base de datos
routerContactoTelefono.post('/postContactoTelefono',validarToken, postContactoTelefono); // Inserta un contactos  en la base de datos
routerContactoTelefono.delete('/deleteContactoTelefono',validarToken, deleteContactoTelefono); //Elimina un contactos en la base de datos
routerContactoTelefono.post('/updateContactoTelefono',validarToken, updateContactoTelefono); // actualiza un contacto en la base de datos
routerContactoTelefono.post('/inactivateContactoTelefono',validarToken,inactivateContactoTelefono );//Inactiva una Pyme en la DB
routerContactoTelefono.post('/activateContactoTelefono',validarToken, activateContactoTelefono );//Activa una Pyme en la DB
export default routerContactoTelefono;













/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */