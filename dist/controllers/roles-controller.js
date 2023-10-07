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
exports.updateRoles = exports.deleteRol = exports.postRol = exports.getRol = exports.getAllRoles = void 0;
const roles_models_1 = require("../models/roles-models");
//Obtiene todos los roles de la base de datos
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _roles = yield roles_models_1.Roles.findAll();
    res.json({ _roles });
});
exports.getAllRoles = getAllRoles;
//Obtiene un rol de la base de datos
const getRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol } = req.body;
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
});
exports.getRol = getRol;
//Inserta un rol en la base de datos
const postRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
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
            yield roles_models_1.Roles.create({
                rol: rol,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            });
            res.json({
                msg: 'El Rol: ' + rol + ' ha sido creada exitosamente',
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
            res.json({
                msg: 'El rol con el ID: ' + id_rol + ' ha sido eliminado exitosamente',
            });
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
    const { id_rol, rol, descripcion, modificado_por, fecha_modificacion } = req.body;
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
        rol: rol,
        descripcion: descripcion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion
    });
    res.json({
        msg: 'El Rol con el ID: ' + id_rol + ' ha sido actualizado exitosamente',
    });
});
exports.updateRoles = updateRoles;
