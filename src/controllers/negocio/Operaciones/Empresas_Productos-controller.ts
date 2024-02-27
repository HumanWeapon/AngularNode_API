import { Request, Response } from 'express';
import { OperacionesEmpresasProductos } from '../../../models/negocio/Operaciones/Empresas_Productos';
import sequelize from 'sequelize/types/sequelize';
import { Productos } from '../../../models/negocio/productos-models';
import { Categorias } from '../../../models/negocio/categoria-models';
import db from '../../../db/connection';

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
        res.json(nuevoRegistro);
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

export const consultarProductosNoRegistradosPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            B.id_emp_prod,
            B.id_empresa,
            CASE
                WHEN B.id_empresa IS NULL THEN FALSE
                ELSE TRUE
            END AS POSEE_PRODUCTO,
            A.id_producto,
            A.id_categoria,
            C.categoria,
            A.producto,
            A.descripcion
        FROM mipyme.tbl_me_productos AS A
        LEFT JOIN (SELECT id_emp_prod, id_empresa, id_producto, estado FROM mipyme.tbl_op_empresas_productos 
                WHERE estado = 1 AND id_empresa = ${id}) AS B
        ON A.id_producto = B.id_producto
        LEFT JOIN (SELECT id_categoria, categoria, estado FROM mipyme.tbl_me_categoria_productos WHERE estado = 1) AS C
        ON A.id_categoria = C.id_categoria
        WHERE A.estado = 1
            --AND B.id_empresa IS NULL
            AND C.categoria is NOT NULL
        `;

        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar productos no registrados:', error);
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