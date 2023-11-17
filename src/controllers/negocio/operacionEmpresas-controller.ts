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