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
exports.activateEmpresa = exports.inactivateEmpresa = exports.updateEmpresa = exports.deleteEmpresa = exports.postEmpresa = exports.getEmpresa = exports.getEmpresasPymes = exports.getAllEmpresas = void 0;
const empresas_model_1 = require("../../models/negocio/empresas-model");
const tipoEmpresa_models_1 = require("../../models/negocio/tipoEmpresa-models");
// Obtiene todas las Empresas con el tipo de empresa
const getAllEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empresas = yield empresas_model_1.Empresas.findAll({
            include: {
                model: tipoEmpresa_models_1.tipoEmpresa,
                as: 'tipoEmpresa' // Usar el alias definido en la asociación
            }
        });
        res.json(empresas);
    }
    catch (error) {
        // Manejo de errores
        console.error('Error al obtener todas las empresas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getAllEmpresas = getAllEmpresas;
//Obtiene todas las Empresas pyme o exportadoreas
const getEmpresasPymes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_empresa } = req.body;
    try {
        const empresa = yield empresas_model_1.Empresas.findAll({
            where: { id_tipo_empresa: id_tipo_empresa }
        });
        res.json(empresa);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getEmpresasPymes = getEmpresasPymes;
//Obtiene una Empresa por ID
const getEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empresa } = req.body;
    try {
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
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
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
        if (_empresa) {
            return res.status(400).json({
                msg: 'Empresa ya registrada en la base de datos: ' + nombre_empresa
            });
        }
        else {
            const empresa = yield empresas_model_1.Empresas.create({
                id_tipo_empresa: id_tipo_empresa,
                nombre_empresa: nombre_empresa.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            //res.json(empresa)
            const empresas = yield empresas_model_1.Empresas.findOne({
                where: { nombre_empresa: empresa.nombre_empresa },
                include: {
                    model: tipoEmpresa_models_1.tipoEmpresa,
                    as: 'tipoEmpresa' // Usar el alias definido en la asociación
                }
            });
            res.json(empresas);
        }
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
            res.json(_empresa);
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
    try {
        const _empresa = yield empresas_model_1.Empresas.findOne({
            where: { id_empresa: id_empresa }
        });
        if (!_empresa) {
            return res.status(404).json({
                msg: 'Empresa con el ID: ' + id_empresa + ' no existe en la base de datos'
            });
        }
        else {
            const empresa = yield _empresa.update({
                id_empresa: id_empresa,
                id_tipo_empresa: id_tipo_empresa,
                nombre_empresa: nombre_empresa.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            const empresas = yield empresas_model_1.Empresas.findOne({
                where: { id_empresa: empresa.id_empresa },
                include: {
                    model: tipoEmpresa_models_1.tipoEmpresa,
                    as: 'tipoEmpresa' // Usar el alias definido en la asociación
                }
            });
            res.json(empresas);
        }
    }
    catch (error) {
        console.error('Error al actualizar la empresa:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la empresa',
        });
    }
});
exports.updateEmpresa = updateEmpresa;
//Inactiva la empresa
const inactivateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empresa } = req.body;
    try {
        const empresa = yield empresas_model_1.Empresas.findOne({
            where: { id_empresa: id_empresa }
        });
        if (!empresa) {
            return res.status(404).json({
                msg: "La Empresa no existe"
            });
        }
        yield empresa.update({
            estado: 2
        });
        res.json(empresa);
    }
    catch (error) {
        console.error('Error al inactivar la empresa:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar la empresa',
        });
    }
});
exports.inactivateEmpresa = inactivateEmpresa;
//Activa la empresa
const activateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empresa } = req.body;
    try {
        const empresa = yield empresas_model_1.Empresas.findOne({
            where: { id_empresa: id_empresa }
        });
        if (!empresa) {
            return res.status(404).json({
                msg: "La Empresa no existe"
            });
        }
        yield empresa.update({
            estado: 1
        });
        res.json('Empresa activada');
    }
    catch (error) {
        console.error('Error al activar la empres:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar la empresa',
        });
    }
});
exports.activateEmpresa = activateEmpresa;
