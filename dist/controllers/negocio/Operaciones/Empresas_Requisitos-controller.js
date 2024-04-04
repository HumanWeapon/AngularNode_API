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
exports.requisitosdeEmpresaPorId = void 0;
const Tipo_requisito_models_1 = require("../../../models/negocio/Tipo_requisito-models");
const empresas_model_1 = require("../../../models/negocio/empresas-model");
const paises_models_1 = require("../../../models/negocio/paises-models");
const requisitosdeEmpresaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_requisito } = req.body; // Obtener el id_contacto de los parámetros de consulta
    try {
        // Buscar los teléfonos asociados al id_contacto
        const requisitos = yield Tipo_requisito_models_1.Tipo_Requisito.findAll({
            where: {
                id_tipo_requisito: id_tipo_requisito // Filtrar por id_tipo_requisito
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
