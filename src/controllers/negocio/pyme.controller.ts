import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { Pyme } from '../../models/negocio/pyme-models';
import jwt from 'jsonwebtoken';

export const getAllPymes = async (req: Request, res: Response) => {
    const pyme = await Pyme.findAll();
    res.json(pyme)
}

export const getPyme = async (req: Request, res: Response) => {
    const { pyme } = req.body;
    const pymes = await Pyme.findOne({
        where: {pyme: pyme}
    });
    if(pymes){
        res.json(pymes)
    }
    else{
        res.status(404).json({
            msg: `No existe la Pyme: ${pyme}`
        })
    }
}