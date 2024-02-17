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
exports.activateCiudad = exports.inactivateCiudad = exports.updateCiudad = exports.deleteCiudad = exports.postCiudad = exports.getCiudad = exports.getAllCiudades = void 0;
const ciudades_models_1 = require("../../models/negocio/ciudades-models");
//Obtiene todos las ciudades de la base de datos
const getAllCiudades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _ciudades = yield ciudades_models_1.Ciudades.findAll();
    res.json(_ciudades);
});
exports.getAllCiudades = getAllCiudades;
//Obtiene una ciudad de la base de datos     
const getCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciudad } = req.body;
    const _ciudad = yield ciudades_models_1.Ciudades.findOne({
        where: { ciudad: ciudad }
    });
    if (_ciudad) {
        res.json({ _ciudad });
    }
    else {
        res.status(404).json({
            msg: `La ciudad no existe: ${ciudad}`
        });
    }
});
exports.getCiudad = getCiudad;
//Inserta una ciudad en la base de datos
const postCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _ciudad = yield ciudades_models_1.Ciudades.findOne({
            where: { ciudad: ciudad }
        });
        if (_ciudad) {
            return res.status(400).json({
                msg: 'Ciudad ya registrada en la base de datos: ' + ciudad
            });
        }
        else {
            const newCuidad = yield ciudades_models_1.Ciudades.create({
                ciudad: ciudad,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json(newCuidad);
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
exports.postCiudad = postCiudad;
//Elimina una ciudad de la base de datos
const deleteCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ciudad } = req.body;
    try {
        const _ciudad = yield ciudades_models_1.Ciudades.findOne({
            where: { id_ciudad: id_ciudad }
        });
        if (_ciudad) {
            yield _ciudad.destroy();
            res.json(_ciudad);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró una ciudad con el ID ' + id_ciudad,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el Ciudad:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Ciudad',
        });
    }
});
exports.deleteCiudad = deleteCiudad;
//actualiza la ciudad en la base de datos
const updateCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_ciudad, ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
        const _ciudad = yield ciudades_models_1.Ciudades.findOne({
            where: { id_ciudad: id_ciudad }
        });
        if (!_ciudad) {
            return res.status(404).json({
                msg: 'Ciudad con el ID: ' + id_ciudad + ' no existe en la base de datos'
            });
        }
        yield _ciudad.update({
            id_ciudad: id_ciudad,
            ciudad: ciudad,
            descripcion: descripcion,
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json(_ciudad);
    }
    catch (error) {
        console.error('Error al actualizar la ciudad:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la ciudad',
        });
    }
});
exports.updateCiudad = updateCiudad;
//Inactiva el usuario de la DBA
const inactivateCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ciudad } = req.body;
        const _ciudad = yield ciudades_models_1.Ciudades.findOne({
            where: { ciudad: ciudad }
        });
        if (!ciudad) {
            return res.status(404).json({
                msg: "La Ciudad no existe: " + ciudad
            });
        }
        yield ciudad.update({
            estado: 2
        });
        res.json(_ciudad);
    }
    catch (error) {
        console.error('Error al activar el objeto:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el objeto',
        });
    }
});
exports.inactivateCiudad = inactivateCiudad;
//Activa el usuario de la DBA
const activateCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ciudad } = req.body;
        const _ciudad = yield ciudades_models_1.Ciudades.findOne({
            where: { ciudad: ciudad }
        });
        if (!ciudad) {
            return res.status(404).json({
                msg: "La Ciudad no existe: " + ciudad
            });
        }
        yield ciudad.update({
            estado: 1
        });
        res.json(_ciudad);
    }
    catch (error) {
        console.error('Error al inactivar la ciudad:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar la ciudad',
        });
    }
});
exports.activateCiudad = activateCiudad;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
