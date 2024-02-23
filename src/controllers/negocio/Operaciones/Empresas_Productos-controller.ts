import { Request, Response } from 'express';
import { OperacionesEmpresasProductos } from '../../../models/negocio/Operaciones/Empresas_Productos';

// Consultar todos los registros
export const consultarOperacionesEmpresasProductos = async (req: Request, res: Response) => {
    try {
        const operaciones = await OperacionesEmpresasProductos.findAll();
        res.json(operaciones);
    } catch (error) {
        console.error('Error al consultar las operaciones empresas productos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Agregar un nuevo registro
export const agregarOperacionEmpresaProducto = async (req: Request, res: Response) => {
    try {
        const nuevoRegistro = await OperacionesEmpresasProductos.create(req.body);
        res.status(201).json(nuevoRegistro);
    } catch (error) {
        console.error('Error al agregar la operación empresa producto:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Consultar un registro por ID
export const consultarOperacionEmpresaProductoPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const operacion = await OperacionesEmpresasProductos.findByPk(id);
        if (!operacion) {
            return res.status(404).json({ msg: 'Operación empresa producto no encontrada' });
        }
        res.json(operacion);
    } catch (error) {
        console.error('Error al consultar la operación empresa producto por ID:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Eliminar un registro por ID
export const eliminarOperacionEmpresaProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const operacion = await OperacionesEmpresasProductos.findByPk(id);
        if (!operacion) {
            return res.status(404).json({ msg: 'Operación empresa producto no encontrada' });
        }
        await operacion.destroy();
        res.json({ msg: 'Operación empresa producto eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la operación empresa producto:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
