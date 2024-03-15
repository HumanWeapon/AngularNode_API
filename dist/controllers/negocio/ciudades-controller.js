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
exports.getCiudades = exports.activateCiudad = exports.inactivateCiudad = exports.updateCiudad = exports.deleteCiudad = exports.ciudadesAllPaises = exports.postCiudad = exports.getCiudad = exports.getAllCiudades = void 0;
const ciudades_models_1 = require("../../models/negocio/ciudades-models");
const paises_models_1 = require("../../models/negocio/paises-models");
// Obtiene todas las ciudades de la base de datos
const getAllCiudades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _ciudades = yield ciudades_models_1.Ciudades.findAll({
            include: {
                model: paises_models_1.Paises,
                as: 'pais' // El alias para referenciar al país en los resultados
            }
        });
        res.json(_ciudades);
    }
    catch (error) {
        // Manejo de errores
        console.error('Error al obtener las ciudades:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getAllCiudades = getAllCiudades;
//Obtiene una ciudad de la base de datos     
const getCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciudad } = req.body;
    try {
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
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getCiudad = getCiudad;
//Inserta una ciudad en la base de datos
const postCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ciudad, id_pais, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
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
                ciudad: ciudad.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                id_pais: id_pais,
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
});
exports.postCiudad = postCiudad;
// Realiza una consulta INNER JOIN entre las tablas Usuario y Roles
const ciudadesAllPaises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ciudad = yield ciudades_models_1.Ciudades.findAll({
            include: [
                {
                    model: paises_models_1.Paises,
                    as: 'pais' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        res.json(ciudad);
    }
    catch (error) {
        console.error('Error al obtener Ciudades de Paises', error);
        res.status(500).json({ error: 'Error al obtener preguntas de usuario' });
    }
});
exports.ciudadesAllPaises = ciudadesAllPaises;
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
    const { id_ciudad, ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_pais } = req.body;
    try {
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
            ciudad: ciudad.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado,
            id_pais: id_pais
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
    const { id_ciudad, ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_pais } = req.body;
    try {
        const _ciudad = yield ciudades_models_1.Ciudades.findOne({
            where: { ciudad: ciudad }
        });
        if (!ciudad) {
            return res.status(404).json({
                msg: "La Ciudad no existe: " + ciudad
            });
        }
        yield _ciudad.update({
            estado: 2
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
exports.inactivateCiudad = inactivateCiudad;
//Activa el usuario de la DBA
const activateCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ciudad, ciudad, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_pais } = req.body;
    try {
        const _ciudad = yield ciudades_models_1.Ciudades.findOne({
            where: { ciudad: ciudad }
        });
        if (!ciudad) {
            return res.status(404).json({
                msg: "La Ciudad no existe: " + ciudad
            });
        }
        yield _ciudad.update({
            estado: 1
        });
        res.json(_ciudad);
    }
    catch (error) {
        console.error('Error al activar la ciudad:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar la ciudad',
        });
    }
});
exports.activateCiudad = activateCiudad;
//Obtiene todos las ciudades de la base de datos
const getCiudades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _ciudades = yield ciudades_models_1.Ciudades.findAll();
    res.json(_ciudades);
});
exports.getCiudades = getCiudades;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
