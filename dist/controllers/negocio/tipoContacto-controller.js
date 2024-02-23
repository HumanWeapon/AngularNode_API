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
exports.activateTipoContacto = exports.inactivateTipoContacto = exports.updateTipoContacto = exports.deleteTipoContacto = exports.postTipoContacto = exports.getTipoContacto = exports.getAllTipoContactos = void 0;
const tipoContacto_models_1 = require("../../models/negocio/tipoContacto-models");
//Obtiene todos los contacto de la base de datos
const getAllTipoContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _cont = yield tipoContacto_models_1.TipoContacto.findAll();
    res.json(_cont);
});
exports.getAllTipoContactos = getAllTipoContactos;
//Obtiene un contacto de la base de datos     
const getTipoContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_contacto } = req.body;
    const _cont = yield tipoContacto_models_1.TipoContacto.findOne({
        where: { tipo_contacto: tipo_contacto }
    });
    if (_cont) {
        res.json({ _cont });
    }
    else {
        res.status(404).json({
            msg: `El Contacto no existe: ${tipo_contacto}`
        });
    }
});
exports.getTipoContacto = getTipoContacto;
//Inserta un contacto en la base de datos
const postTipoContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_contacto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _cont = yield tipoContacto_models_1.TipoContacto.findOne({
            where: { tipo_contacto: tipo_contacto }
        });
        if (_cont) {
            return res.status(400).json({
                msg: 'Contacto ya registrado en la base de datos: ' + tipo_contacto
            });
        }
        else {
            const newTC = yield tipoContacto_models_1.TipoContacto.create({
                tipo_contacto: tipo_contacto,
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json(newTC);
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
exports.postTipoContacto = postTipoContacto;
//Elimina un contacto de la base de datos
const deleteTipoContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_contacto } = req.body;
    try {
        const _cont = yield tipoContacto_models_1.TipoContacto.findOne({
            where: { id_tipo_contacto: id_tipo_contacto }
        });
        if (_cont) {
            yield _cont.destroy();
            res.json(_cont);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un contacto con el ID ' + id_tipo_contacto,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el dirección:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la dirección',
        });
    }
});
exports.deleteTipoContacto = deleteTipoContacto;
//actualiza la dirección en la base de datos
const updateTipoContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_contacto, tipo_contacto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _cont = yield tipoContacto_models_1.TipoContacto.findOne({
            where: { id_tipo_contacto: id_tipo_contacto }
        });
        if (!_cont) {
            return res.status(404).json({
                msg: 'contacto con el ID: ' + id_tipo_contacto + ' no existe en la base de datos'
            });
        }
        yield _cont.update({
            id_tipo_contacto: id_tipo_contacto,
            tipo_contacto: tipo_contacto,
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json(_cont);
    }
    catch (error) {
        console.error('Error al actualizar el tipo de contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el tipo de contacto',
        });
    }
});
exports.updateTipoContacto = updateTipoContacto;
//Inactiva el usuario de la DBA
const inactivateTipoContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_contacto } = req.body;
    try {
        const _cont = yield tipoContacto_models_1.TipoContacto.findOne({
            where: { tipo_contacto: tipo_contacto }
        });
        if (!_cont) {
            return res.status(404).json({
                msg: "El Tipo de Contacto no existe: " + tipo_contacto
            });
        }
        yield _cont.update({
            estado: 2
        });
        res.json(_cont);
    }
    catch (error) {
        console.error('Error al inactivar el tipo contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el tipo contacto',
        });
    }
});
exports.inactivateTipoContacto = inactivateTipoContacto;
//Activa el usuario de la DBA
const activateTipoContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_contacto } = req.body;
    try {
        const _cont = yield tipoContacto_models_1.TipoContacto.findOne({
            where: { tipo_contacto: tipo_contacto }
        });
        if (!_cont) {
            return res.status(404).json({
                msg: "El tipo de Contacto no existe: " + tipo_contacto
            });
        }
        yield _cont.update({
            estado: 1
        });
        res.json(_cont);
    }
    catch (error) {
        console.error('Error al activar el tipo contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el tipo contacto',
        });
    }
});
exports.activateTipoContacto = activateTipoContacto;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
