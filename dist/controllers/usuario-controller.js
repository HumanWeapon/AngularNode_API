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
exports.usuariosAllParametros = exports.usuariosAllRoles = exports.cambiarContrasena = exports.updateUsuario = exports.activateUsuario = exports.inactivateUsuario = exports.deleteUsuario = exports.postUsuario = exports.getUsuario = exports.getAllUsuarios = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_models_1 = require("../models/usuario-models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roles_models_1 = require("../models/roles-models");
const permisos_models_1 = require("../models/permisos-models");
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
                user.estado_usuario = 3;
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
        if (user.fecha_ultima_conexion == null) {
            return res.json(user.fecha_ultima_conexion);
        }
        // Validar estado del usuario
        if (user.estado_usuario != 1) {
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
    try {
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
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getUsuario = getUsuario;
//Inserta un usuario en la base de datos
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { creado_por, fecha_creacion, modificado_por, fecha_modificacion, usuario, nombre_usuario, correo_electronico, contrasena, id_rol, fecha_ultima_conexion, fecha_vencimiento, intentos_fallidos, estado_usuario } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
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
            const newUser = yield usuario_models_1.User.create({
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: Date.now(),
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: Date.now(),
                usuario: usuario.toUpperCase(),
                nombre_usuario: nombre_usuario.toUpperCase(),
                correo_electronico: correo_electronico,
                estado_usuario: estado_usuario,
                contrasena: hashedPassword,
                id_rol: id_rol,
                fecha_ultima_conexion: null,
                fecha_vencimiento: fecha_vencimiento,
                intentos_fallidos: intentos_fallidos
            });
            return res.json(newUser); // Devolver el nuevo usuario creado como respuesta
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
//Destruye el usuario de la DBA
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
    res.json(user);
});
exports.deleteUsuario = deleteUsuario;
//Inactiva el usuario de la DBA
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
        estado_usuario: 2
    });
    res.json(user);
});
exports.inactivateUsuario = inactivateUsuario;
//Activa el usuario de la DBA
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
        estado_usuario: 1
    });
    res.json(user);
});
exports.activateUsuario = activateUsuario;
//Actualiza el usuario en la base de datos
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, usuario, modificado_por, fecha_modificacion, nombre_usuario, correo_electronico, estado_usuario, id_rol, fecha_vencimiento, fecha_ultima_conexion } = req.body;
    const user = yield usuario_models_1.User.findOne({
        where: { id_usuario: id_usuario }
    });
    if (!user) {
        return res.status(404).json({
            msg: "El usuario con el ID: " + id_usuario + " no existe"
        });
    }
    yield user.update({
        id_usuario: id_usuario,
        usuario: usuario,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        nombre_usuario: nombre_usuario,
        correo_electronico: correo_electronico,
        estado_usuario: estado_usuario,
        id_rol: id_rol,
        fecha_vencimiento: fecha_vencimiento,
        fecha_ultima_conexion: fecha_ultima_conexion
    });
    res.json(user);
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
            estado_usuario: 1,
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
// Realiza una consulta INNER JOIN entre las tablas Usuario y Roles
const usuariosAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_models_1.User.findAll({
            include: [
                {
                    model: roles_models_1.Roles,
                    as: 'roles' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        res.json(usuario);
    }
    catch (error) {
        console.error('Error al obtener preguntas de usuario:', error);
        res.status(500).json({ error: 'Error al obtener preguntas de usuario' });
    }
});
exports.usuariosAllRoles = usuariosAllRoles;
// Realiza una consulta INNER JOIN entre las tablas Usuario, Roles y Objetos
const usuariosAllParametros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    try {
        const Users = yield usuario_models_1.User.findOne({
            where: { usuario: usuario },
            include: [
                {
                    model: roles_models_1.Roles,
                    as: 'roles',
                    include: [
                        {
                            model: permisos_models_1.Permisos,
                            as: 'permisos',
                            include: [
                                {
                                    where: { usuario: usuario },
                                    model: permisos_models_1.Permisos,
                                    as: 'permisos',
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        res.json(Users);
    }
    catch (error) {
        console.error('Error al obtener parámetros de usuario:', error);
        res.status(500).json({ error: 'Error al obtener parámetros de usuario de usuario' });
    }
});
exports.usuariosAllParametros = usuariosAllParametros;
