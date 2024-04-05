import { Router } from 'express';
import { agregarOperacionEmpresaProducto, consultarOperacionEmpresaProductoPorId, consultarOperacionesEmpresasProductos, consultarProductosNoRegistradosPorId, eliminarOperacionEmpresaProducto, getPaisesEmpresasPorPais, getPaisesPorProducto, getProductosSearch } from '../../../controllers/negocio/Operaciones/Empresas_Productos-controller';
import validarToken from '../../validarToken';


const empresasProductos = Router();

empresasProductos.post('/agregarOperacionEmpresaProducto', validarToken, agregarOperacionEmpresaProducto);
empresasProductos.get('/consultarOperacionesEmpresasProductos', validarToken, consultarOperacionesEmpresasProductos);
empresasProductos.get('/consultarOperacionEmpresaProductoPorId/:id', validarToken, consultarOperacionEmpresaProductoPorId);
empresasProductos.get('/consultarProductosNoRegistradosPorId/:id', validarToken, consultarProductosNoRegistradosPorId);
empresasProductos.delete('/eliminarOperacionEmpresaProducto/:id', validarToken, eliminarOperacionEmpresaProducto);
empresasProductos.get('/getProductosSearch/:categoria?/:pais?', validarToken, getProductosSearch);
empresasProductos.get('/getPaisesPorProducto/:id_producto', validarToken, getPaisesPorProducto);
empresasProductos.get('/getPaisesEmpresasPorPais/:id_pais', validarToken, getPaisesEmpresasPorPais);



export default empresasProductos;
