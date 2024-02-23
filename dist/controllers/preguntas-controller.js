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
exports.activatePregunta = exports.inactivatePregunta = exports.updatePregunta = exports.deletePregunta = exports.postPregunta = exports.getPregunta = exports.getAllPreguntas = void 0;
const preguntas_model_1 = require("../models/preguntas-model");
//Obtiene todas las preguntas de la base de datos
const getAllPreguntas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _pregunta = yield preguntas_model_1.Preguntas.findAll();
    res.json(_pregunta);
});
exports.getAllPreguntas = getAllPreguntas;
//Obtiene una pregunta de la base de datos
const getPregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pregunta } = req.body;
    const _pregunta = yield preguntas_model_1.Preguntas.findOne({
        where: { id_pregunta: id_pregunta }
    });
    if (_pregunta) {
        res.json(_pregunta);
    }
    else {
        res.status(404).json({
            msg: `el ID de la pregunta no existe: ${id_pregunta}`
        });
    }
});
exports.getPregunta = getPregunta;
//Inserta una pregunta en la base de datos
const postPregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pregunta, estado_pregunta, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
    try {
        const _Pregunta = yield preguntas_model_1.Preguntas.findOne({
            where: { pregunta: pregunta }
        });
        if (_Pregunta) {
            return res.status(400).json({
                msg: 'Pregunta ya registrada en la base de datos: ' + pregunta
            });
        }
        else {
            const newQuestion = yield preguntas_model_1.Preguntas.create({
                pregunta: pregunta.toUpperCase(),
                estado_pregunta: estado_pregunta,
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion
            });
            res.json(newQuestion);
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
    /*// Generamos token
    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);*/
});
exports.postPregunta = postPregunta;
//Elimina la pregunta de la base de datos
const deletePregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pregunta } = req.body;
    try {
        const _pregunta = yield preguntas_model_1.Preguntas.findOne({
            where: { id_pregunta: id_pregunta }
        });
        if (_pregunta) {
            yield _pregunta.destroy();
            res.json(_pregunta);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró ninguna pregunta con el ID: ' + id_pregunta,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar la pregunta:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la pregunta',
        });
    }
});
exports.deletePregunta = deletePregunta;
//actualiza la pregunta de la base de datos
const updatePregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pregunta, pregunta, estado_pregunta, modificado_por, fecha_modificacion } = req.body;
    try {
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
            pregunta: pregunta.toUpperCase(),
            estado_pregunta: estado_pregunta,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion
        });
        res.json(_pregunta);
    }
    catch (error) {
        console.error('Error al actualizar la pregunta:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la pregunta',
        });
    }
});
exports.updatePregunta = updatePregunta;
//Inactiva la pregunta de la DBA
const inactivatePregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pregunta } = req.body;
    try {
        const _pregunta = yield preguntas_model_1.Preguntas.findOne({
            where: { pregunta: pregunta }
        });
        if (!_pregunta) {
            return res.status(404).json({
                msg: "La pregunta no existe: " + pregunta
            });
        }
        yield _pregunta.update({
            estado_pregunta: 2
        });
        res.json(_pregunta);
    }
    catch (error) {
        console.error('Error al Inactivar la pregunta:', error);
        res.status(500).json({
            msg: 'Hubo un error al Inactivar la pregunta',
        });
    }
});
exports.inactivatePregunta = inactivatePregunta;
//Activa la pregunta de la DBA
const activatePregunta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pregunta } = req.body;
    try {
        const _pregunta = yield preguntas_model_1.Preguntas.findOne({
            where: { pregunta: pregunta }
        });
        if (!_pregunta) {
            return res.status(404).json({
                msg: "La Pregunta no existe: " + pregunta
            });
        }
        yield _pregunta.update({
            estado_pregunta: 1
        });
        res.json(_pregunta);
    }
    catch (error) {
        console.error('Error al activar la pregunta:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar la pregunta',
        });
    }
});
exports.activatePregunta = activatePregunta;
