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
exports.getAllObjetosMenu = exports.activateObjeto = exports.inactivateObjecto = exports.updateObjetos = exports.deleteObjeto = exports.postObjeto = exports.getObjeto = exports.getAllObjetos = void 0;
const objetos_models_1 = require("../models/objetos-models");
// Obtiene todos los objetos de la base de datos
const getAllObjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _objetos = yield objetos_models_1.Objetos.findAll();
        res.json(_objetos);
    }
    catch (error) {
        console.error('Error al obtener todos los objetos de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getAllObjetos = getAllObjetos;
// Obtiene un objeto de la base de datos
const getObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { objeto } = req.body;
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { objeto: objeto }
        });
        if (_objeto) {
            res.json({ _objeto });
        }
        else {
            res.status(404).json({
                msg: `El objeto no existe: ${objeto}`
            });
        }
    }
    catch (error) {
        console.error('Error al obtener un objeto de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getObjeto = getObjeto;
// Inserta un objeto en la base de datos
const postObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { objeto, descripcion, tipo_objeto, estado_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { objeto: objeto }
        });
        if (_objeto) {
            return res.status(400).json({
                msg: 'Objeto ya registrado en la base de datos: ' + objeto
            });
        }
        else {
            yield objetos_models_1.Objetos.create({
                objeto: objeto,
                descripcion: descripcion,
                tipo_objeto: tipo_objeto,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado_objeto: estado_objeto
            });
            res.json(`El Objeto: ${objeto} ha sido creada exitosamente`);
        }
    }
    catch (error) {
        console.error('Error al insertar un objeto en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.postObjeto = postObjeto;
// Elimina un objeto de la base de datos
const deleteObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_objeto } = req.body;
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { id_objeto: id_objeto }
        });
        if (_objeto) {
            yield _objeto.destroy();
            res.json({
                msg: 'El objeto con el ID: ' + id_objeto + ' ha sido eliminado exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un objeto con el ID ' + id_objeto,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar un objeto de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.deleteObjeto = deleteObjeto;
// Actualiza el objeto en la base de datos
const updateObjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_objeto, objeto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { id_objeto: id_objeto }
        });
        if (!_objeto) {
            return res.status(404).json({
                msg: 'El objeto con el ID: ' + id_objeto + ' no existe en la base de datos'
            });
        }
        yield _objeto.update({
            id_objeto: id_objeto,
            objeto: objeto,
            descripcion: descripcion,
            tipo_objeto: tipo_objeto,
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion
        });
        res.json(`El Objeto con el ID: ${id_objeto} ha sido actualizado exitosamente`);
    }
    catch (error) {
        console.error('Error al actualizar un objeto en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.updateObjetos = updateObjetos;
// Inactiva el objeto en la DBA
const inactivateObjecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { objeto } = req.body;
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { objeto: objeto }
        });
        if (!_objeto) {
            return res.status(404).json({
                msg: `El Objeto no existe: ${objeto}`
            });
        }
        yield _objeto.update({
            estado_objeto: 2
        });
        res.json(`Objeto: ${objeto} inactivado exitosamente`);
    }
    catch (error) {
        console.error('Error al inactivar un objeto en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.inactivateObjecto = inactivateObjecto;
// Activa el objeto en la DBA
const activateObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { objeto } = req.body;
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { objeto: objeto }
        });
        if (!_objeto) {
            return res.status(404).json({
                msg: `El Objeto no existe: ${objeto}`
            });
        }
        yield _objeto.update({
            estado_objeto: 1
        });
        res.json({
            msg: `Objeto: ${objeto} ha sido activado exitosamente`,
        });
    }
    catch (error) {
        console.error('Error al activar un objeto en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.activateObjeto = activateObjeto;
// Obtiene todos los objetos de la base de datos filtrados por tipo y estado
const getAllObjetosMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_objeto, estado_objeto } = req.body;
        const _objetos = yield objetos_models_1.Objetos.findAll({
            where: { tipo_objeto: tipo_objeto, estado_objeto: estado_objeto }
        });
        if (_objetos) {
            res.json(_objetos);
        }
        else {
            res.status(404).json({
                msg: `No se encontraron objetos para el tipo ${tipo_objeto} y estado ${estado_objeto}`
            });
        }
    }
    catch (error) {
        console.error('Error al obtener objetos filtrados por tipo y estado:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getAllObjetosMenu = getAllObjetosMenu;
