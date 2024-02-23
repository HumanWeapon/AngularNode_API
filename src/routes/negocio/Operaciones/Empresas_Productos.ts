import { Router } from 'express';
import { agregarOperacionEmpresaProducto, consultarOperacionEmpresaProductoPorId, consultarOperacionesEmpresasProductos, consultarProductosNoRegistradosPorId, eliminarOperacionEmpresaProducto } from '../../../controllers/negocio/Operaciones/Empresas_Productos-controller';
import validarToken from '../../validarToken';


const empresasProductos = Router();

empresasProductos.post('/agregarOperacionEmpresaProducto', validarToken, agregarOperacionEmpresaProducto);
empresasProductos.get('/consultarOperacionesEmpresasProductos', validarToken, consultarOperacionesEmpresasProductos);
empresasProductos.get('/consultarOperacionEmpresaProductoPorId/:id', validarToken, consultarOperacionEmpresaProductoPorId);
empresasProductos.get('/consultarProductosNoRegistradosPorId/:id', validarToken, consultarProductosNoRegistradosPorId);
empresasProductos.delete('/eliminarOperacionEmpresaProducto/:id', validarToken, eliminarOperacionEmpresaProducto);

export default empresasProductos;
