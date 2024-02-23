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
exports.activateDirecContactos = exports.inactivateDirecContactos = exports.updateDirecContactos = exports.deleteDirecContactos = exports.postDirecContactos = exports.getDirecContactos = exports.getAllDirecContactos = void 0;
const direccionesContacto_model_1 = require("../../models/negocio/direccionesContacto-model");
//Obtiene todas las Empresas
const getAllDirecContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _direcontactos = yield direccionesContacto_model_1.DireccionesContactos.findAll();
    res.json(_direcontactos);
});
exports.getAllDirecContactos = getAllDirecContactos;
//Obtiene una Empresa por ID
const getDirecContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_contacto } = req.body;
    try {
        const _direcontactos = yield direccionesContacto_model_1.DireccionesContactos.findAll({
            where: { id_contacto: id_contacto }
        });
        if (_direcontactos) {
            res.json(_direcontactos);
        }
        else {
            res.status(404).json({
                msg: `el ID de la Direccion Contacto no existe: ${id_contacto}`
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
exports.getDirecContactos = getDirecContactos;
// Inserta una nueva Empresa en la base de datos
const postDirecContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_contacto, id_tipo_direccion, direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _direcontactos = yield direccionesContacto_model_1.DireccionesContactos.findOne({
            where: { direccion: direccion }
        });
        if (_direcontactos) {
            return res.status(400).json({
                msg: 'Direccion Contacto ya registrada en la base de datos: ' + direccion
            });
        }
        else {
            const _direcontactos = yield direccionesContacto_model_1.DireccionesContactos.create({
                id_contacto: id_contacto,
                id_tipo_direccion: id_tipo_direccion,
                direccion: direccion.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json(_direcontactos);
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postDirecContactos = postDirecContactos;
// Elimina la Pyme de la base de datos
const deleteDirecContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_direccion } = req.body; // Obtén el ID desde los parámetros de la URL
    try {
        const _direcontactos = yield direccionesContacto_model_1.DireccionesContactos.findOne({
            where: { id_direccion: id_direccion }
        });
        if (_direcontactos) {
            yield _direcontactos.destroy();
            res.json(_direcontactos);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró una Direccion Contacto con el ID ' + id_direccion,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar la Direccion Contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Direccion Contacto',
        });
    }
});
exports.deleteDirecContactos = deleteDirecContactos;
//actualiza el Telefono en la base de datos
const updateDirecContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_direccion, id_contacto, id_tipo_direccion, direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _direcontactos = yield direccionesContacto_model_1.DireccionesContactos.findOne({
            where: { id_direccion: id_direccion }
        });
        if (!_direcontactos) {
            return res.status(404).json({
                msg: 'Direccion Contacto con el ID: ' + id_direccion + ' no existe en la base de datos'
            });
        }
        else {
            const direcontactos = yield _direcontactos.update({
                id_direccion: id_direccion,
                id_contacto: id_contacto,
                id_tipo_direccion: id_tipo_direccion,
                direccion: direccion.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json(direcontactos);
        }
    }
    catch (error) {
        console.error('Error al actualizar la direccion del contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la direccion del contacto',
        });
    }
});
exports.updateDirecContactos = updateDirecContactos;
//Inactiva el usuario de la DBA
const inactivateDirecContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { direccion } = req.body;
    try {
        const _direcontactos = yield direccionesContacto_model_1.DireccionesContactos.findOne({
            where: { direccion: direccion }
        });
        if (!_direcontactos) {
            return res.status(404).json({
                msg: "La Direccion Contacto no existe: " + direccion
            });
        }
        yield _direcontactos.update({
            estado: 2
        });
        res.json(_direcontactos);
    }
    catch (error) {
        console.error('Error al inactivar la direccion del contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar la direccion del contacto',
        });
    }
});
exports.inactivateDirecContactos = inactivateDirecContactos;
//Activa el usuario de la DBA
const activateDirecContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { direccion } = req.body;
    try {
        const _direcontactos = yield direccionesContacto_model_1.DireccionesContactos.findOne({
            where: { direccion: direccion }
        });
        if (!_direcontactos) {
            return res.status(404).json({
                msg: "La Direccion Contacto no existe: " + direccion
            });
        }
        yield _direcontactos.update({
            estado: 1
        });
        res.json(_direcontactos);
    }
    catch (error) {
        console.error('Error al activar la direccion del contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar la direccion del contacto',
        });
    }
});
exports.activateDirecContactos = activateDirecContactos;
