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
exports.getOnePaises = exports.getAllPaises = void 0;
const paises_models_1 = require("../../models/negocio/paises-models");
//Obtiene todos los objetos de la base de datos
const getAllPaises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paises = yield paises_models_1.Paises.findAll();
    res.json(paises);
});
exports.getAllPaises = getAllPaises;
//Obtiene todos los objetos de la base de datos
const getOnePaises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pais } = req.body;
    const paises = yield paises_models_1.Paises.findOne({ where: { pais: pais } });
    res.json(paises);
});
exports.getOnePaises = getOnePaises;
