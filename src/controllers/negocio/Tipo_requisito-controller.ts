import {Request, Response} from 'express';
import { Tipo_Requisito } from '../../models/negocio/Tipo_requisito-models';
import { where } from 'sequelize';
import db from '../../db/connection';
import { Paises } from '../../models/negocio/paises-models';
import { Empresas } from '../../models/negocio/empresas-model';

//Obtiene todos los tipos de requisito de la base de datos
export const getAllTipo_Requisito = async (req: Request, res: Response) => {

    const t_requisito = await Tipo_Requisito.findAll();
    res.json(t_requisito)

}
//Obtiene un tipo de requisito de la base de datos
export const getTipo_Requisito = async (req: Request, res: Response) => {
    const { tipo_requisito } = req.body;
try {
    const _tiporeq = await Tipo_Requisito.findOne({
        where: {tipo_requisito: tipo_requisito}
    });
    if(_tiporeq){
        res.json({_tiporeq})
    }
    else{
        res.status(404).json({
            msg: `el Id del tipo de permiso no existe: ${tipo_requisito}`
        })
    }
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

//Inserta un tipo_requisito en la base de datos
export const postTipo_Requisito = async (req: Request, res: Response) => {

    const { tipo_requisito, id_pais, id_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;

    try{
        const _tipreq = await Tipo_Requisito.findOne({
            where: {tipo_requisito: tipo_requisito}
        })
    
        if (_tipreq){
            return res.status(400).json({
                msg: `Tipo de requisito ya registrado en la base de datos: ${tipo_requisito}`
            })
        }else{
            const newTRE = await Tipo_Requisito.create({                
                tipo_requisito: tipo_requisito,
                id_pais: id_pais.toUpperCase(),
                id_empresa: id_empresa.toUpperCase(),
                descripcion: descripcion.toUpperCase(),                
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json(newTRE)
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

//Elimina un tipo_requisito de la base de datos
export const deleteTipo_Requisito = async (req: Request, res: Response) => {
    const { id_tipo_requisito } = req.body;

    try {
        const _tipreq = await Tipo_Requisito.findOne({
            where: { id_tipo_requisito: id_tipo_requisito }
        });

        if (_tipreq) {
            await _tipreq.destroy();
            res.json(_tipreq);
        } else {
            res.status(404).json({
                msg: 'No se encontró ningun registro con esa numeracion',
            });
        }
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el registro',
        });
    }
};

//actualiza el tipo requisito en la base de datos
export const updateTipo_Requisito = async (req: Request, res: Response) => {
   
    const { id_tipo_requisito, tipo_requisito, descripcion, modificado_por, fecha_modificacion, estado  } = req.body;
    try {
    const _tiporeq = await Tipo_Requisito.findOne({
        where: {id_tipo_requisito: id_tipo_requisito}
    });
    if(!_tiporeq){
        return res.status(404).json({
            msg: 'El valor seleccionado no existe en la base de datos'
        });
    }

    await _tiporeq.update({ 
        id_tipo_requisito: id_tipo_requisito,       
        tipo_requisito: tipo_requisito,
        descripcion: descripcion.toUpperCase(),              
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        estado
    });
    res.json(_tiporeq);

} catch (error) {
    console.error('Error al actualizar el tipo requisito:', error);
    res.status(500).json({
        msg: 'Hubo un error al actualizar el tipo requisito',
    });
}
}

//Inactiva el usuario de la DBA
export const inactivateRequisito = async (req: Request, res: Response) => {
    
    const { tipo_requisito } = req.body;
    try {
    const tiporeq = await Tipo_Requisito.findOne({
        where: {tipo_requisito: tipo_requisito}
    });
    if(!tiporeq){
        return res.status(404).json({
            msg: "El Requisito no existe: "+ tipo_requisito
        });
    }

    await tiporeq.update({
        estado: 2
    });
    res.json(tiporeq);

} catch (error) {
    console.error('Error al inactivar el requisito de exportacion:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el requisito de exportacion',
    });
}
}

//Activa el usuario de la DBA
export const activateRequisito = async (req: Request, res: Response) => {
    
    const { tipo_requisito } = req.body;
    try {
    const tiporeq = await Tipo_Requisito.findOne({
        where: {tipo_requisito: tipo_requisito}
    });
    if(!tiporeq){
        return res.status(404).json({
            msg: "El Requisito no existe: "+ tipo_requisito
        });
    }

    await tiporeq.update({
        estado: 1
    });
    res.json(tiporeq);

} catch (error) {
    console.error('Error al inactivar el requisito de exportacion:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar el requisito de exportacion',
    });
}
}

// Realiza una consulta INNER JOIN entre las tablas Usuario y Roles
export const requisitosAllPaisesEmpresas = async (req: Request, res: Response) => {
    try {
        const requisitosAllPaisEmpresa = await Tipo_Requisito.findAll({
            include: [
                {
                    model: Paises, // Agrega el modelo de Pais
                    as: 'paises' // Usa el mismo alias que en la definición de la asociación en el modelo
                }
            ],
        });
        
        res.json(requisitosAllPaisEmpresa);
    } catch (error) {
        console.error('Error al obtener el Requisito de la Empresa:', error);
        res.status(500).json({ error: 'Error al obtener Requisitos de la Empresa' });
    }
}

//obtiene los requisitos registrados de una empresa por el id de la empresa
export const consultarRequisitosPorIdEmpresa = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const query = `
            SELECT 
                TR.id_tipo_requisito,
                TR.tipo_requisito,
                TR.descripcion,
                TR.creado_por,
                TR.fecha_creacion,
                TR.modificado_por,
                TR.fecha_modificacion,
                TR.estado,
                P.id_pais,
                P.pais,
                P.descripcion AS descripcion_pais,
                P.creado_por AS creado_por_pais,
                P.fecha_creacion AS fecha_creacion_pais,
                P.modificado_por AS modificado_por_pais,
                P.fecha_modificacion AS fecha_modificacion_pais,
                P.estado AS estado_pais,
                P.cod_pais
            FROM 
                mipyme.tbl_me_tipo_requisito AS TR
            LEFT JOIN 
                mipyme.tbl_me_paises AS P ON TR.id_pais = P.id_pais
            WHERE 
                TR.id_empresa = ${id};
            `;
    
            const [results, metadata] = await db.query(query);
    
            res.json(results);
        } catch (error) {
            console.error('Error al consultar requisitos y país:', error);
            res.status(500).json({ msg: 'Error interno del servidor' });
        }
    };
    





