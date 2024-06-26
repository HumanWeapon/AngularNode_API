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
const usuario_models_1 = require("../models/usuario-models");
const objetos_models_1 = require("../models/objetos-models");
//Obtiene todos los objetos de la tabla bitácora
const getAllBitacora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bitacora = yield bitacora_model_1.Bitacora.findAll({
            attributes: ['id_bitacora', 'fecha', 'id_usuario', 'id_objeto', 'campo_original', 'nuevo_campo', 'accion',],
            include: [
                {
                    model: usuario_models_1.User,
                    attributes: ['usuario', 'nombre_usuario']
                },
                {
                    model: objetos_models_1.Objetos,
                    attributes: ['objeto']
                }
            ],
            order: [['id_bitacora', 'DESC']] // Ordenar por fecha ascendente
        });
        res.json(bitacora);
    }
    catch (error) {
        console.error('Error al obtener la bitácora:', error);
        res.status(500).json({ error: 'Error al obtener la bitácora' });
    }
});
exports.getAllBitacora = getAllBitacora;
const PostBitacora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_bitacora, fecha, id_usuario, id_objeto, accion, campo_original, nuevo_campo } = req.body;
    try {
        // Ordena los registros por fecha de forma ascendente
        const bitacora = yield bitacora_model_1.Bitacora.create({
            id_bitacora,
            fecha: fecha,
            id_usuario: id_usuario,
            id_objeto: id_objeto,
            campo_original: campo_original.toUpperCase(),
            nuevo_campo: nuevo_campo.toUpperCase(),
            accion: accion.toUpperCase(),
        }, { order: [['id_bitacora', 'DESC']] });
        res.json({
            msg: 'El evento se ha registrado exitosamente',
            bitacora: bitacora // Si deseas devolver el registro creado en la respuesta
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
