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
exports.activatePais = exports.inactivatePais = exports.updatePais = exports.deletePais = exports.postPais = exports.getPais = exports.getAllPaises = void 0;
const paises_models_1 = require("../../models/negocio/paises-models");
//Obtiene todos los objetos de la base de datos
const getAllPaises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paises = yield paises_models_1.Paises.findAll();
        res.json(paises);
    }
    catch (error) {
        console.error('Error al obtener todos los Países:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getAllPaises = getAllPaises;
//Obtiene un Pais por ID
const getPais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_pais } = req.body;
        const _pais = yield paises_models_1.Paises.findAll({
            where: { id_pais: id_pais }
        });
        if (_pais) {
            res.json(_pais);
        }
        else {
            res.status(404).json({
                msg: `El ID del País no existe: ${id_pais}`,
            });
        }
    }
    catch (error) {
        console.error('Error al obtener el País por ID:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
});
exports.getPais = getPais;
// Inserta una nueva Empresa en la base de datos
const postPais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
        const _pais = yield paises_models_1.Paises.findOne({
            where: { pais: pais }
        });
        if (_pais) {
            return res.status(400).json({
                msg: 'País ya registrado en la base de datos: ' + pais,
            });
        }
        else {
            const paises = yield paises_models_1.Paises.create({
                pais: pais,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: Date.now(),
                modificado_por: modificado_por,
                fecha_modificacion: Date.now(),
                estado: estado,
            });
            res.json(paises);
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error,
        });
    }
});
exports.postPais = postPais;
// Elimina el Pais de la base de datos
const deletePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_pais } = req.body; // Obtén el ID desde los parámetros de la URL
        const _pais = yield paises_models_1.Paises.findOne({
            where: { id_pais: id_pais }
        });
        if (_pais) {
            yield _pais.destroy();
            res.json({
                msg: 'El País con el ID: ' + id_pais + ' ha sido eliminado exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un País con el ID ' + id_pais,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el País:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el País',
            error,
        });
    }
});
exports.deletePais = deletePais;
//actualiza el Telefono en la base de datos
const updatePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_pais, pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
        const _pais = yield paises_models_1.Paises.findOne({
            where: { id_pais: id_pais }
        });
        if (!_pais) {
            return res.status(404).json({
                msg: 'País con el ID: ' + id_pais + ' no existe en la base de datos',
            });
        }
        yield _pais.update({
            id_pais: id_pais,
            pais: pais,
            descripcion: descripcion,
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion,
            estado: estado,
        });
        res.json({
            msg: 'El País con el ID: ' + id_pais + ' ha sido actualizado exitosamente',
        });
    }
    catch (error) {
        console.error('Error al actualizar el País:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el País',
            error,
        });
    }
});
exports.updatePais = updatePais;
//Inactiva el usuario de la DBA
const inactivatePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pais } = req.body;
        const paises = yield paises_models_1.Paises.findOne({
            where: { pais: pais }
        });
        if (!paises) {
            return res.status(404).json({
                msg: 'El País no existe: ' + pais,
            });
        }
        yield paises.update({
            estado: 2,
        });
        res.json({
            msg: 'País: ' + pais + ' inactivado exitosamente',
        });
    }
    catch (error) {
        console.error('Error al inactivar el País:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el País',
            error,
        });
    }
});
exports.inactivatePais = inactivatePais;
//Activa el usuario de la DBA
const activatePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pais } = req.body;
        const paises = yield paises_models_1.Paises.findOne({
            where: { pais: pais }
        });
        if (!paises) {
            return res.status(404).json({
                msg: 'El País no existe: ' + pais,
            });
        }
        yield paises.update({
            estado: 1,
        });
        res.json({
            msg: 'País: ' + pais + ' ha sido activado exitosamente',
        });
    }
    catch (error) {
        console.error('Error al activar el País:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el País',
            error,
        });
    }
});
exports.activatePais = activatePais;
