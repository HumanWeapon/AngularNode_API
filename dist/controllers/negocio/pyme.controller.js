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
exports.updatePyme = exports.deletePyme = exports.postPyme = exports.getPyme = exports.getAllPymes = void 0;
const pyme_models_1 = require("../../models/negocio/pyme-models");
//Obtiene todas las Pymes
const getAllPymes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pyme = yield pyme_models_1.Pyme.findAll();
    res.json(pyme);
});
exports.getAllPymes = getAllPymes;
//Obtiene una Pyme por ID
const getPyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pyme } = req.body;
    const _pyme = yield pyme_models_1.Pyme.findOne({
        where: { id_pyme: id_pyme }
    });
    if (_pyme) {
        res.json(_pyme);
    }
    else {
        res.status(404).json({
            msg: `el ID de la pregunta no existe: ${id_pyme}`
        });
    }
});
exports.getPyme = getPyme;
// Inserta una nueva Pyme en la base de datos
const postPyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _pyme = yield pyme_models_1.Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });
        yield pyme_models_1.Pyme.create({
            id_tipo_empresa: id_tipo_empresa,
            nombre_pyme: nombre_pyme,
            categoria: categoria,
            descripcion: descripcion,
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json({
            msg: 'La Pyme: ' + nombre_pyme + ' ha sido creada exitosamente',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postPyme = postPyme;
// Elimina la Pyme de la base de datos
const deletePyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pyme } = req.body; // Obtén el ID desde los parámetros de la URL
    try {
        const _pyme = yield pyme_models_1.Pyme.findOne({
            where: { id_pyme: id_pyme }
        });
        if (_pyme) {
            yield _pyme.destroy();
            res.json({
                msg: 'La Pyme con el ID: ' + id_pyme + ' ha sido eliminado exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró una Pyme con el ID ' + id_pyme,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar la Pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Pyme',
        });
    }
});
exports.deletePyme = deletePyme;
//actualiza el Telefono en la base de datos
const updatePyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pyme, nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    const _pyme = yield pyme_models_1.Pyme.findOne({
        where: { id_pyme: id_pyme }
    });
    if (!_pyme) {
        return res.status(404).json({
            msg: 'Pyme con el ID: ' + id_pyme + ' no existe en la base de datos'
        });
    }
    yield _pyme.update({
        id_pyme: id_pyme,
        nombre_pyme: nombre_pyme,
        id_tipo_empresa: id_tipo_empresa,
        categoria: categoria,
        descripcion: descripcion,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'La Pyme con el ID: ' + id_pyme + ' ha sido actualizado exitosamente',
    });
});
exports.updatePyme = updatePyme;
