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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activatePreguntaUsuario = exports.inactivatePreguntaUsuario = exports.preguntasRespuestas = exports.validarRespuestas = exports.updatePreguntaUsuario = exports.postPreguntaUsuario = exports.getPreguntasusuario = exports.getAllPreguntasUsuario = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const preguntas_usuario_model_1 = require("../models/preguntas_usuario-model");
const preguntas_model_1 = require("../models/preguntas-model");
const app = (0, express_1.default)();
//Obtiene todas las preguntas de los usuarios en la base de datos
const getAllPreguntasUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _pregunta = yield preguntas_usuario_model_1.PreguntasUsuario.findAll();
    res.json({ _pregunta });
});
exports.getAllPreguntasUsuario = getAllPreguntasUsuario;
//Obtiene todas las preguntas de un usuario
const getPreguntasusuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.body;
    try {
        const _pregunta = yield preguntas_usuario_model_1.PreguntasUsuario.findAll({
            where: { id_usuario: id_usuario }
        });
        if (_pregunta) {
            res.json(_pregunta);
        }
        else {
            res.status(404).json({
                msg: `No existen preguntas para este usuario`
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPreguntasusuario = getPreguntasusuario;
//Inserta una respuesta en la base de datos
const postPreguntaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pregunta, id_usuario, respuesta, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
    const hashedresponse = yield bcrypt_1.default.hash(respuesta, 10);
    try {
        const _pregunta = yield preguntas_usuario_model_1.PreguntasUsuario.findAndCountAll({
            where: { id_usuario: id_usuario }
        });
        if (_pregunta.count >= 3) {
            return res.status(400).json({
                msg: 'Has alcanzado el límite de preguntas para el usuario con el ID: ' + id_usuario
            });
        }
        else {
            const _respuesta = yield preguntas_usuario_model_1.PreguntasUsuario.findOne({
                where: { id_usuario: id_usuario, id_pregunta: id_pregunta }
            });
            if (_respuesta) {
                return res.status(400).json({
                    msg: 'Ya has registrado esta pregunta previamente con el ID: ' + id_pregunta
                });
            }
            else {
                yield preguntas_usuario_model_1.PreguntasUsuario.create({
                    id_pregunta: id_pregunta,
                    id_usuario: id_usuario,
                    respuesta: hashedresponse,
                    creado_por: creado_por,
                    fecha_creacion: fecha_creacion,
                    modificado_por: modificado_por,
                    fecha_modificacion: fecha_modificacion
                });
                res.json({
                    msg: 'La respuesta para la pregunta con ID: ' + id_pregunta + ' ha sido registrada exitosamente',
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postPreguntaUsuario = postPreguntaUsuario;
//Actualiza una pregunta en la base de datos
const updatePreguntaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pregunta, id_usuario, respuesta, modificado_por, fecha_modificacion } = req.body;
    const hashedresponse = yield bcrypt_1.default.hash(respuesta, 10);
    try {
        const _respuesta = yield preguntas_usuario_model_1.PreguntasUsuario.findOne({
            where: { id_usuario: id_usuario, id_pregunta: id_pregunta }
        });
        if (_respuesta) {
            yield _respuesta.update({
                id_pregunta: id_pregunta,
                id_usuario: id_usuario,
                respuesta: hashedresponse,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            });
            res.json({
                msg: 'La respuesta para la pregunta con ID: ' + id_pregunta + ' ha sido actualizada exitosamente',
            });
        }
        else {
            return res.status(400).json({
                msg: 'El usuario no tiene registrada la pregunta con el ID: ' + id_pregunta
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.updatePreguntaUsuario = updatePreguntaUsuario;
const validarRespuestas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_preguntas_usuario, respuesta } = req.body;
    //Validar si el usuario existe en la base de datos
    const preguntaUsuario = yield preguntas_usuario_model_1.PreguntasUsuario.findOne({
        where: { id_preguntas_usuario: id_preguntas_usuario }
    });
    try {
        if (!preguntaUsuario) {
            return res.status(400).json({
                msg: 'No existen preguntas para el usuario'
            });
        }
        //Validamos Preguntas
        // Compara la pregunta proporcionada con la almacenada en la base de datos
        const respuestaValid = yield bcrypt_1.default.compare(respuesta, preguntaUsuario.respuesta);
        if (!respuestaValid) {
            return res.status(400).json({
                msg: 'Respuesta incorrecta',
            });
        }
        res.json(respuestaValid);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
});
exports.validarRespuestas = validarRespuestas;
// Realiza una consulta INNER JOIN entre las tablas Preguntas_Usuario y Preguntas
const preguntasRespuestas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario } = req.body;
        const preguntasUsuario = yield preguntas_usuario_model_1.PreguntasUsuario.findAll({
            where: { id_usuario: id_usuario },
            include: [
                {
                    model: preguntas_model_1.Preguntas,
                    as: 'pregunta' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        res.json(preguntasUsuario);
    }
    catch (error) {
        console.error('Error al obtener preguntas de usuario:', error);
        res.status(500).json({ error: 'Error al obtener preguntas de usuario' });
    }
});
exports.preguntasRespuestas = preguntasRespuestas;
//Inactiva la pregunta de la DBA
const inactivatePreguntaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pregunta } = req.body;
    const _pregunta = yield preguntas_model_1.Preguntas.findOne({
        where: { pregunta: pregunta }
    });
    if (!_pregunta) {
        return res.status(404).json({
            msg: "La pregunta no existe: " + pregunta
        });
    }
    yield _pregunta.update({
        estado: 2
    });
    res.json({
        msg: 'Pregunta: ' + pregunta + ' inactivado exitosamente',
    });
});
exports.inactivatePreguntaUsuario = inactivatePreguntaUsuario;
//Activa la pregunta de la DBA
const activatePreguntaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pregunta } = req.body;
    const _pregunta = yield preguntas_model_1.Preguntas.findOne({
        where: { pregunta: pregunta }
    });
    if (!_pregunta) {
        return res.status(404).json({
            msg: "La Pregunta no existe: " + pregunta
        });
    }
    yield _pregunta.update({
        estado: 1
    });
    res.json({
        msg: 'Pregunta: ' + pregunta + ' ha sido activado exitosamente',
    });
});
exports.activatePreguntaUsuario = activatePreguntaUsuario;
