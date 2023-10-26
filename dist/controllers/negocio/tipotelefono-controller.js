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
exports.updateTelefono = exports.deleteTelefono = exports.getOneTelefono = exports.getAllTelefonos = void 0;
const tipo_telefono_models_1 = require("../../models/negocio/tipo_telefono-models");
//Obtiene todos los telefonos de la base de datos
const getAllTelefonos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipotelefonos = yield tipo_telefono_models_1.tipoTelefono.findAll();
    res.json(tipotelefonos);
});
exports.getAllTelefonos = getAllTelefonos;
//Obtiene todos un telefono de la base de datos
const getOneTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipotelefono } = req.body;
    const tipotelefonos = yield tipo_telefono_models_1.tipoTelefono.findOne({ where: { tipotelefono: tipotelefono } });
    res.json(tipotelefonos);
});
exports.getOneTelefono = getOneTelefono;
//Elimina un telefono de la base de datos
const deleteTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_telefono } = req.body;
    try {
        const _telefono = yield tipo_telefono_models_1.tipoTelefono.findOne({
            where: { id_tipo_telefono: id_tipo_telefono }
        });
        if (_telefono) {
            yield _telefono.destroy();
            res.json({
                msg: 'El Telefono con el ID: ' + id_tipo_telefono + ' ha sido eliminado exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un Telefono con el ID ' + id_tipo_telefono,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el Telefono:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el Telefono',
        });
    }
});
exports.deleteTelefono = deleteTelefono;
//actualiza el Telefono en la base de datos
const updateTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_telefono, tipo_telefono, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    const _telefono = yield tipo_telefono_models_1.tipoTelefono.findOne({
        where: { id_tipo_telefono: id_tipo_telefono }
    });
    if (!_telefono) {
        return res.status(404).json({
            msg: 'Telefono con el ID: ' + id_tipo_telefono + ' no existe en la base de datos'
        });
    }
    yield _telefono.update({
        id_tipo_telefono: id_tipo_telefono,
        tipo_telefono: tipo_telefono,
        descripcion: descripcion,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'El Telefono con el ID: ' + id_tipo_telefono + ' ha sido actualizado exitosamente',
    });
});
exports.updateTelefono = updateTelefono;
