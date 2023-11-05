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
//Obtiene todas las Empresas
const getAllOpEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const opempresa = yield operacionEmpresas_models_1.operacionEmpresas.findAll();
    res.json(opempresa);
});
exports.getAllOpEmpresas = getAllOpEmpresas;
//Obtiene una Empresa por ID
const getOpEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_operacion_empresas } = req.body;
    const _opempresa = yield operacionEmpresas_models_1.operacionEmpresas.findOne({
        where: { id_operacion_empresas: id_operacion_empresas }
    });
    if (_opempresa) {
        res.json(_opempresa);
    }
    else {
        res.status(404).json({
            msg: `el ID de la Operacion Empresa no existe: ${id_operacion_empresas}`
        });
    }
});
exports.getOpEmpresa = getOpEmpresa;
