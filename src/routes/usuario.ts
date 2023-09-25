import {Router} from 'express';
import {loginUser, newuser } from '../controllers/usuario';
import validarToken from './validarToken';

const router = Router()

router.post('/', newuser);
router.post('/login', loginUser)

export default router;