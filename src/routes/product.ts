import {Router} from 'express';
import {getProducts} from "../controllers/product"
import validarToken from './validarToken';

const router = Router();

router.get('/', validarToken, getProducts)

export default router;