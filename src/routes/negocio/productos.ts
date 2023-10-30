import {Router} from 'express';
import validarToken from '.././validarToken';
import { getAllProductos, getProductos, postProducto, deleteProducto, updateProducto } from '../../controllers/negocio/productos_controller';

const routerProductos = Router()

routerProductos.get('/getAllProductos',validarToken, getAllProductos);//consulta todos los productos en la base de datos
routerProductos.get('/getProductos',validarToken, getProductos);//consulta un producto en la base de datos
routerProductos.post('/postProducto',validarToken, postProducto); // Inserta un producto en la base de datos
routerProductos.delete('/deleteProducto',validarToken, deleteProducto); //Elimina un producto en la base de datos
routerProductos.post('/updatePreoductos',validarToken, updateProducto); // actualiza un producto en la base de datos

export default routerProductos;