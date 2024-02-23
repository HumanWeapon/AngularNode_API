import {Router} from 'express';
import validarToken from '.././validarToken';
import { getAllProductos, getProductos, postProducto, deleteProducto, updateProducto, inactivateProducto, activateProducto, getAllOpProductos, getOpProductos, getAllOpProductosActivos } from '../../controllers/negocio/productos_controller';

const routerProductos = Router()

routerProductos.get('/getAllOpProductos',validarToken, getAllOpProductos);//consulta todos los productos en la base de datos
routerProductos.get('/getAllOpProductosActivos',validarToken, getAllOpProductosActivos);//consulta todos los productos activos en la base de datos
routerProductos.get('/getOpProductos',validarToken, getOpProductos);//consulta un producto en la base de datos
routerProductos.get('/getAllProductos',validarToken, getAllProductos);//consulta todos los productos en la base de datos
routerProductos.get('/getProductos',validarToken, getProductos);//consulta un producto en la base de datos
routerProductos.post('/postProducto',validarToken, postProducto); // Inserta un producto en la base de datos
routerProductos.delete('/deleteProducto',validarToken, deleteProducto); //Elimina un producto en la base de datos
routerProductos.post('/updateProducto',validarToken, updateProducto); // actualiza un producto en la base de datos
routerProductos.post('/inactivateProducto',validarToken, inactivateProducto);//Inactiva un producto en la DB
routerProductos.post('/activateProducto',validarToken, activateProducto);//Activa un producto en la DB

export default routerProductos;