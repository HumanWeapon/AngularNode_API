"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newuser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../models/usuario");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, nombre_usuario, correo_electronico, contrasena } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
    const fecha_creacion = Date.now();
    const user = yield usuario_1.User.findOne({
        where: { usuario: usuario }
    });
    if (user) {
        return res.status(400).json({
            msg: 'Usuario ya existe: ' + usuario
        });
    }
    try {
        yield usuario_1.User.create({
            fecha_creacion: fecha_creacion,
            usuario: usuario,
            nombre_usuario: nombre_usuario,
            correo_electronico: correo_electronico,
            contrasena: hashedPassword
        });
        res.json({
            msg: 'Usuario: ' + usuario + ' creado exitosamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
});
exports.newuser = newuser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, creado_por, fecha_creacion, modificado_por, fecha_modificacion, usuario, nombre_usuario, correo_electronico, estado_usuario, contrasena, id_rol, fecha_ultima_conexion, preguntas_contestadas, primer_ingreso, fecha_vencimiento } = req.body;
    //Validar si el usuario existe en la base de datos
    const user = yield usuario_1.User.findOne({
        where: { usuario: usuario }
    });
    try {
        if (user.estado_usuario = false) {
            return res.status(400).json({
                msg: 'Usuario inactivo ' + usuario
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
    //Validamos password
    const passwordValid = yield bcrypt_1.default.compare(contrasena, user.contrasena);
    if (!passwordValid) {
        return res.status(400).json({
            msg: 'Contraseña incorrecta',
        });
    }
    // Generamos token
    const token = jsonwebtoken_1.default.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);
});
exports.loginUser = loginUser;
