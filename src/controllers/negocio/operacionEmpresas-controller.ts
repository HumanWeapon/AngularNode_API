import { Request, Response } from 'express';
import { operacionEmpresas } from '../../models/negocio/operacionEmpresas-models';
import { Paises } from '../../models/negocio/paises-models';
import { Contacto } from '../../models/negocio/contacto-models';
import { Empresas } from '../../models/negocio/empresas-model';

// Obtiene todas las Empresas
export const getAllOpEmpresas = async (req: Request, res: Response) => {
    try {
        const opempresas = await operacionEmpresas.findAll({
            include: [
                { model: Empresas, as: 'empresa' },
                { model: Paises, as: 'paises' },
                { model: Contacto, as: 'contacto' },
            ],
        });
        res.json(opempresas);
    } catch (error) {
        console.error('Error al obtener todas las Operaciones de Empresas:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
};

// Obtiene una Empresa por ID con información adicional de las tablas relacionadas
export const getOpEmpresa = async (req: Request, res: Response) => {
    try {
        const { id_operacion_empresas } = req.body;

        // Realiza la consulta con la información adicional de las tablas relacionadas
        const _opempresa = await operacionEmpresas.findOne({
            where: { id_operacion_empresas: id_operacion_empresas },
            include: [
                { model: Empresas, as: 'empresa' },
                { model: Paises, as: 'paises' },
                { model: Contacto, as: 'contacto' },
            ],
        });

        if (_opempresa) {
            res.json(_opempresa);
        } else {
            res.status(404).json({
                msg: `El ID de la Operacion Empresa no existe: ${id_operacion_empresas}`,
            });
        }
    } catch (error) {
        console.error('Error al obtener la Operacion Empresa por ID:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
};

export const postOpEmpresa = async (req: Request, res: Response) => {

    const { id_tipo_empresa, nombre_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;

    try{
        const _opempresa = await operacionEmpresas.findOne({
            where: {nombre_empresa: nombre_empresa}
        })
        if (_opempresa){
            return res.status(400).json({
                msg: 'Empresa ya registrada en la base de datos: '+ nombre_empresa
            })
        }else{
            const _opempresa = await operacionEmpresas.create({
                id_tipo_empresa:id_tipo_empresa,
                nombre_empresa: nombre_empresa.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            res.json(_opempresa)
        
    }
}
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
};