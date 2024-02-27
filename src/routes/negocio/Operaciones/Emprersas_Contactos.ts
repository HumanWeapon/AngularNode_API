import { Router } from 'express';
import validarToken from '../../validarToken';
import {  } from '../../../controllers/negocio/Operaciones/Empresas_Productos-controller';
import { consultarContactosActivosporId, consultarContactosNoRegistradosPorId } from '../../../controllers/negocio/Operaciones/Empresas_Contactos-controller';

const empresasContatos = Router();

empresasContatos.get('/consultarContactosNoRegistradosPorId/:id', validarToken, consultarContactosNoRegistradosPorId);
empresasContatos.get('/consultarContactosActivosporId/:id', validarToken, consultarContactosActivosporId);
//empresasContatos.get('/consultarOperacionEmpresaProductoPorId/:id', validarToken, consultarOperacionEmpresaProductoPorId);
//empresasContatos.get('/consultarProductosNoRegistradosPorId/:id', validarToken, consultarProductosNoRegistradosPorId);
//empresasContatos.delete('/eliminarOperacionEmpresaProducto/:id', validarToken, eliminarOperacionEmpresaProducto);

export default empresasContatos;
