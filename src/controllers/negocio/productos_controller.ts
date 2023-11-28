import { Request, Response } from 'express';
import { Productos } from '../../models/negocio/productos-models';
import jwt from 'jsonwebtoken';
import { Paises } from '../../models/negocio/paises-models';
import { Contacto } from '../../models/negocio/contacto-models';

export const getAllOpProductos = async (req: Request, res: Response) => {
    try {
        const opproductos = await Productos.findAll({
            include: [
                { model: Paises, as: 'paises' },
                { model: Contacto, as: 'contacto' },
            ],
        });
        res.json(opproductos);
    } catch (error) {
        console.error('Error al obtener todas las Operaciones de Empresas:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
};

export const getOpProductos = async (req: Request, res: Response) => {
    try {
        const { id_producto } = req.body;

        // Realiza la consulta con la información adicional de las tablas relacionadas
        const _opproducto = await Productos.findOne({
            where: { id_producto: id_producto },
            include: [
                { model: Paises, as: 'paises' },
                { model: Contacto, as: 'contacto' },
            ],
        });

        if (_opproducto) {
            res.json(_opproducto);
        } else {
            res.status(404).json({
                msg: `El ID de la Operacion Empresa no existe: ${id_producto}`,
            });
        }
    } catch (error) {
        console.error('Error al obtener la Operacion Empresa por ID:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
};

//Obtiene todos las categorias de productos de la base de datos
export const getAllProductos = async (req: Request, res: Response) => {
    try {
        const producto = await Productos.findAll();
        res.json(producto);
    } catch (error) {
        console.error('Error al obtener todos los Productos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Obtiene una categoria de la base de datos por su ID
export const getProductos = async (req: Request, res: Response) => {
    try {
        const { producto } = req.body;

        const _producto = await Productos.findOne({
            where: {producto: producto}
        });

        if (_producto) {
            res.json(_producto);
        } else {
            res.status(404).json({
                msg: `El producto no existe: ${producto}`,
            });
        }
    } catch (error) {
        console.error('Error al obtener el Producto por ID:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Inserta una categoria en la base de datos
export const postProducto = async (req: Request, res: Response) => {
    try {
        const {id_categoria, id_contacto, id_pais, producto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

        const _producto= await Productos.findOne({
            where: {producto: producto}
        });

        if (_producto){
            return res.status(400).json({
                msg: 'El producto ya fue registrado en la base de datos: '+ producto
            })
        } else {
            await Productos.create({
                id_categoria: id_categoria,
                id_contacto: id_contacto,
                id_pais:id_pais,
                producto: producto,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json({
                msg: 'El producto: '+ producto+  ' ha sido creado exitosamente',
            })
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        }); 
    }
}

// Elimina una categoria de la base de datos
export const deleteProducto = async (req: Request, res: Response) => {
    try {
        const { id_producto} = req.params; // Obtén el ID desde los parámetros de la URL

        const _producto = await Productos.findOne({
            where: { id_producto: id_producto }
        });

        if (_producto) {
            await _producto.destroy();
            res.json({
                msg: 'El producto con el ID: ' + id_producto + ' ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró el producto con el ID ' + id_producto,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el producto',
            error,
        });
    }
};

//actualiza la categoria en la base de datos
export const updateProducto = async (req: Request, res: Response) => {
    try {
        const { 
            id_producto,
            id_categoria,
            id_contacto,
            id_pais,
            producto,
            descripcion,
            creado_por,
            fecha_creacion,
            modificado_por,
            fecha_modificacion,
            estado
        } = req.body;

        const produc = await Productos.findOne({
            where: {id_producto: id_producto}
        });
        
        if(!produc){
            return res.status(404).json({
                msg: "El producto con el ID: "+id_producto+ " no existe"
            });
        }

        await produc.update({
            id_producto: id_producto,
            id_categoria:id_categoria,
            id_contacto: id_contacto,
            id_pais:id_pais,
            producto: producto,
            descripcion: descripcion, 
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json({
            msg: 'Producto: '+ produc+  ' ha sido actualizado exitosamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
}

//Inactiva el usuario de la DBA
export const inactivateProducto = async (req: Request, res: Response) => {
    try {
        const { producto } = req.body;

        const productos = await Productos.findOne({
            where: {producto: producto}
        });

        if(!productos){
            return res.status(404).json({
                msg: "El Producto no existe: "+ producto
            });
        }

        await productos.update({
            estado: 2
        });
        res.json({
            msg: 'Producto: '+ producto+  ' inactivado exitosamente',
        });
    } catch (error) {
        console.error('Error al inactivar el Producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el Producto',
            error,
        });
    }
}

//Activa el usuario de la DBA
export const activateProducto = async (req: Request, res: Response) => {
    try {
        const {producto } = req.body;

        const productos = await Productos.findOne({
            where: {producto: producto}
        });

        if(!productos){
            return res.status(404).json({
                msg: "El producto no existe: "+ producto
            });
        }

        await productos.update({
            estado: 1
        });
        res.json({
            msg: 'Producto: '+ producto+  ' ha sido activado exitosamente',
        });
    } catch (error) {
        console.error('Error al activar el Producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el Producto',
            error,
        });
    }
}

