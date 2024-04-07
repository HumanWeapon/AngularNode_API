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
exports.activateHistorialB = exports.inactivateHistorialB = exports.updateHistorialB = exports.deleteHistorialB = exports.postHistorialB = exports.getHistorialB = exports.getAllHistorialB = void 0;
const historial_busqueda_1 = require("../../models/negocio/historial_busqueda");
//Obtiene todos los registros de la base de datos
const getAllHistorialB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const HistB = yield historial_busqueda_1.Historial_Busqueda.findAll();
        res.json(HistB);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getAllHistorialB = getAllHistorialB;
//Obtiene un historial por ID
const getHistorialB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_historial } = req.body;
    try {
        const _HistB = yield historial_busqueda_1.Historial_Busqueda.findAll({
            where: { id_historial: id_historial }
        });
        if (_HistB) {
            res.json(_HistB);
        }
        else {
            res.status(404).json({
                msg: `el ID del Pais no existe: ${id_historial}`
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
exports.getHistorialB = getHistorialB;
// Inserta una nuevo registro en la base de datos
const postHistorialB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_historial, id_pyme, id_producto, id_pais, id_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _HistB = yield historial_busqueda_1.Historial_Busqueda.findOne({
            where: { id_historial: id_historial },
        });
        if (_HistB) {
            return res.status(400).json({
                msg: 'Registro ya existe en la base de datos: ' + id_historial
            });
        }
        else {
            const HistB = yield historial_busqueda_1.Historial_Busqueda.create({
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: Date.now(),
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: Date.now(),
                estado: estado
            });
            return res.json(HistB);
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postHistorialB = postHistorialB;
// Elimina el Pais de la base de datos
const deleteHistorialB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_historial } = req.body; // Obtén el ID desde los parámetros de la URL
    try {
        const _HistB = yield historial_busqueda_1.Historial_Busqueda.findOne({
            where: { id_historial: id_historial }
        });
        if (_HistB) {
            yield _HistB.destroy();
            res.json(_HistB);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró registro con el ID ' + id_historial,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el registro',
        });
    }
});
exports.deleteHistorialB = deleteHistorialB;
//actualiza el Telefono en la base de datos
const updateHistorialB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_historial, id_pyme, id_producto, id_pais, id_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _HistB = yield historial_busqueda_1.Historial_Busqueda.findOne({
            where: { id_historial: id_historial }
        });
        if (!_HistB) {
            return res.status(404).json({
                msg: 'Registro con el ID: ' + id_historial + ' no existe en la base de datos'
            });
        }
        yield _HistB.update({
            id_pyme: id_pyme,
            id_producto: id_producto,
            id_pais: id_pais,
            id_empresa: id_empresa,
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json(_HistB);
    }
    catch (error) {
        console.error('Error al actualizar el registro:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el registro',
        });
    }
});
exports.updateHistorialB = updateHistorialB;
//Inactiva el registro de la DBA
const inactivateHistorialB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_historial } = req.body;
    try {
        const HistB = yield historial_busqueda_1.Historial_Busqueda.findOne({
            where: { id_historial: id_historial }
        });
        if (!HistB) {
            return res.status(404).json({
                msg: "El registro no existe: " + id_historial
            });
        }
        yield HistB.update({
            estado: 2
        });
        res.json(HistB);
    }
    catch (error) {
        console.error('Error al inactivar el registro:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el registro',
        });
    }
});
exports.inactivateHistorialB = inactivateHistorialB;
//Activa el registro  de la DBA
const activateHistorialB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_historial } = req.body;
    try {
        const HistB = yield historial_busqueda_1.Historial_Busqueda.findOne({
            where: { id_historial: id_historial }
        });
        if (!HistB) {
            return res.status(404).json({
                msg: "El registro no existe: " + id_historial
            });
        }
        yield HistB.update({
            estado: 1
        });
        res.json(HistB);
    }
    catch (error) {
        console.error('Error al activar el registro:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el registro',
        });
    }
});
exports.activateHistorialB = activateHistorialB;
