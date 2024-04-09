import {Router} from 'express';
import validarToken from '../validarToken';
import { deleteContactoTelefono, getAllContactosTelefono, getContactoTelefono, postContactoTelefono, updateContactoTelefono, inactivateContactoTelefono, activateContactoTelefono, telefonosdeContactosPorId, telefonosAllContactos, telefonosAllContactosPaises} from '../../controllers/negocio/Telefonos-controller';

const routerContactoTelefono = Router()

routerContactoTelefono.get('/getAllContactosTelefono',validarToken, getAllContactosTelefono);//consulta todas los contactos en la base de datos
//routerContactoTelefono.get('/telefonosconcontacto',validarToken, telefonosconcontacto);//consulta todas los telefonos con el contacto activo de la DBA.
routerContactoTelefono.post('/telefonosdeContactosPorId',validarToken, telefonosdeContactosPorId);//consulta todas los contactos en la base de datos
routerContactoTelefono.post('/getContactoTelefono',validarToken, getContactoTelefono);//consulta un contactos  en la base de datos
routerContactoTelefono.post('/postContactoTelefono',validarToken, postContactoTelefono); // Inserta un contactos  en la base de datos
routerContactoTelefono.delete('/deleteContactoTelefono',validarToken, deleteContactoTelefono); //Elimina un contactos en la base de datos
routerContactoTelefono.post('/updateContactoTelefono',validarToken, updateContactoTelefono); // actualiza un contacto en la base de datos
routerContactoTelefono.post('/inactivateContactoTelefono',validarToken,inactivateContactoTelefono );//Inactiva una Pyme en la DB
routerContactoTelefono.post('/activateContactoTelefono',validarToken, activateContactoTelefono );//Activa una Pyme en la DB
routerContactoTelefono.get('/telefonosAllContactos',validarToken, telefonosAllContactos );//Trae los telefonos de los contactos
routerContactoTelefono.get('/telefonosAllContactosPais',validarToken, telefonosAllContactosPaises );//Trae los telefonos y el Pais de los contactos


export default routerContactoTelefono;













/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */