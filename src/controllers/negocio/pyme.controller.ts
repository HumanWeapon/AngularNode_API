import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Pyme } from '../../models/negocio/pyme-models';
import jwt from 'jsonwebtoken';
import { tipoEmpresa } from '../../models/negocio/tipoEmpresa-models';

//Obtiene todas las Pymes
export const getAllPymes = async (req: Request, res: Response) => {
    try {
        const pyme = await Pyme.findAll();
        res.json(pyme);
    } catch (error) {
        console.error('Error al obtener todas las Pymes:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

//Obtiene una Pyme por ID
export const getPyme = async (req: Request, res: Response) => {
    try {
        const { id_pyme } = req.body;

        const _pyme = await Pyme.findOne({
            where: {id_pyme: id_pyme}
        });

        if (_pyme) {
            res.json(_pyme);
        } else {
            res.status(404).json({
                msg: `El ID de la pregunta no existe: ${id_pyme}`
            });
        }
    } catch (error) {
        console.error('Error al obtener la Pyme por ID:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Inserta una nueva Pyme en la base de datos
export const postPyme = async (req: Request, res: Response) => {
    try {
        const { nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;

        const _pyme = await Pyme.findOne({
            where: {nombre_pyme: nombre_pyme}
        });

        if (_pyme){
            return res.status(400).json({
                msg: 'La Pyme ya fue registrada en la base de datos: '+ nombre_pyme
            })
        } else {
            await Pyme.create({
                id_tipo_empresa:id_tipo_empresa,
                nombre_pyme: nombre_pyme,
                categoria: categoria,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: Date.now(),
                modificado_por: modificado_por,
                fecha_modificacion: Date.now(),
                estado: estado
            })
            res.json({
                msg: 'La Pyme: '+ nombre_pyme+  ' ha sido creada exitosamente',
            })
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        }); 
    }
}

// Elimina la Pyme de la base de datos
export const deletePyme = async (req: Request, res: Response) => {
    try {
        const { id_pyme } = req.body; // Obtén el ID desde los parámetros de la URL

        const _pyme = await Pyme.findOne({
            where: { id_pyme: id_pyme}
        });

        if (_pyme) {
            await _pyme.destroy();
            res.json({
                msg: 'La Pyme con el ID: ' + id_pyme + ' ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró una Pyme con el ID ' + id_pyme,
            });
        }
    } catch (error) {
        console.error('Error al eliminar la Pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Pyme',
            error,
        });
    }
};

//actualiza el Telefono en la base de datos
export const updatePyme = async (req: Request, res: Response) => {
    try {
        const { id_pyme, nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

        const _pyme = await Pyme.findOne({
            where: {id_pyme: id_pyme}
        });
        if(!_pyme){
            return res.status(404).json({
                msg: 'Pyme con el ID: '+ id_pyme +' no existe en la base de datos'
            });
        }

        await _pyme.update({
            id_pyme:id_pyme,
            nombre_pyme: nombre_pyme,
            id_tipo_empresa:id_tipo_empresa,
            categoria: categoria,
            descripcion: descripcion, 
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json({
            msg: 'La Pyme con el ID: '+ id_pyme+  ' ha sido actualizado exitosamente',
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
}

//Inactiva el la pyme de la DBA
export const inactivatePyme = async (req: Request, res: Response) => {

    const { pyme } = req.body;

    const _pymes = await Pyme.findOne({
        where: {pyme: pyme}
    });
    if(!_pymes){
        return res.status(404).json({
            msg: "La Pyme no existe: "+ pyme
        });
    }

    await pyme.update({
        estado: 2
    });
    res.json({
        msg: 'Pyme: '+ pyme+  ' inactivado exitosamente',
    });
    try {
        const { nombre_pyme } = req.body;

        const pyme = await Pyme.findOne({
            where: {nombre_pyme: nombre_pyme}
        });
        if(!pyme){
            return res.status(404).json({
                msg: "La Pyme no existe: "+ nombre_pyme
            });
        }

        await pyme.update({
            estado: 2
        });
        res.json({
            msg: 'Pyme: '+ nombre_pyme+  ' inactivado exitosamente',
        });
    } catch (error) {
        console.error('Error al inactivar la Pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar la Pyme',
            error,
        });
    }

}
//Activa la pyme de la DBA
export const activatePyme = async (req: Request, res: Response) => {
    const {pyme } = req.body;

    const _pyme = await Pyme.findOne({
        where: {pyme: pyme}
    });
    if(!_pyme){
        return res.status(404).json({
            msg: "La Pyme no existe: "+ pyme
        });
    }

    await pyme.update({
        estado: 1
    });
    res.json({
        msg: 'Pyme: '+ pyme+  ' ha sido activado exitosamente',
    });
    try {
        const { nombre_pyme } = req.body;

        const pyme = await Pyme.findOne({
            where: {nombre_pyme: nombre_pyme}
        });
        if(!pyme){
            return res.status(404).json({
                msg: "La Pyme no existe: "+ nombre_pyme
            });
        }

        await pyme.update({
            estado: 1
        });
        res.json({
            msg: 'Pyme: '+ nombre_pyme+  ' ha sido activado exitosamente',
        });
    } catch (error) {
        console.error('Error al activar la Pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar la Pyme',
            error,
        });
    }

}

export const pymesAllTipoEmpresa = async (req: Request, res: Response) => {
    try {
        const pyme = await Pyme.findAll({
            include: [
                {
                    model: tipoEmpresa,
                    as: 'tipoEmpresa' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        
        res.json(pyme);
    } catch (error) {
        console.error('Error al obtener preguntas de usuario:', error);
        res.status(500).json({ error: 'Error al obtener preguntas de usuario' });
    }
}
