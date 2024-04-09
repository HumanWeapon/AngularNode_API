import {Router} from 'express';
import {validarToken} from './validarToken';
import { DeleteBitacora, PostBitacora, getAllBitacora } from '../controllers/bitacora-controller';


const routerBitacora = Router()

routerBitacora.get('/getAllBitacora',validarToken, getAllBitacora);//consulta todos los registros en la base de datos
routerBitacora.post('/postBitacora',validarToken, PostBitacora);//Inserta un evento en la DBA
routerBitacora.delete('/deleteBitacora',validarToken, DeleteBitacora); // Elimina todos los registros de la DBA

export default routerBitacora;