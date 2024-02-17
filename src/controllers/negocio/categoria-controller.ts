//Elaborado Por Breydy Flores
import {Request, Response} from 'express';
import { Categorias } from '../../models/negocio/categoria-models';
import jwt from 'jsonwebtoken';
import { Productos } from '../../models/negocio/productos-models';

//Obtiene todos las categorias de productos de la base de datos
export const getAllCategorias = async (req: Request, res: Response) => {

    const categoria = await Categorias.findAll();
    res.json(categoria)

}

// Obtiene una categoria de la base de datos por su ID
export const getCategoria = async (req: Request, res: Response) => {
    const { id_categoria } = req.body;

    const _categoria = await Categorias.findOne({
        where: {id_categoria: id_categoria}
    });
    if(_categoria){
        res.json(_categoria)
    }
    else{
        res.status(404).json({
            msg: `el ID de la categoria no existe: ${id_categoria}`
        })
    }
}


// Inserta una categoria en la base de datos
export const postCategoria = async (req: Request, res: Response) => {

    const {categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _categoria= await Categorias.findOne({
            where: {categoria: categoria}
        })
    
        if (_categoria){
            return res.status(400).json({
                msg: 'La categoria ya fue registrada en la base de datos: '+ categoria
            })
        }else{
            const categorias = await Categorias.create({
                categoria: categoria,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json(categorias)
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}



// Elimina una categoria de la base de datos
export const deleteCategoria = async (req: Request, res: Response) => {
    const { id_categoria} = req.params; // Obtén el ID desde los parámetros de la URL

    try {
        const _categoria = await Categorias.findOne({
            where: { id_categoria: id_categoria }
        });

        if (_categoria) {
            await _categoria.destroy();
            res.json(_categoria);
        } else {
            res.status(404).json({
                msg: 'No se encontró una categoria con el ID ' + id_categoria,
            });
        }
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la categoria',
        });
    }
};


//actualiza la categoria en la base de datos
export const updateCategoria = async (req: Request, res: Response) => {
    const { 
        id_categoria,
        categoria,
        descripcion,
        creado_por,
        fecha_creacion,
        modificado_por,
        fecha_modificacion,
        estado
      
     } = req.body;

    const catego = await Categorias.findOne({
        where: {id_categoria: id_categoria}
        
    });
    if(!catego){
        return res.status(404).json({
            msg: "La categoria con el ID: "+id_categoria+ " no existe"
        });
    }

    const _categoria = await catego.update({
        id_categoria: id_categoria,
        categoria: categoria,
        descripcion: descripcion, 
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
        
    });
    res.json(_categoria);
}

//Inactiva el usuario de la DBA
export const inactivateCategoria = async (req: Request, res: Response) => {
    try {
    const { id_categoria } = req.body;

    const cate = await Categorias.findOne({
        where: {id_categoria: id_categoria}
    });
    if(!cate){
        return res.status(404).json({
            msg: "La Categoria no existe: "+ id_categoria
        });
    }

    const _categoria = await cate.update({
        estado: 2
    });
    res.json(_categoria);

} catch (error) {
    console.error('Error al inactivar la categoria:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar la categoria',
    });
}
}

//Activa el usuario de la DBA
export const activateCategoria = async (req: Request, res: Response) => {
    try {
    const { id_categoria } = req.body;

    const cate = await Categorias.findOne({
        where: {id_categoria: id_categoria}
    });
    if(!cate){
        return res.status(404).json({
            msg: "La Categoria no existe: "+ id_categoria
        });
    }

    const _categoria = await cate.update({
        estado: 1
    });
    res.json(_categoria);

} catch (error) {
    console.error('Error al activar la categoria:', error);
    res.status(500).json({
        msg: 'Hubo un error al activar la categoria',
    });
}
}

// Obtiene una Empresa por ID con información adicional de las tablas relacionadas
export const getAllProductosByCategoria = async (req: Request, res: Response) => {
    try {
        const { id_categoria } = req.body;

        // Realiza la consulta con la información adicional de las tablas relacionadas
        const _procate = await Categorias.findOne({
            where: { id_categoria: id_categoria },
            include: [
                { model: Productos, as: 'producto' },
            ],
        });

        if (_procate) {
            res.json(_procate);
        } else {
            res.status(404).json({
                msg: `El ID de la Operacion Empresa no existe: ${id_categoria}`,
            });
        }
    } catch (error) {
        console.error('Error al obtener la Operacion Empresa por ID:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
};
