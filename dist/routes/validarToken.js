"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarTokenpyme = exports.validarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarToken = (req, res, next) => {
    console.log('Validar Token');
    const headerToken = req.headers['authorization'];
    if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
        let tokenValido = false; // Variable para controlar si el token es válido
        // Verificar el primer token
        try {
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'Lamers005*');
            tokenValido = true; // Indicar que el token es válido
        }
        catch (error) {
            // El primer token no es válido
        }
        // Si el primer token no es válido, intentar con el segundo token
        if (!tokenValido) {
            try {
                const bearerToken = headerToken.slice(7);
                jsonwebtoken_1.default.verify(bearerToken, process.env.SECERT_KEY_PYME || 'Lamers006*');
                tokenValido = true; // Indicar que el token es válido
            }
            catch (error) {
                // Ambos tokens son inválidos
            }
        }
        if (tokenValido) {
            // Al menos uno de los tokens es válido, se puede pasar al siguiente middleware
            next();
        }
        else {
            // Ninguno de los tokens es válido
            res.status(401).json({
                msg: 'Token no válido'
            });
        }
    }
    else {
        // No se proporcionó el token en la solicitud
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
};
exports.validarToken = validarToken;
const validarTokenpyme = (req, res, next) => {
    console.log('Validar Token');
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //Tiene Token
        try {
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECERT_KEY_PYME || 'Lamers006*');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token no valido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
};
exports.validarTokenpyme = validarTokenpyme;
