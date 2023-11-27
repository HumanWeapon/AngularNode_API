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
exports.updatePregunta = exports.deletePregunta = exports.postPregunta = exports.getPregunta = exports.getAllPreguntas = void 0;
const preguntas_model_1 = require("../models/preguntas-model");
// Obtiene todas las preguntas de la base de datos
const getAllPreguntas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _pregunta = yield preguntas_model_1.Preguntas.findAll();
        res.json(_pregunta);
    }
    catch (error) {
        console.error('Error al obtener todas las preguntas de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getAllPreguntas = getAllPreguntas;
// Obtiene una pregunta de la base de datos
const getPregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_pregunta } = req.body;
        const _pregunta = yield preguntas_model_1.Preguntas.findOne({
            where: { id_pregunta: id_pregunta }
        });
        if (_pregunta) {
            res.json(_pregunta);
        }
        else {
            res.status(404).json({
                msg: `El ID de la pregunta no existe: ${id_pregunta}`
            });
        }
    }
    catch (error) {
        console.error('Error al obtener una pregunta de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getPregunta = getPregunta;
// Inserta una pregunta en la base de datos
const postPregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pregunta, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
        const _Pregunta = yield preguntas_model_1.Preguntas.findOne({
            where: { pregunta: pregunta }
        });
        if (_Pregunta) {
            return res.status(400).json({
                msg: 'Pregunta ya registrada en la base de datos: ' + pregunta
            });
        }
        else {
            yield preguntas_model_1.Preguntas.create({
                pregunta: pregunta,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            });
            res.json({
                msg: 'La pregunta: ' + pregunta + ' ha sido creada exitosamente',
            });
        }
    }
    catch (error) {
        console.error('Error al insertar una pregunta en la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.postPregunta = postPregunta;
// Elimina la pregunta de la base de datos
const deletePregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_pregunta } = req.body;
        const _pregunta = yield preguntas_model_1.Preguntas.findOne({
            where: { id_pregunta: id_pregunta }
        });
        if (!_pregunta) {
            return res.status(404).json({
                msg: 'Pregunta con el ID: ' + id_pregunta + ' no existe en la base de datos'
            });
        }
        yield _pregunta.destroy();
        res.json({
            msg: 'La pregunta con el ID: ' + id_pregunta + ' ha sido eliminada exitosamente',
        });
    }
    catch (error) {
        console.error('Error al eliminar una pregunta de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.deletePregunta = deletePregunta;
// Actualiza la pregunta de la base de datos
const updatePregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_pregunta, pregunta, modificado_por, fecha_modificacion } = req.body;
        const _pregunta = yield preguntas_model_1.Preguntas.findOne({
            where: { id_pregunta: id_pregunta }
        });
        if (!_pregunta) {
            return res.status(404).json({
                msg: 'Pregunta con el ID: ' + id_pregunta + ' no existe en la base de datos'
            });
        }
        yield _pregunta.update({
            id_pregunta: id_pregunta,
            pregunta: pregunta,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion
        });
        res.json({
            msg: 'La pregunta con el ID: ' + id_pregunta + ' ha sido actualizada exitosamente',
        });
    }
    catch (error) {
        console.error('Error al actualizar una pregunta de la base de datos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.updatePregunta = updatePregunta;
