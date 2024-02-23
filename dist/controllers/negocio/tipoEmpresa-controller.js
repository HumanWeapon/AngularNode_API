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
exports.activateTipoEmpresa = exports.inactivateTipoEmpresa = exports.updateTipoEmpresa = exports.deleteTipoEmpresa = exports.postTipoEmpresa = exports.getTipoEmpresa = exports.getAllTipoEmpresa = void 0;
const tipoEmpresa_models_1 = require("../../models/negocio/tipoEmpresa-models");
//Obtiene todos los registros de la base de datos
const getAllTipoEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _emp = yield tipoEmpresa_models_1.tipoEmpresa.findAll();
    res.json(_emp);
});
exports.getAllTipoEmpresa = getAllTipoEmpresa;
//Obtiene un registro de la base de datos     
const getTipoEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_empresa } = req.body;
    const _emp = yield tipoEmpresa_models_1.tipoEmpresa.findOne({
        where: { tipo_empresa: tipo_empresa }
    });
    if (_emp) {
        res.json({ _emp });
    }
    else {
        res.status(404).json({
            msg: `El Tipo de empresa buscado no existe en la BD: ${tipo_empresa}`
        });
    }
});
exports.getTipoEmpresa = getTipoEmpresa;
//Inserta un registro en la base de datos
const postTipoEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _emp = yield tipoEmpresa_models_1.tipoEmpresa.findOne({
            where: { tipo_empresa: tipo_empresa }
        });
        if (_emp) {
            return res.status(400).json({
                msg: 'Tipo de empresa ya registrado en la base de datos: ' + tipo_empresa
            });
        }
        else {
            const newTE = yield tipoEmpresa_models_1.tipoEmpresa.create({
                tipo_empresa: tipo_empresa.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json(newTE);
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postTipoEmpresa = postTipoEmpresa;
//Elimina un registro de la base de datos
const deleteTipoEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_empresa } = req.body;
    try {
        const _emp = yield tipoEmpresa_models_1.tipoEmpresa.findOne({
            where: { id_tipo_empresa: id_tipo_empresa }
        });
        if (_emp) {
            yield _emp.destroy();
            res.json(_emp);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un Tipo de empresa con el ID ' + id_tipo_empresa,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el registro',
        });
    }
});
exports.deleteTipoEmpresa = deleteTipoEmpresa;
//actualiza el registro en la base de datos
const updateTipoEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_empresa, tipo_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _emp = yield tipoEmpresa_models_1.tipoEmpresa.findOne({
            where: { id_tipo_empresa: id_tipo_empresa }
        });
        if (!_emp) {
            return res.status(404).json({
                msg: 'el Tipo de empresa con el ID: ' + id_tipo_empresa + ' no existe en la base de datos'
            });
        }
        yield _emp.update({
            id_tipo_empresa: id_tipo_empresa,
            tipo_empresa: tipo_empresa.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json(_emp);
    }
    catch (error) {
        console.error('Error al actualizar el tipo de empresa:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el tipo de empresa',
        });
    }
});
exports.updateTipoEmpresa = updateTipoEmpresa;
//Inactiva el usuario de la DBA
const inactivateTipoEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_empresa } = req.body;
    try {
        const tipempresa = yield tipoEmpresa_models_1.tipoEmpresa.findOne({
            where: { tipo_empresa: tipo_empresa }
        });
        if (!tipempresa) {
            return res.status(404).json({
                msg: "El tipo de Empresa no existe: " + tipo_empresa
            });
        }
        yield tipempresa.update({
            estado: 2
        });
        res.json(tipoEmpresa_models_1.tipoEmpresa);
    }
    catch (error) {
        console.error('Error al inactivar el tipo de empresa:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el tipo de empresa',
        });
    }
});
exports.inactivateTipoEmpresa = inactivateTipoEmpresa;
//Activa el usuario de la DBA
const activateTipoEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_empresa } = req.body;
    try {
        const tipempresa = yield tipoEmpresa_models_1.tipoEmpresa.findOne({
            where: { tipo_empresa: tipo_empresa }
        });
        if (!tipempresa) {
            return res.status(404).json({
                msg: "El tipo de Empresa no existe: " + tipo_empresa
            });
        }
        yield tipempresa.update({
            estado: 1
        });
        res.json(tipempresa);
    }
    catch (error) {
        console.error('Error al inactivar el tipo de empresa:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el tipo de empresa',
        });
    }
});
exports.activateTipoEmpresa = activateTipoEmpresa;
