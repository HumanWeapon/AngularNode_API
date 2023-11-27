import {Request, Response} from 'express';
import { Objetos } from '../../models/objetos-models';
import { Paises } from '../../models/negocio/paises-models';
import { where } from 'sequelize';

//Obtiene todos los objetos de la base de datos
export const getAllPaises = async (req: Request, res: Response) => {
    try {
        const paises = await Paises.findAll();
        res.json(paises);
    } catch (error) {
        console.error('Error al obtener todos los Países:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

//Obtiene un Pais por ID
export const getPais = async (req: Request, res: Response) => {
    try {
        const { id_pais } = req.body;

        const _pais = await Paises.findAll({
            where: {id_pais: id_pais}
        });

        if (_pais) {
            res.json(_pais);
        } else {
            res.status(404).json({
                msg: `El ID del País no existe: ${id_pais}`,
            });
        }
    } catch (error) {
        console.error('Error al obtener el País por ID:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
}

// Inserta una nueva Empresa en la base de datos
export const postPais = async (req: Request, res: Response) => {
    try {
        const { pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;

        const _pais = await Paises.findOne({
            where: {pais: pais}
        });

        if (_pais) {
            return res.status(400).json({
                msg: 'País ya registrado en la base de datos: ' + pais,
            });
        } else {
            const paises = await Paises.create({
                pais: pais,
                descripcion: descripcion, 
                creado_por: creado_por,
                fecha_creacion: Date.now(),
                modificado_por: modificado_por,
                fecha_modificacion: Date.now(),
                estado: estado,
            });
            res.json(paises);
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        }); 
    }
}

// Elimina el Pais de la base de datos
export const deletePais = async (req: Request, res: Response) => {
    try {
        const { id_pais } = req.body; // Obtén el ID desde los parámetros de la URL

        const _pais = await Paises.findOne({
            where: { id_pais: id_pais}
        });

        if (_pais) {
            await _pais.destroy();
            res.json({
                msg: 'El País con el ID: ' + id_pais + ' ha sido eliminado exitosamente',
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró un País con el ID ' + id_pais,
            });
        }
    } catch (error) {
        console.error('Error al eliminar el País:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el País',
            error,
        });
    }
};

//actualiza el Telefono en la base de datos
export const updatePais = async (req: Request, res: Response) => {
    try {
        const { id_pais, pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;

        const _pais = await Paises.findOne({
            where: {id_pais: id_pais}
        });

        if (!_pais) {
            return res.status(404).json({
                msg: 'País con el ID: ' + id_pais + ' no existe en la base de datos',
            });
        }

        await _pais.update({
            id_pais: id_pais,
            pais: pais,
            descripcion: descripcion, 
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion,
            estado: estado,
        });

        res.json({
            msg: 'El País con el ID: ' + id_pais +  ' ha sido actualizado exitosamente',
        });
    } catch (error) {
        console.error('Error al actualizar el País:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el País',
            error,
        });
    }
}

//Inactiva el usuario de la DBA
export const inactivatePais = async (req: Request, res: Response) => {
    try {
        const { pais } = req.body;

        const paises = await Paises.findOne({
            where: {pais: pais}
        });

        if (!paises) {
            return res.status(404).json({
                msg: 'El País no existe: ' + pais,
            });
        }

        await paises.update({
            estado: 2,
        });

        res.json({
            msg: 'País: ' + pais + ' inactivado exitosamente',
        });
    } catch (error) {
        console.error('Error al inactivar el País:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el País',
            error,
        });
    }
}

//Activa el usuario de la DBA
export const activatePais = async (req: Request, res: Response) => {
    try {
        const { pais } = req.body;

        const paises = await Paises.findOne({
            where: {pais: pais}
        });

        if (!paises) {
            return res.status(404).json({
                msg: 'El País no existe: ' + pais,
            });
        }

        await paises.update({
            estado: 1,
        });

        res.json({
            msg: 'País: ' + pais + ' ha sido activado exitosamente',
        });
    } catch (error) {
        console.error('Error al activar el País:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el País',
            error,
        });
    }
}
