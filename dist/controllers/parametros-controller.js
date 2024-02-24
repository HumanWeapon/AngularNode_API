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
exports.activateParametro = exports.inactivateParametro = exports.updateParametro = exports.deleteParametro = exports.postParametro = exports.getParametro = exports.getAllParametros = void 0;
const parametros_models_1 = require("../models/parametros-models");
//Obtiene todos los parametros de la base de datos
const getAllParametros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _parametro = yield parametros_models_1.Parametros.findAll();
    res.json(_parametro);
});
exports.getAllParametros = getAllParametros;
//Obtiene un parametro de la base de datos
const getParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_parametro } = req.body;
    try {
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { id_parametro: id_parametro }
        });
        if (_parametro) {
            res.json({ _parametro });
        }
        else {
            res.status(404).json({
                msg: `el ID del parametro: ${id_parametro} no existe `
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
exports.getParametro = getParametro;
//Inserta un parametro en la base de datos
const postParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parametro, valor, estado_parametro, fecha_creacion, fecha_modificacion, creado_por, modificado_por } = req.body;
    try {
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { parametro: parametro }
        });
        if (_parametro) {
            return res.status(400).json({
                msg: 'Parametro ya registrado en la base de datos: ' + parametro
            });
        }
        else {
            yield parametros_models_1.Parametros.create({
                parametro: parametro.toUpperCase(),
                valor: valor,
                estado_parametro: estado_parametro,
                fecha_creacion: fecha_creacion,
                fecha_modificacion: fecha_modificacion,
                creado_por: creado_por.toUpperCase(),
                modificado_por: modificado_por.toUpperCase(),
            });
            res.json({
                msg: 'El Parametro: ' + parametro + ' ha sido creada exitosamente',
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
exports.postParametro = postParametro;
//Elimina un parametro de la base de datos
const deleteParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_parametro } = req.body;
    try {
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { id_parametro: id_parametro }
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
//actualiza la pregunta de la base de datos
const updateParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_parametro, parametro, valor, estado_parametro, fecha_modificacion, modificado_por } = req.body;
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { id_parametro: id_parametro }
        });
        if (!_parametro) {
            return res.status(404).json({
                msg: 'Parametro con el ID: ' + id_parametro + ' no existe en la base de datos'
            });
        }
        yield _parametro.update({
            id_parametro: id_parametro,
            parametro: parametro.toUpperCase(),
            valor: valor,
            estado_parametro: estado_parametro,
            fecha_modificacion: fecha_modificacion,
            modificado_por: modificado_por.toUpperCase(),
        });
        res.json(_parametro);
    }
    catch (error) {
        console.error('Error al actualizar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el parámetro',
        });
    }
});
exports.updateParametro = updateParametro;
//Inactiva el parametro de la DBA
const inactivateParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { parametro } = req.body;
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { parametro: parametro }
        });
        if (!_parametro) {
            return res.status(404).json({
                msg: "El Parametro no existe: " + parametro
            });
        }
        yield _parametro.update({
            estado_parametro: 2
        });
        res.json(_parametro);
    }
    catch (error) {
        console.error('Error al inactivar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el parámetro',
        });
    }
});
exports.inactivateParametro = inactivateParametro;
//Activa el parametro de la DBA
const activateParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { parametro } = req.body;
        const _parametro = yield parametros_models_1.Parametros.findOne({
            where: { parametro: parametro }
        });
        if (!_parametro) {
            return res.status(404).json({
                msg: "El Parametro no existe: " + parametro
            });
        }
        yield _parametro.update({
            estado_parametro: 1
        });
        res.json(_parametro);
    }
    catch (error) {
        console.error('Error al activar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el parámetro',
        });
    }
});
exports.activateParametro = activateParametro;
