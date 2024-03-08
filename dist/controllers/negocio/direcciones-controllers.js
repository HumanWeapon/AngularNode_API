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
exports.getdirecciones = void 0;
const direccionesContacto_model_1 = require("../../models/negocio/direccionesContacto-model");
//Obtiene todas las Empresas
const getdirecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _direcontactos = yield direccionesContacto_model_1.Direcciones.findAll();
        res.json(_direcontactos);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getdirecciones = getdirecciones;
