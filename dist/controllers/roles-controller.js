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
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateRol = exports.inactivateRol = exports.updateRoles = exports.deleteRol = exports.postRol = exports.getRol = exports.getAllRoles = void 0;
const roles_models_1 = require("../models/roles-models");
//Obtiene todos los roles de la base de datos
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _roles = yield roles_models_1.Roles.findAll();
    res.json(_roles);
});
exports.getAllRoles = getAllRoles;
//Obtiene un rol de la base de datos
const getRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol } = req.body;
    try {
        const _rol = yield roles_models_1.Roles.findOne({
            where: { id_rol: id_rol }
        });
        if (_rol) {
            res.json({ _rol });
        }
        else {
            res.status(404).json({
                msg: `el Id del rol no existe: ${id_rol}`
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
exports.getRol = getRol;
//Inserta un rol en la base de datos
const postRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol, descripcion, estado_rol, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
    try {
        const _Rol = yield roles_models_1.Roles.findOne({
            where: { rol: rol }
        });
        if (_Rol) {
            return res.status(400).json({
                msg: 'Rol ya registrado en la base de datos: ' + rol
            });
        }
        else {
            const newrol = yield roles_models_1.Roles.create({
                rol: rol.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                estado_rol: estado_rol,
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion
            });
            res.json(newrol);
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
exports.postRol = postRol;
//Elimina un rol de la base de datos
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol } = req.body;
    try {
        const _rol = yield roles_models_1.Roles.findOne({
            where: { id_rol: id_rol }
        });
        if (_rol) {
            yield _rol.destroy();
            res.json(_rol);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró ningun rol con el ID: ' + id_rol,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el rol:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el rol',
        });
    }
});
exports.deleteRol = deleteRol;
//actualiza el rol en la base de datos
const updateRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol, rol, descripcion, estado_rol, modificado_por, fecha_modificacion } = req.body;
    try {
        const _rol = yield roles_models_1.Roles.findOne({
            where: { id_rol: id_rol }
        });
        if (!_rol) {
            return res.status(404).json({
                msg: 'Rol con el ID: ' + id_rol + ' no existe en la base de datos'
            });
        }
        yield _rol.update({
            id_rol: id_rol,
            rol: rol.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            estado_rol: estado_rol,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion
        });
        res.json(_rol);
    }
    catch (error) {
        console.error('Error al actualizar el rol:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el rol',
        });
    }
});
exports.updateRoles = updateRoles;
//Inactiva el Rol de la DBA
const inactivateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol, rol, descripcion, estado_rol, modificado_por, fecha_modificacion } = req.body;
    try {
        const _rol = yield roles_models_1.Roles.findOne({
            where: { rol: rol }
        });
        if (!_rol) {
            return res.status(404).json({
                msg: "El Rol no existe: " + rol
            });
        }
        yield _rol.update({
            estado_rol: 2,
            modificado_por: modificado_por
        });
        res.json(_rol);
    }
    catch (error) {
        console.error('Error al inactivar el rol:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el rol',
        });
    }
});
exports.inactivateRol = inactivateRol;
//Activa el Rol de la DBA
const activateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol, rol, descripcion, estado_rol, modificado_por, fecha_modificacion } = req.body;
    try {
        const _rol = yield roles_models_1.Roles.findOne({
            where: { rol: rol }
        });
        if (!_rol) {
            return res.status(404).json({
                msg: "El Rol no existe: " + rol
            });
        }
        yield _rol.update({
            estado_rol: 1,
            modificado_por: modificado_por
        });
        res.json(_rol);
    }
    catch (error) {
        console.error('Error al activar el rol:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el rol',
        });
    }
});
exports.activateRol = activateRol;
