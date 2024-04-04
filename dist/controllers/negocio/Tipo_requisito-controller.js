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
exports.requisitosdeEmpresaPorId = exports.requisitosAllPaisesEmpresas = exports.activateRequisito = exports.inactivateRequisito = exports.updateTipo_Requisito = exports.deleteTipo_Requisito = exports.postTipo_Requisito = exports.getTipo_Requisito = exports.getAllTipo_Requisito = void 0;
const Tipo_requisito_models_1 = require("../../models/negocio/Tipo_requisito-models");
const paises_models_1 = require("../../models/negocio/paises-models");
const empresas_model_1 = require("../../models/negocio/empresas-model");
//Obtiene todos los tipos de requisito de la base de datos
const getAllTipo_Requisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const t_requisito = yield Tipo_requisito_models_1.Tipo_Requisito.findAll();
    res.json(t_requisito);
});
exports.getAllTipo_Requisito = getAllTipo_Requisito;
//Obtiene un tipo de requisito de la base de datos
const getTipo_Requisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_requisito } = req.body;
    try {
        const _tiporeq = yield Tipo_requisito_models_1.Tipo_Requisito.findOne({
            where: { tipo_requisito: tipo_requisito }
        });
        if (_tiporeq) {
            res.json({ _tiporeq });
        }
        else {
            res.status(404).json({
                msg: `el Id del tipo de permiso no existe: ${tipo_requisito}`
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
exports.getTipo_Requisito = getTipo_Requisito;
//Inserta un tipo_requisito en la base de datos
const postTipo_Requisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_requisito, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _tipreq = yield Tipo_requisito_models_1.Tipo_Requisito.findOne({
            where: { tipo_requisito: tipo_requisito }
        });
        if (_tipreq) {
            return res.status(400).json({
                msg: `Tipo de requisito ya registrado en la base de datos: ${tipo_requisito}`
            });
        }
        else {
            const newTRE = yield Tipo_requisito_models_1.Tipo_Requisito.create({
                tipo_requisito: tipo_requisito,
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json(newTRE);
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postTipo_Requisito = postTipo_Requisito;
//Elimina un tipo_requisito de la base de datos
const deleteTipo_Requisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_requisito } = req.body;
    try {
        const _tipreq = yield Tipo_requisito_models_1.Tipo_Requisito.findOne({
            where: { id_tipo_requisito: id_tipo_requisito }
        });
        if (_tipreq) {
            yield _tipreq.destroy();
            res.json(_tipreq);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró ningun registro con esa numeracion',
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
exports.deleteTipo_Requisito = deleteTipo_Requisito;
//actualiza el tipo requisito en la base de datos
const updateTipo_Requisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_requisito, tipo_requisito, descripcion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _tiporeq = yield Tipo_requisito_models_1.Tipo_Requisito.findOne({
            where: { id_tipo_requisito: id_tipo_requisito }
        });
        if (!_tiporeq) {
            return res.status(404).json({
                msg: 'El valor seleccionado no existe en la base de datos'
            });
        }
        yield _tiporeq.update({
            id_tipo_requisito: id_tipo_requisito,
            tipo_requisito: tipo_requisito,
            descripcion: descripcion.toUpperCase(),
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado
        });
        res.json(_tiporeq);
    }
    catch (error) {
        console.error('Error al actualizar el tipo requisito:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el tipo requisito',
        });
    }
});
exports.updateTipo_Requisito = updateTipo_Requisito;
//Inactiva el usuario de la DBA
const inactivateRequisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_requisito } = req.body;
    try {
        const tiporeq = yield Tipo_requisito_models_1.Tipo_Requisito.findOne({
            where: { tipo_requisito: tipo_requisito }
        });
        if (!tiporeq) {
            return res.status(404).json({
                msg: "El Requisito no existe: " + tipo_requisito
            });
        }
        yield tiporeq.update({
            estado: 2
        });
        res.json(tiporeq);
    }
    catch (error) {
        console.error('Error al inactivar el requisito de exportacion:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el requisito de exportacion',
        });
    }
});
exports.inactivateRequisito = inactivateRequisito;
//Activa el usuario de la DBA
const activateRequisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_requisito } = req.body;
    try {
        const tiporeq = yield Tipo_requisito_models_1.Tipo_Requisito.findOne({
            where: { tipo_requisito: tipo_requisito }
        });
        if (!tiporeq) {
            return res.status(404).json({
                msg: "El Requisito no existe: " + tipo_requisito
            });
        }
        yield tiporeq.update({
            estado: 1
        });
        res.json(tiporeq);
    }
    catch (error) {
        console.error('Error al inactivar el requisito de exportacion:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el requisito de exportacion',
        });
    }
});
exports.activateRequisito = activateRequisito;
// Realiza una consulta INNER JOIN entre las tablas Usuario y Roles
const requisitosAllPaisesEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requisitosAllPaisEmpresa = yield Tipo_requisito_models_1.Tipo_Requisito.findAll({
            include: [
                {
                    model: empresas_model_1.Empresas,
                    as: 'empresas'
                },
                {
                    model: paises_models_1.Paises,
                    as: 'paises' // Usa el mismo alias que en la definición de la asociación en el modelo
                }
            ],
        });
        res.json(requisitosAllPaisEmpresa);
    }
    catch (error) {
        console.error('Error al obtener el Requisito de la Empresa:', error);
        res.status(500).json({ error: 'Error al obtener Requisitos de la Empresa' });
    }
});
exports.requisitosAllPaisesEmpresas = requisitosAllPaisesEmpresas;
const requisitosdeEmpresaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empresa } = req.body; // Obtener el id_contacto de los parámetros de consulta
    try {
        // Buscar los requisitos asociados al id_tipo_requisito
        const requisitos = yield Tipo_requisito_models_1.Tipo_Requisito.findAll({
            where: {
                id_empresa: id_empresa // Filtrar por id_tipo_requisito
            },
            include: [
                {
                    model: empresas_model_1.Empresas,
                    as: 'empresas'
                },
                {
                    model: paises_models_1.Paises,
                    as: 'paises' // Incluir la relación con la tabla de países
                }
            ],
        });
        res.json(requisitos); // Enviar los teléfonos encontrados como respuesta
    }
    catch (error) {
        console.error('Error al obtener los teléfonos del contacto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.requisitosdeEmpresaPorId = requisitosdeEmpresaPorId;
