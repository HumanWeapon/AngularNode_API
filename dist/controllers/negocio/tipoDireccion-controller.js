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
exports.getTipoDirecciones = exports.activateTipoDireccion = exports.inactivateTipoDireccion = exports.updateTipoDireccion = exports.deleteTipoDireccion = exports.postTipoDireccion = exports.getTipoDireccion = exports.getAllTipoDirecciones = void 0;
const tipoDireccion_models_1 = require("../../models/negocio/tipoDireccion-models");
const connection_1 = __importDefault(require("../../db/connection"));
//Obtiene todos las direcciones de la base de datos
const getAllTipoDirecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _direc = yield tipoDireccion_models_1.TipoDireccion.findAll();
    res.json(_direc);
});
exports.getAllTipoDirecciones = getAllTipoDirecciones;
//Obtiene una direccion de la base de datos     
const getTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_direccion } = req.body;
    try {
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });
        if (_direc) {
            res.json({ _direc });
        }
        else {
            res.status(404).json({
                msg: `La dirección no existe: ${tipo_direccion}`
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
exports.getTipoDireccion = getTipoDireccion;
//Inserta una direccion en la base de datos
const postTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });
        if (_direc) {
            return res.status(400).json({
                msg: 'Dirección ya registrada en la base de datos: ' + tipo_direccion
            });
        }
        else {
            const newTD = yield tipoDireccion_models_1.TipoDireccion.create({
                tipo_direccion: tipo_direccion,
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json(newTD);
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
exports.postTipoDireccion = postTipoDireccion;
//Elimina una direccion de la base de datos
const deleteTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_direccion } = req.body;
    try {
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { id_tipo_direccion: id_tipo_direccion }
        });
        if (_direc) {
            yield _direc.destroy();
            res.json(_direc);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró una dirección con el ID ' + id_tipo_direccion,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el dirección:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la dirección',
        });
    }
});
exports.deleteTipoDireccion = deleteTipoDireccion;
//actualiza la dirección en la base de datos
const updateTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_direccion, tipo_direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { id_tipo_direccion: id_tipo_direccion }
        });
        if (!_direc) {
            return res.status(404).json({
                msg: 'dirección con el ID: ' + id_tipo_direccion + ' no existe en la base de datos'
            });
        }
        yield _direc.update({
            id_tipo_direccion: id_tipo_direccion,
            tipo_direccion: tipo_direccion,
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json(_direc);
    }
    catch (error) {
        console.error('Error al actualizar el tipo direccion:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el tipo direccion',
        });
    }
});
exports.updateTipoDireccion = updateTipoDireccion;
//Inactiva el usuario de la DBA
const inactivateTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_direccion } = req.body;
    try {
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });
        if (!_direc) {
            return res.status(404).json({
                msg: "El tipo de Direccion no existe: " + tipo_direccion
            });
        }
        yield _direc.update({
            estado: 2
        });
        res.json(_direc);
    }
    catch (error) {
        console.error('Error al inactivar el tipo de direccion:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el tipo de direccion',
        });
    }
});
exports.inactivateTipoDireccion = inactivateTipoDireccion;
//Activa el usuario de la DBA
const activateTipoDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_direccion } = req.body;
    try {
        const _direc = yield tipoDireccion_models_1.TipoDireccion.findOne({
            where: { tipo_direccion: tipo_direccion }
        });
        if (!_direc) {
            return res.status(404).json({
                msg: "El tipo de Direccion no existe: " + tipo_direccion
            });
        }
        yield _direc.update({
            estado: 1
        });
        res.json(_direc);
    }
    catch (error) {
        console.error('Error al activar el tipo direccion:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el tipo direccion',
        });
    }
});
exports.activateTipoDireccion = activateTipoDireccion;
//Obtiene todas las ciudades activas
const getTipoDirecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT id_tipo_direccion, tipo_direccion FROM mipyme.tbl_me_tipo_direccion
        WHERE estado = 1
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getTipoDirecciones = getTipoDirecciones;
