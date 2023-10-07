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
exports.updateUsuario = exports.activateUsuario = exports.inactivateUsuario = exports.deleteUsuario = exports.postUsuario = exports.getUsuario = exports.getAllUsuarios = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_models_1 = require("../models/usuario-models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, creado_por, fecha_creacion, modificado_por, fecha_modificacion, usuario, nombre_usuario, correo_electronico, estado_usuario, contrasena, id_rol, fecha_ultima_conexion, preguntas_contestadas, primer_ingreso, fecha_vencimiento } = req.body;
    //Validar si el usuario existe en la base de datos
    const user = yield usuario_models_1.User.findOne({
        where: { usuario: usuario }
    });
    try {
        if (!user) {
            return res.status(400).json({
                msg: 'usuario/contraseña invalidos.'
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
    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const passwordValid = yield bcrypt_1.default.compare(contrasena, user.contrasena);
    if (!passwordValid) {
        return res.status(400).json({
            msg: 'usuario/contraseña invalidos.',
        });
    }
    // Validar estado del usuario
    if (!user.estado_usuario) {
        return res.status(400).json({
            msg: 'Usuario Inactivo',
        });
    }
    // Generamos token
    const token = jsonwebtoken_1.default.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);
});
exports.loginUser = loginUser;
//Obtiene todos los usuarios de la base de datos
const getAllUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_models_1.User.findAll();
    res.json({ usuarios });
});
exports.getAllUsuarios = getAllUsuarios;
//Obtiene un usuario especifico de la base de datos
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    const user = yield usuario_models_1.User.findOne({
        where: { usuario: usuario }
    });
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario: ${usuario}`
        });
    }
});
exports.getUsuario = getUsuario;
//Inserta un usuario en la base de datos
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, nombre_usuario, correo_electronico, contrasena } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
    const fecha_creacion = Date.now();
    try {
        const user = yield usuario_models_1.User.findOne({
            where: { usuario: usuario }
        });
        if (user) {
            return res.status(400).json({
                msg: 'Usuario ya existe en la base de datos: ' + usuario
            });
        }
        else {
            yield usuario_models_1.User.create({
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
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
    /*// Generamos token
    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);*/
});
exports.postUsuario = postUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    const user = yield usuario_models_1.User.findOne({
        where: { usuario: usuario }
    });
    if (!user) {
        return res.status(404).json({
            msg: "El usuario no existe: " + usuario
        });
    }
    yield user.destroy();
    res.json({
        msg: 'Usuario: ' + usuario + ' eliminado exitosamente',
    });
});
exports.deleteUsuario = deleteUsuario;
//
const inactivateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    const user = yield usuario_models_1.User.findOne({
        where: { usuario: usuario }
    });
    if (!user) {
        return res.status(404).json({
            msg: "El usuario no existe: " + usuario
        });
    }
    yield user.update({
        estado_usuario: false
    });
    res.json({
        msg: 'Usuario: ' + usuario + ' inactivado exitosamente',
    });
});
exports.inactivateUsuario = inactivateUsuario;
//
const activateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    const user = yield usuario_models_1.User.findOne({
        where: { usuario: usuario }
    });
    if (!user) {
        return res.status(404).json({
            msg: "El usuario no existe: " + usuario
        });
    }
    yield user.update({
        estado_usuario: true
    });
    res.json({
        msg: 'Usuario: ' + usuario + ' ha sido activado exitosamente',
    });
});
exports.activateUsuario = activateUsuario;
//Actualiza el usuario en la base de datos
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, modificado_por, fecha_modificacion, nombre_usuario, correo_electronico, estado_usuario, id_rol, fecha_vencimiento } = req.body;
    const user = yield usuario_models_1.User.findOne({
        where: { usuario: usuario }
    });
    if (!user) {
        return res.status(404).json({
            msg: "El usuario no existe: " + usuario
        });
    }
    yield user.update({
        usuario: usuario,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        nombre_usuario: nombre_usuario,
        correo_electronico: correo_electronico,
        estado_usuario: estado_usuario,
        id_rol: id_rol,
        fecha_vencimiento: fecha_vencimiento
    });
    res.json({
        msg: 'Usuario: ' + usuario + ' ha sido actualizado exitosamente',
    });
});
exports.updateUsuario = updateUsuario;
