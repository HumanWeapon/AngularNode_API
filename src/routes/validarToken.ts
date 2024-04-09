import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';

const validarToken = (req: Request, res: Response, next: NextFunction) => {
    console.log('Validar Token')
    const headerToken = req.headers['authorization'];

    if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
        let tokenValido = false; // Variable para controlar si el token es válido

        // Verificar el primer token
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'Lamers005*');
            tokenValido = true; // Indicar que el token es válido
        } catch (error) {
            // El primer token no es válido
        }

        // Si el primer token no es válido, intentar con el segundo token
        if (!tokenValido) {
            try {
                const bearerToken = headerToken.slice(7);
                jwt.verify(bearerToken, process.env.SECERT_KEY_PYME || 'Lamers006*');
                tokenValido = true; // Indicar que el token es válido
            } catch (error) {
                // Ambos tokens son inválidos
            }
        }

        if (tokenValido) {
            // Al menos uno de los tokens es válido, se puede pasar al siguiente middleware
            next();
        } else {
            // Ninguno de los tokens es válido
            res.status(401).json({
                msg: 'Token no válido'
            });
        }
    } else {
        // No se proporcionó el token en la solicitud
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
};

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