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
exports.updateParametro = exports.deleteParametro = exports.postParametro = exports.getParametro = exports.getAllParametros = void 0;
const parametros_models_1 = require("../models/parametros-models");
// Obtiene todos los parametros de la base de datos
const getAllParametros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _parametro = yield parametros_models_1.Parametros.findAll();
        res.json(_parametro);
    }
    catch (error) {
        console.error('Error al obtener todos los parámetros:', error);
        res.status(500).json({ error: 'Error al obtener todos los parámetros' });
    }
});
exports.getAllParametros = getAllParametros;
// Obtiene un parametro de la base de datos
const getParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_parametro } = req.body;
    try {
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { id_parametro: id_parametro },
        });
        if (_parametro) {
            res.json({ _parametro });
        }
        else {
            res.status(404).json({
                msg: `El ID del parámetro: ${id_parametro} no existe `,
            });
        }
    }
    catch (error) {
        console.error('Error al obtener el parámetro:', error);
        res.status(500).json({ error: 'Error al obtener el parámetro' });
    }
});
exports.getParametro = getParametro;
// Inserta un parametro en la base de datos
const postParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parametro, valor, fecha_creacion, fecha_modificacion, creado_por, modificado_por } = req.body;
    try {
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { parametro: parametro },
        });
        if (_parametro) {
            return res.status(400).json({
                msg: 'Parametro ya registrado en la base de datos: ' + parametro,
            });
        }
        else {
            yield parametros_models_1.Parametros.create({
                parametro: parametro,
                valor: valor,
                fecha_creacion: fecha_creacion,
                fecha_modificacion: fecha_modificacion,
                creado_por: creado_por,
                modificado_por: modificado_por,
            });
            res.json({
                msg: 'El Parametro: ' + parametro + ' ha sido creada exitosamente',
            });
        }
    }
    catch (error) {
        console.error('Error al crear el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al crear el parámetro',
            error,
        });
    }
});
exports.postParametro = postParametro;
// Elimina un parametro de la base de datos
const deleteParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_parametro } = req.body;
    try {
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { id_parametro: id_parametro },
        });
        if (_parametro) {
            yield _parametro.destroy();
            res.json({
                msg: 'El parámetro con el ID: ' + id_parametro + ' ha sido eliminado exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un parámetro con el ID: ' + id_parametro,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el parámetro',
        });
    }
});
exports.deleteParametro = deleteParametro;
// Actualiza la pregunta de la base de datos
const updateParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_parametro, parametro, valor, fecha_modificacion, modificado_por } = req.body;
    try {
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { id_parametro: id_parametro },
        });
        if (!_parametro) {
            return res.status(404).json({
                msg: 'Parametro con el ID: ' + id_parametro + ' no existe en la base de datos',
            });
        }
        yield _parametro.update({
            id_parametro: id_parametro,
            parametro: parametro,
            valor: valor,
            fecha_modificacion: fecha_modificacion,
            modificado_por: modificado_por,
        });
        res.json({
            msg: 'El parametro con el ID: ' + id_parametro + ' ha sido actualizada exitosamente',
        });
    }
    catch (error) {
        console.error('Error al actualizar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el parámetro',
        });
    }
});
exports.updateParametro = updateParametro;
