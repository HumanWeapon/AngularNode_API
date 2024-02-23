import { Request, Response } from 'express';
import { OperacionesEmpresasProductos } from '../../../models/negocio/Operaciones/Empresas_Productos';
import sequelize from 'sequelize/types/sequelize';
import { Productos } from '../../../models/negocio/productos-models';
import { Categorias } from '../../../models/negocio/categoria-models';

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

// Consultar todos los registros por ID de empresa
export const consultarOperacionEmpresaProductoPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Buscar todas las operaciones que corresponden al ID de la empresa
        const operaciones = await OperacionesEmpresasProductos.findAll({
            where: { id_empresa: id },
            include: [
                {
                    model: Productos,
                    as: 'producto', // Alias para la relación
                    include: [
                        {
                          model: Categorias,
                          required: true,
                          as: 'categoria', // Alias para la relación
                          attributes: ['categoria'], // Incluye los atributos que necesitas de CategoriasProductos
                          where: { estado: 1 } // Condición para la categoría
                        }
                      ],
                    required: true,
                    attributes: ['producto', 'descripcion'],
                    where: { estado: 1 }
                }
            ]
        });

        res.json(operaciones);
    } catch (error) {
        console.error('Error al consultar las operaciones empresa producto por ID de empresa:', error);
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
