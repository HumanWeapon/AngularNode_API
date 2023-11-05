import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { operacionEmpresas } from '../../models/negocio/operacionEmpresas-models';

//Obtiene todas las Empresas
export const getAllOpEmpresas = async (req: Request, res: Response) => {
    const opempresa = await operacionEmpresas.findAll();
    res.json(opempresa)
}

//Obtiene una Empresa por ID
export const getOpEmpresa = async (req: Request, res: Response) => {
    const { id_operacion_empresas } = req.body;

    const _opempresa = await operacionEmpresas.findOne({
        where: {id_operacion_empresas: id_operacion_empresas}
    });
    if(_opempresa){
        res.json(_opempresa)
    }
    else{
        res.status(404).json({
            msg: `el ID de la Operacion Empresa no existe: ${id_operacion_empresas}`
        })
    }
}