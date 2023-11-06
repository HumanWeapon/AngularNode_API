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
    const paises = yield paises_models_1.Paises.findAll();
    res.json(paises);
});
exports.getAllPaises = getAllPaises;
//Obtiene un Pais por ID
const getPais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pais } = req.body;
    const _pais = yield paises_models_1.Paises.findOne({
        where: { id_pais: id_pais }
    });
    if (_pais) {
        res.json(_pais);
    }
    else {
        res.status(404).json({
            msg: `el ID del Pais no existe: ${id_pais}`
        });
    }
});
exports.getPais = getPais;
// Inserta una nueva Empresa en la base de datos
const postPais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _pais = yield paises_models_1.Paises.findOne({
            where: { pais: pais }
        });
        yield paises_models_1.Paises.create({
            pais: pais,
            descripcion: descripcion,
            creado_por: creado_por,
            fecha_creacion: Date.now(),
            modificado_por: modificado_por,
            fecha_modificacion: Date.now(),
            estado: estado
        });
        res.json({
            msg: 'El Pais: ' + pais + ' ha sido creado exitosamente',
        });
        //hola
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postPais = postPais;
// Elimina el Pais de la base de datos
const deletePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pais } = req.body; // Obtén el ID desde los parámetros de la URL
    try {
        const _pais = yield paises_models_1.Paises.findOne({
            where: { id_pais: id_pais }
        });
        if (_pais) {
            yield _pais.destroy();
            res.json({
                msg: 'El Pais con el ID: ' + id_pais + ' ha sido eliminado exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un Pais con el ID ' + id_pais,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el Pais:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el Pais',
        });
    }
});
exports.deletePais = deletePais;
//actualiza el Telefono en la base de datos
const updatePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pais, pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    const _pais = yield paises_models_1.Paises.findOne({
        where: { id_pais: id_pais }
    });
    if (!_pais) {
        return res.status(404).json({
            msg: 'Pais con el ID: ' + id_pais + ' no existe en la base de datos'
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
        estado: estado
    });
    res.json({
        msg: 'El Pais con el ID: ' + id_pais + ' ha sido actualizado exitosamente',
    });
});
exports.updatePais = updatePais;
//Inactiva el usuario de la DBA
const inactivatePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pais } = req.body;
    const paises = yield paises_models_1.Paises.findOne({
        where: { pais: pais }
    });
    if (!paises) {
        return res.status(404).json({
            msg: "El Pais no existe: " + pais
        });
    }
    yield paises.update({
        estado: 2
    });
    res.json({
        msg: 'Pais: ' + pais + ' inactivado exitosamente',
    });
});
exports.inactivatePais = inactivatePais;
//Activa el usuario de la DBA
const activatePais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pais } = req.body;
    const paises = yield paises_models_1.Paises.findOne({
        where: { pais: pais }
    });
    if (!paises) {
        return res.status(404).json({
            msg: "El Pais no existe: " + pais
        });
    }
    yield paises.update({
        estado: 1
    });
    res.json({
        msg: 'Pais: ' + pais + ' ha sido activado exitosamente',
    });
});
exports.activatePais = activatePais;
