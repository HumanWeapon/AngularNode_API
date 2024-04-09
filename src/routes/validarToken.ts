import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';

const validarToken = ( req: Request, res: Response, next: NextFunction) => {
    console.log('Validar Token')
    const headerToken = req.headers['authorization'];

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        //Tiene Token
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_KEY|| 'Lamers005*');
            next();
        } catch (error) {
            
            res.status(401).json({
                msg: 'Token no valido'
            })
        }
    }else{
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }
    
}
const validarTokenpyme = ( req: Request, res: Response, next: NextFunction) => {
    console.log('Validar Token')
    const headerToken = req.headers['authorization'];

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        //Tiene Token
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECERT_KEY_PYME || 'Lamers006*')
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'Token no valido'
            })
        }
    }else{
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }
    
}
export { validarToken, validarTokenpyme };