import {Request, Response} from 'express';
import { Productos } from '../../models/negocio/productos-models';
import jwt from 'jsonwebtoken';


//Obtiene todos los objetos de la base de datos
export const getAllProductos = async (req: Request, res: Response) => {

    const _productos = await Productos.findAll();
    res.json(_productos)

}

//Obtiene un objeto de la base de datos     
export const getProductos = async (req: Request, res: Response) => {
    const { producto } = req.body;

    const _producto = await Productos.findOne({
        where: {producto: producto}
    });
    if(_producto){
        res.json({_producto})
    }
    else{
        res.status(404).json({
            msg: `el  producto no existe: ${producto}`
        })
    }
}

//Inserta un objeto en la base de datos
export const postProducto = async (req: Request, res: Response) => {

    const { producto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;

    try{
        const _producto = await Productos.findOne({
            where: {producto: producto}
        })
    
        if (_producto){
            return res.status(400).json({
                msg: 'Producto ya registrado en la base de datos: '+ producto
            })
        }else{
            await Productos.create({
                producto: producto,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json({
                msg: 'El Producto: '+ producto+  ' ha sido creada exitosamente',
            })
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
    /*// Generamos token
    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);*/
}

//Elimina un objeto de la base de datos
export const deleteProducto = async (req: Request, res: Response) => {
    const { id_producto } = req.body;

    try {
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
                msg: 'No se encontró un producto con el ID ' + id_producto,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el parámetro',
        });
    }
};


//actualiza el rol en la base de datos
export const updateProducto = async (req: Request, res: Response) => {
    const { id_producto, id_categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;

    const _producto = await Productos.findOne({
        where: {id_producto: id_producto}
    });
    if(!_producto){
        return res.status(404).json({
            msg: 'Producto con el ID: '+ id_producto +' no existe en la base de datos'
        });
    }

    await _producto.update({
        id_producto: id_producto,
        id_categoria: id_categoria,
        producto: _producto,
        descripcion: descripcion, 
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'El Producto con el ID: '+ id_producto+  ' ha sido actualizado exitosamente',
    });
}