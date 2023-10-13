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
exports.updatePermisos = exports.deletePermiso = exports.postPermiso = exports.getPermiso = exports.getAllPermisos = void 0;
const permisos_models_1 = require("../models/permisos-models");
//Obtiene todos los permisos de la base de datos
const getAllPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _permisos = yield permisos_models_1.Permisos.findAll();
    res.json(_permisos);
});
exports.getAllPermisos = getAllPermisos;
//Obtiene un permiso de la base de datos
const getPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_permisos } = req.body;
    const _permiso = yield permisos_models_1.Permisos.findOne({
        where: { id_permisos: id_permisos }
    });
    if (_permiso) {
        res.json({ _permiso });
    }
    else {
        res.status(404).json({
            msg: `el Id del permiso no existe: ${id_permisos}`
        });
    }
});
exports.getPermiso = getPermiso;
//Inserta un permiso en la base de datos
const postPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol, id_objeto, permiso_insercion, permiso_eliminacion, permiso_actualizacion, permiso_consultar, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
    try {
        const _permiso = yield permisos_models_1.Permisos.findOne({
            where: { id_rol: id_rol }
        });
        if (_permiso) {
            return res.status(400).json({
                msg: 'Permiso ya registrado en la base de datos: '
            });
        }
        else {
            yield permisos_models_1.Permisos.create({
                id_rol: id_rol,
                id_objeto: id_objeto,
                permiso_insercion: permiso_insercion,
                permiso_eliminacion: permiso_eliminacion,
                permiso_actualizacion: permiso_actualizacion,
                permiso_consultar: permiso_consultar,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            });
            res.json({
                msg: 'El permiso ha sido creada exitosamente',
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
exports.postPermiso = postPermiso;
//Elimina un permiso de la base de datos
const deletePermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_permisos } = req.body;
    try {
        const _permisos = yield permisos_models_1.Permisos.findOne({
            where: { id_permisos: id_permisos }
        });
        if (_permisos) {
            yield _permisos.destroy();
            res.json({
                msg: 'El permiso ha sido eliminado exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró ningun permiso con esa numeracion',
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el permiso:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el permiso',
        });
    }
});
exports.deletePermiso = deletePermiso;
//actualiza el permiso en la base de datos
const updatePermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_permisos, id_rol, id_objeto, permiso_insercion, permiso_eliminacion, permiso_actualizacion, permiso_consultar, modificado_por, fecha_modificacion } = req.body;
    const _permiso = yield permisos_models_1.Permisos.findOne({
        where: { id_permisos: id_permisos }
    });
    if (!_permiso) {
        return res.status(404).json({
            msg: 'El permiso seleccionado no existe en la base de datos'
        });
    }
    yield _permiso.update({
        id_permisos: id_permisos,
        id_rol: id_rol,
        id_objeto: id_objeto,
        permiso_insercion: permiso_insercion,
        permiso_eliminacion: permiso_eliminacion,
        permiso_actualizacion: permiso_actualizacion,
        permiso_consultar: permiso_consultar,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion
    });
    res.json({
        msg: 'El permiso ha sido actualizado exitosamente',
    });
});
exports.updatePermisos = updatePermisos;