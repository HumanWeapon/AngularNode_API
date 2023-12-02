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
exports.DeleteBitacora = exports.PostBitacora = exports.getAllBitacora = void 0;
const bitacora_model_1 = require("../models/bitacora-model");
//Obtiene todos los objetos de la base de datos
const getAllBitacora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bitacora = yield bitacora_model_1.Bitacora.findAll();
    res.json(bitacora);
});
exports.getAllBitacora = getAllBitacora;
const PostBitacora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha, id_usuario, id_objeto, accion, descripcion } = req.body;
    try {
        yield bitacora_model_1.Bitacora.create({
            fecha: fecha,
            id_usuario: id_usuario,
            id_objeto: id_objeto,
            accion: accion,
            descripcion: descripcion
        });
        res.json({
            msg: 'El evento se ha registrado exitosamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.PostBitacora = PostBitacora;
const DeleteBitacora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén todos los registros de la tabla "Bitacora"
        const bitacora = yield bitacora_model_1.Bitacora.findAll();
        // Itera sobre los registros y elimínalos uno por uno
        for (const registro of bitacora) {
            yield registro.destroy();
        }
        res.json({
            msg: 'La bitácora ha sido limpiada exitosamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contacta al administrador',
            error
        });
    }
});
exports.DeleteBitacora = DeleteBitacora;
