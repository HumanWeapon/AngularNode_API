import { Router } from 'express';
import validarToken from '../../validarToken';
import {  } from '../../../controllers/negocio/Operaciones/Empresas_Productos-controller';
import { agregarOperacionEmpresaContacto, consultarContactosActivosporId, consultarContactosNoRegistradosPorId, eliminarOperacionEmpresaContacto } from '../../../controllers/negocio/Operaciones/Empresas_Contactos-controller';

const empresasContatos = Router();

empresasContatos.get('/consultarContactosNoRegistradosPorId/:id', validarToken, consultarContactosNoRegistradosPorId);
empresasContatos.get('/consultarContactosActivosporId/:id', validarToken, consultarContactosActivosporId);
empresasContatos.post('/agregarOperacionEmpresaContacto', validarToken, agregarOperacionEmpresaContacto);
empresasContatos.delete('/eliminarOperacionEmpresaContacto/:id', validarToken, eliminarOperacionEmpresaContacto);

export default empresasContatos;
