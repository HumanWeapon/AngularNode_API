import { Router } from 'express';
import { agregarOperacionEmpresaProducto, consultarOperacionEmpresaProductoPorId, consultarOperacionesEmpresasProductos, eliminarOperacionEmpresaProducto } from '../../../controllers/negocio/Operaciones/Empresas_Productos-controller';
import validarToken from '../../validarToken';


const empresasProductos = Router();

empresasProductos.post('/agregarOperacionEmpresaProducto', validarToken, agregarOperacionEmpresaProducto);
empresasProductos.get('/consultarOperacionesEmpresasProductos', validarToken, consultarOperacionesEmpresasProductos);
empresasProductos.get('/consultarOperacionEmpresaProductoPorId:id', validarToken, consultarOperacionEmpresaProductoPorId);
empresasProductos.delete('/eliminarOperacionEmpresaProducto:id', validarToken, eliminarOperacionEmpresaProducto);

export default empresasProductos;
