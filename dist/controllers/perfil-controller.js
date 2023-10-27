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
exports.getUsuarioPerfil = void 0;
const perfil_models_1 = require("../models/perfil-models");
const getUsuarioPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario } = req.body;
        const userperfil = yield perfil_models_1.UserPerfil.findOne({
            where: { usuario: usuario }
        });
        if (userperfil) {
            res.status(200).json(userperfil);
        }
        else {
            res.status(404).json({ message: 'Perfil no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil' });
    }
});
exports.getUsuarioPerfil = getUsuarioPerfil;
