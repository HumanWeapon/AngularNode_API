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
exports.activateEmpresa = exports.inactivateEmpresa = exports.updateEmpresa = exports.deleteEmpresa = exports.postEmpresa = exports.getEmpresa = exports.getAllEmpresas = void 0;
const empresas_model_1 = require("../../models/negocio/empresas-model");
//Obtiene todas las Empresas
const getAllEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empresa = yield empresas_model_1.Empresas.findAll();
    res.json(empresa);
});
exports.getAllEmpresas = getAllEmpresas;
//Obtiene una Empresa por ID
const getEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empresa } = req.body;
    const _empresa = yield empresas_model_1.Empresas.findOne({
        where: { id_empresa: id_empresa }
    });
    if (_empresa) {
        res.json(_empresa);
    }
    else {
        res.status(404).json({
            msg: `el ID de la Empresa no existe: ${id_empresa}`
        });
    }
});
exports.getEmpresa = getEmpresa;
// Inserta una nueva Empresa en la base de datos
const postEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_empresa, nombre_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _empresa = yield empresas_model_1.Empresas.findOne({
            where: { nombre_empresa: nombre_empresa }
        });
        yield empresas_model_1.Empresas.create({
            id_tipo_empresa: id_tipo_empresa,
            nombre_empresa: nombre_empresa,
            descripcion: descripcion,
            creado_por: creado_por,
            fecha_creacion: Date.now(),
            modificado_por: modificado_por,
            fecha_modificacion: Date.now(),
            estado: estado
        });
        res.json({
            msg: 'La Empresa: ' + nombre_empresa + ' ha sido creada exitosamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postEmpresa = postEmpresa;
// Elimina la Pyme de la base de datos
const deleteEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empresa } = req.body; // Obtén el ID desde los parámetros de la URL
    try {
        const _empresa = yield empresas_model_1.Empresas.findOne({
            where: { id_empresa: id_empresa }
        });
        if (_empresa) {
            yield _empresa.destroy();
            res.json({
                msg: 'La Empresa con el ID: ' + id_empresa + ' ha sido eliminada exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró una Empresa con el ID ' + id_empresa,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar la Empresa:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Empresa',
        });
    }
});
exports.deleteEmpresa = deleteEmpresa;
//actualiza el Telefono en la base de datos
const updateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empresa, id_tipo_empresa, nombre_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    const _empresa = yield empresas_model_1.Empresas.findOne({
        where: { id_empresa: id_empresa }
    });
    if (!_empresa) {
        return res.status(404).json({
            msg: 'Empresa con el ID: ' + id_empresa + ' no existe en la base de datos'
        });
    }
    yield _empresa.update({
        id_empresa: id_empresa,
        id_tipo_empresa: id_tipo_empresa,
        nombre_empresa: nombre_empresa,
        descripcion: descripcion,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'La Empresa con el ID: ' + id_empresa + ' ha sido actualizado exitosamente',
    });
});
exports.updateEmpresa = updateEmpresa;
//Inactiva el usuario de la DBA
const inactivateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_empresa } = req.body;
    const empresa = yield empresas_model_1.Empresas.findOne({
        where: { nombre_empresa: nombre_empresa }
    });
    if (!empresa) {
        return res.status(404).json({
            msg: "La Empresa no existe: " + nombre_empresa
        });
    }
    yield empresa.update({
        estado: 2
    });
    res.json({
        msg: 'Empresa: ' + nombre_empresa + ' inactivado exitosamente',
    });
});
exports.inactivateEmpresa = inactivateEmpresa;
//Activa el usuario de la DBA
const activateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_empresa } = req.body;
    const empresa = yield empresas_model_1.Empresas.findOne({
        where: { nombre_empresa: nombre_empresa }
    });
    if (!empresa) {
        return res.status(404).json({
            msg: "La Empresa no existe: " + nombre_empresa
        });
    }
    yield empresa.update({
        estado: 1
    });
    res.json({
        msg: 'Empresa: ' + nombre_empresa + ' ha sido activado exitosamente',
    });
});
exports.activateEmpresa = activateEmpresa;