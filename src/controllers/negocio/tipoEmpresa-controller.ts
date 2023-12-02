import {Request, Response} from 'express';
import { tipoEmpresa } from '../../models/negocio/tipoEmpresa-models';
import jwt from 'jsonwebtoken';


//Obtiene todos los registros de la base de datos
export const getAllTipoEmpresa = async (req: Request, res: Response) => {

    const _emp = await tipoEmpresa.findAll();
    res.json(_emp )
}
//Obtiene un registro de la base de datos     
export const getTipoEmpresa = async (req: Request, res: Response) => {
    const { tipo_empresa } = req.body;

    const _emp  = await tipoEmpresa.findOne({
        where: {tipo_empresa: tipo_empresa}
    });
    if(_emp ){
        res.json({_emp})
    }
    else{
        res.status(404).json({
            msg: `El Tipo de empresa buscado no existe en la BD: ${tipo_empresa}`
        })
    }
}

//Inserta un registro en la base de datos
export const postTipoEmpresa = async (req: Request, res: Response) => {

    const { tipo_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _emp  = await tipoEmpresa.findOne({
            where: { tipo_empresa: tipo_empresa }
        });
        if (_emp ) {
            return res.status(400).json({
                msg: 'Tipo de empresa ya registrado en la base de datos: ' + tipo_empresa
            });
        }
        else {
            await tipoEmpresa.create({
                tipo_empresa: tipo_empresa,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json({
                msg: 'El tipo de empresa: ' + tipo_empresa + ' ha sido creada exitosamente',
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
}
//Elimina un registro de la base de datos
export const deleteTipoEmpresa = async (req: Request, res: Response) => {
    const { id_tipo_empresa } = req.body;

    try {
        const _emp = await tipoEmpresa.findOne({
            where: { id_tipo_empresa: id_tipo_empresa }
        });
        if (_emp) {
            await _emp.destroy();
            res.json({
                msg: 'El Tipo de empresa con el ID: ' + id_tipo_empresa + ' ha sido eliminada exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un Tipo de empresa con el ID ' + id_tipo_empresa,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el registro',
        });
    }
};
//actualiza el registro en la base de datos
export const updateTipoEmpresa = async (req: Request, res: Response) => {
    const { id_tipo_empresa, tipo_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado  } = req.body;

    const _emp = await tipoEmpresa.findOne({
        where: { id_tipo_empresa: id_tipo_empresa }
    });
    if (!_emp) {
        return res.status(404).json({
            msg: 'el Tipo de empresa con el ID: ' + id_tipo_empresa + ' no existe en la base de datos'
        });
    }
    await _emp.update({
        id_tipo_empresa: id_tipo_empresa,
        tipo_empresa: tipo_empresa,
        descripcion: descripcion,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'El Tipo de empresa con el ID: ' + id_tipo_empresa + ' ha sido actualizado exitosamente',
    });

}

//Inactiva el usuario de la DBA
export const inactivateTipoEmpresa = async (req: Request, res: Response) => {
    const { tipo_empresa } = req.body;

    const tipempresa = await tipoEmpresa.findOne({
        where: {tipo_empresa: tipo_empresa}
    });
    if(!tipempresa){
        return res.status(404).json({
            msg: "El tipo de Empresa no existe: "+ tipo_empresa
        });
    }

    await tipempresa.update({
        estado: 2
    });
    res.json({
        msg: 'Tipo de Empresa: '+ tipo_empresa+  ' inactivado exitosamente',
    });
}

//Activa el usuario de la DBA
export const activateTipoEmpresa = async (req: Request, res: Response) => {
    const { tipo_empresa } = req.body;

    const tipempresa = await tipoEmpresa.findOne({
        where: {tipo_empresa: tipo_empresa}
    });
    if(!tipempresa){
        return res.status(404).json({
            msg: "El tipo de Empresa no existe: "+ tipo_empresa
        });
    }

    await tipempresa.update({
        estado: 1
    });
    res.json({
        msg: 'Tipo de Empresa: '+ tipo_empresa+  ' ha sido activado exitosamente',
    });
}

