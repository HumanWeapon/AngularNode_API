import {Request, Response} from 'express';
import { Productos } from '../../models/negocio/productos-models';
import jwt from 'jsonwebtoken';
import { Paises } from '../../models/negocio/paises-models';
import { Contacto } from '../../models/negocio/contacto-models';
import { Categorias } from '../../models/negocio/categoria-models';
import db from '../../db/connection'

export const getAllOpProductos = async (req: Request, res: Response) => {
    try {
        const opproductos = await Productos.findAll({
            attributes: [
                'id_producto',
                'id_categoria',
                'producto',
                'descripcion',
                'creado_por',
                'fecha_creacion',
                'modificado_por',
                'fecha_modificacion',
                'estado'
            ],
            include: [{
                model: Categorias,
                attributes: ['id_categoria', 'categoria', 'descripcion']
            }]
        });
        res.json(opproductos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
};

export const getAllProductosActivos = async (req: Request, res: Response) => {
    try {
        const opproductos = await Productos.findAll({
            attributes: [
                'id_producto',
                'id_categoria',
                'producto',
                'descripcion',
                'creado_por',
                'fecha_creacion',
                'modificado_por',
                'fecha_modificacion',
                'estado'
            ],
            where: {
                estado: 1 // Filtrar por estado igual a 1
            }
        });
        res.json(opproductos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
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
        });
    }
};

//Obtiene todos las categorias de productos de la base de datos
export const getAllProductos = async (req: Request, res: Response) => {
    try {
        const opproductos = await Productos.findAll({
            attributes: [
                'id_producto',
                'id_categoria',
                'producto',
                'descripcion',
                'creado_por',
                'fecha_creacion',
                'modificado_por',
                'fecha_modificacion',
                'estado'
            ],
            include: [{
                model: Categorias,
                as: 'categoria', // Alias especificado aquí
                attributes: ['id_categoria', 'categoria', 'descripcion'],
                required: false
              }]
        });
        res.json(opproductos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
}

// Obtiene una categoria de la base de datos por su ID
export const getProductos = async (req: Request, res: Response) => {
    const { producto } = req.body;
try {
    const _producto = await Productos.findOne({
        where: {producto: producto}
    });
    if(_producto){
        res.json(_producto)
    }
    else{
        res.status(404).json({
            msg: `el producto no existe: ${producto}`
        })
    }

} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}


// Inserta una producto en la base de datos
export const postProducto = async (req: Request, res: Response) => {

    const {id_categoria, producto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _producto= await Productos.findOne({
            where: {producto: producto}
        })
    
        if (_producto){
            return res.status(400).json({
                msg: 'El producto ya fue registrado en la base de datos: '+ producto
            })
        }else{
            const newProduc = await Productos.create({
                id_categoria: id_categoria,
                producto: producto.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            // Consultar el producto con su categoría
            const productoConCategoria = await Productos.findOne({
                where: { id_producto: newProduc.id_producto },
                include: [{
                    model: Categorias,
                    as: 'categoria', // Alias para la relación
                    attributes: ['id_categoria', 'categoria'] // Selecciona los campos que deseas devolver
                }]
            });

            // Devolver el producto con su categoría
            res.json(productoConCategoria);
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });   }
}



// Elimina una categoria de la base de datos
export const deleteProducto = async (req: Request, res: Response) => {
    const { id_producto} = req.params; // Obtén el ID desde los parámetros de la URL

    try {
        const _producto = await Productos.findOne({
            where: { id_producto: id_producto }
        });

        if (_producto) {
            await _producto.destroy();
            res.json(_producto);
        } else {
            res.status(404).json({
                msg: 'No se encontró el producto con el ID ' + id_producto,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el producto',
        });
    }
};


//actualiza la categoria en la base de datos
export const updateProducto = async (req: Request, res: Response) => {
    try {
    const { 
        id_producto,
        id_categoria,
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
            producto: producto.toUpperCase(),
            descripcion: descripcion.toUpperCase(), 
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
            
        });
        res.json(produc);

} catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar el producto',
    });
}
}

//Inactiva el usuario de la DBA
export const inactivateProducto = async (req: Request, res: Response) => {
  
    const { producto } = req.body;
try {
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
    res.json(productos);

} catch (error) {
    console.error('Error al inactivar el producto:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el producto',
    });
}
}
//Activa el usuario de la DBA
export const activateProducto = async (req: Request, res: Response) => {
   
    const {producto } = req.body;
try {
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
    res.json(productos);
} catch (error) {
    console.error('Error al activar el producto:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar el producto',
    });
 }
}