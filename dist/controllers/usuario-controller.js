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
exports.cambiarContrasena = exports.updateUsuario = exports.activateUsuario = exports.inactivateUsuario = exports.deleteUsuario = exports.postUsuario = exports.getUsuario = exports.getAllUsuarios = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_models_1 = require("../models/usuario-models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, contrasena, id_usuario, creado_por, fecha_creacion, modificado_por, fecha_modificacion, nombre_usuario, correo_electronico, estado_usuario, id_rol, fecha_ultima_conexion, primer_ingreso, fecha_vencimiento, intentos_fallidos } = req.body;
    try {
        // Busca el usuario en la base de datos
        const user = yield usuario_models_1.User.findOne({
            where: { usuario: usuario }
        });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario/contraseña inválidos.'
            });
        }
        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const passwordValid = yield bcrypt_1.default.compare(contrasena, user.contrasena);
        if (!passwordValid) {
            // Si la contraseña es incorrecta, aumenta el contador de intentos fallidos
            user.intentos_fallidos = (user.intentos_fallidos || 0) + 1;
            yield user.save();
            if (user.intentos_fallidos >= 3) {
                // Si el usuario ha alcanzado 3 intentos fallidos, bloquea el usuario
                user.estado_usuario = false;
                yield user.save();
            }
            return res.status(400).json({
                msg: 'Usuario/contraseña inválidos.',
            });
        }
        else {
            // Si el inicio de sesión es exitoso, restablece los intentos fallidos
            user.intentos_fallidos = 0;
            yield user.save();
        }
        // Validar estado del usuario
        if (!user.estado_usuario) {
            return res.status(400).json({
                msg: 'Usuario Inactivo',
            });
        }
        // Genera el token
        const token = jsonwebtoken_1.default.sign({
            usuario: usuario
        }, process.env.SECRET_KEY || 'Lamers005*');
        res.json(token);
    }
    catch (error) {
        console.error('Error en loginUser:', error);
        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: error.message
            });
        }
        else {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: 'Error desconocido' // Otra manejo de errores si no es una instancia de Error
            });
        }
    }
});
exports.loginUser = loginUser;
//Obtiene todos los usuarios de la base de datos
const getAllUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_models_1.User.findAll();
    res.json(usuarios);
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
    const { id_usuario, usuario, nombre_usuario, correo_electronico, contrasena, intentos_fallidos } = req.body;
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
                id_usuario: id_usuario,
                fecha_creacion: fecha_creacion,
                usuario: usuario,
                nombre_usuario: nombre_usuario,
                correo_electronico: correo_electronico,
                contrasena: hashedPassword,
                intentos_fallidos: intentos_fallidos
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
//Desbloquea la contraseña
const cambiarContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, contrasena } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
        const user = yield usuario_models_1.User.findOne({
            where: { usuario: usuario }
        });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario no existe',
            });
        }
        yield user.update({
            contrasena: hashedPassword,
            estado_usuario: true,
            intentos_fallidos: 0
        });
        res.json({
            msg: 'Tu contraseña ha sido cambiada con éxito',
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al cambiar tu contraseña' });
    }
});
exports.cambiarContrasena = cambiarContrasena;
