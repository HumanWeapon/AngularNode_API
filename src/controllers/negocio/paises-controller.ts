import {Request, Response} from 'express';
import { Objetos } from '../../models/objetos-models';
import { Paises } from '../../models/negocio/paises-models';
import { where } from 'sequelize';

//Obtiene todos los objetos de la base de datos
export const getAllPaises = async (req: Request, res: Response) => {

    const paises = await Paises.findAll();
    res.json(paises)

}
//Obtiene todos los objetos de la base de datos
export const getOnePaises = async (req: Request, res: Response) => {

    const { pais } = req.body;
    const paises = await Paises.findOne({where: {pais: pais}});
    res.json(paises)

}