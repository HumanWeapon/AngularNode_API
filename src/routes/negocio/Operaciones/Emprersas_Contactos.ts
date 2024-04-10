import { Router } from 'express';
import validarToken from '../../validarToken';
import {  } from '../../../controllers/negocio/Operaciones/Empresas_Productos-controller';
import { ReporteContactos, agregarOperacionEmpresaContacto, consultarContactosActivosporId, consultarContactosNoRegistradosPorId, consultarContactosporId, eliminarOperacionEmpresaContacto } from '../../../controllers/negocio/Operaciones/Empresas_Contactos-controller';

const empresasContatos = Router();

empresasContatos.get('/consultarContactosNoRegistradosPorId/:id', validarToken, consultarContactosNoRegistradosPorId);
empresasContatos.get('/consultarContactosporId/:id', validarToken, consultarContactosporId);
empresasContatos.get('/consultarContactosActivosporId/:id', validarToken, consultarContactosActivosporId);
empresasContatos.get('/ReporteContactos', validarToken, ReporteContactos);
empresasContatos.post('/agregarOperacionEmpresaContacto', validarToken, agregarOperacionEmpresaContacto);
empresasContatos.delete('/eliminarOperacionEmpresaContacto/:id', validarToken, eliminarOperacionEmpresaContacto);

export default empresasContatos;
