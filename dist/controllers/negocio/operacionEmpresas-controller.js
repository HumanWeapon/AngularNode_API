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
exports.getOpEmpresa = exports.getAllOpEmpresas = void 0;
const operacionEmpresas_models_1 = require("../../models/negocio/operacionEmpresas-models");
const paises_models_1 = require("../../models/negocio/paises-models");
const contacto_models_1 = require("../../models/negocio/contacto-models");
const empresas_model_1 = require("../../models/negocio/empresas-model");
// Obtiene todas las Empresas
const getAllOpEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const opempresas = yield operacionEmpresas_models_1.operacionEmpresas.findAll({
            include: [
                { model: empresas_model_1.Empresas, as: 'empresa' },
                { model: paises_models_1.Paises, as: 'paises' },
                { model: contacto_models_1.Contacto, as: 'contacto' },
            ],
        });
        res.json(opempresas);
    }
    catch (error) {
        console.error('Error al obtener todas las Operaciones de Empresas:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
});
exports.getAllOpEmpresas = getAllOpEmpresas;
// Obtiene una Empresa por ID con información adicional de las tablas relacionadas
const getOpEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_operacion_empresas } = req.body;
        // Realiza la consulta con la información adicional de las tablas relacionadas
        const _opempresa = yield operacionEmpresas_models_1.operacionEmpresas.findOne({
            where: { id_operacion_empresas: id_operacion_empresas },
            include: [
                { model: empresas_model_1.Empresas, as: 'empresa' },
                { model: paises_models_1.Paises, as: 'paises' },
                { model: contacto_models_1.Contacto, as: 'contacto' },
            ],
        });
        if (_opempresa) {
            res.json(_opempresa);
        }
        else {
            res.status(404).json({
                msg: `El ID de la Operacion Empresa no existe: ${id_operacion_empresas}`,
            });
        }
    }
    catch (error) {
        console.error('Error al obtener la Operacion Empresa por ID:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
});
exports.getOpEmpresa = getOpEmpresa;
