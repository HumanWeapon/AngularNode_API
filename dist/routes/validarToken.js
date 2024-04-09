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
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //Tiene Token
        try {
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'Lamers005*');
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
