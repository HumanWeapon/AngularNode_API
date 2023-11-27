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
exports.activateTipoDireccion = exports.inactivateTipoDireccion = exports.updateTipoDireccion = exports.deleteTipoDireccion = exports.postTipoDireccion = exports.getTipoDireccion = exports.getAllTipoDirecciones = void 0;
const tipoDireccion_models_1 = require("../../models/negocio/tipoDireccion-models");
// Obtiene todos las direcciones de la base de datos
const getAllTipoDirecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findAll();
        res.json(_direc);
    }
    catch (error) {
        console.error('Error al obtener todos los tipos de dirección:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getAllTipoDirecciones = getAllTipoDirecciones;
// Obtiene una dirección de la base de datos
const getTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_direccion } = req.body;
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });
        if (_direc) {
            res.json({ _direc });
        }
        else {
            res.status(404).json({
                msg: `La dirección no existe: ${tipo_direccion}`
            });
        }
    }
    catch (error) {
        console.error('Error al obtener el tipo de dirección:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getTipoDireccion = getTipoDireccion;
// Inserta una dirección en la base de datos
const postTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });
        if (_direc) {
            return res.status(400).json({
                msg: 'Dirección ya registrada en la base de datos: ' + tipo_direccion
            });
        }
        else {
            yield tipoDireccion_models_1.TipoDireccion.create({
                tipo_direccion: tipo_direccion,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json({
                msg: 'La dirección: ' + tipo_direccion + ' ha sido creada exitosamente',
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
});
exports.postTipoDireccion = postTipoDireccion;
// Elimina una dirección de la base de datos
const deleteTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_tipo_direccion } = req.body;
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { id_tipo_direccion: id_tipo_direccion }
        });
        if (_direc) {
            yield _direc.destroy();
            res.json({
                msg: 'La dirección con el ID: ' + id_tipo_direccion + ' ha sido eliminada exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró una dirección con el ID ' + id_tipo_direccion,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar la dirección:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la dirección',
            error,
        });
    }
});
exports.deleteTipoDireccion = deleteTipoDireccion;
// Actualiza la dirección en la base de datos
const updateTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_tipo_direccion, tipo_direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { id_tipo_direccion: id_tipo_direccion }
        });
        if (!_direc) {
            return res.status(404).json({
                msg: 'Dirección con el ID: ' + id_tipo_direccion + ' no existe en la base de datos'
            });
        }
        yield _direc.update({
            id_tipo_direccion: id_tipo_direccion,
            tipo_direccion: tipo_direccion,
            descripcion: descripcion,
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json({
            msg: 'La dirección con el ID: ' + id_tipo_direccion + ' ha sido actualizado exitosamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
});
exports.updateTipoDireccion = updateTipoDireccion;
// Inactiva el usuario de la DBA
const inactivateTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_direccion } = req.body;
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });
        if (!_direc) {
            return res.status(404).json({
                msg: "El tipo de Dirección no existe: " + tipo_direccion
            });
        }
        yield _direc.update({
            estado: 2
        });
        res.json({
            msg: 'El Tipo de Dirección: ' + tipo_direccion + ' inactivado exitosamente',
        });
    }
    catch (error) {
        console.error('Error al inactivar el tipo de dirección:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el tipo de dirección',
            error,
        });
    }
});
exports.inactivateTipoDireccion = inactivateTipoDireccion;
// Activa el usuario de la DBA
const activateTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_direccion } = req.body;
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });
        if (!_direc) {
            return res.status(404).json({
                msg: "El tipo de Dirección no existe: " + tipo_direccion
            });
        }
        yield _direc.update({
            estado: 1
        });
        res.json({
            msg: 'El tipo de Dirección: ' + tipo_direccion + ' ha sido activado exitosamente',
        });
    }
    catch (error) {
        console.error('Error al activar el tipo de dirección:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el tipo de dirección',
            error,
        });
    }
});
exports.activateTipoDireccion = activateTipoDireccion;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
