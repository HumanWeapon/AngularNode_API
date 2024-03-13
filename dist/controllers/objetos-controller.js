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
exports.objetosJSON = exports.getAllObjetosMenu = exports.activateObjeto = exports.inactivateObjecto = exports.updateObjetos = exports.deleteObjeto = exports.postObjeto = exports.getObjeto = exports.getAllObjetos = void 0;
const objetos_models_1 = require("../models/objetos-models");
const connection_1 = __importDefault(require("../db/connection"));
//Obtiene todos los objetos de la base de datos
const getAllObjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _objetos = yield objetos_models_1.Objetos.findAll();
    res.json(_objetos);
});
exports.getAllObjetos = getAllObjetos;
//Obtiene un objeto de la base de datos     
const getObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { objeto } = req.body;
    try {
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { objeto: objeto }
        });
        if (_objeto) {
            res.json({ _objeto });
        }
        else {
            res.status(404).json({
                msg: `el  objeto no existe: ${objeto}`
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
exports.getObjeto = getObjeto;
//Inserta un objeto en la base de datos
const postObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { objeto, descripcion, tipo_objeto, url, icono, creado_por, modificado_por, fecha_modificacion, fecha_creacion, estado_objeto } = req.body;
    try {
        const _objeto = yield objetos_models_1.Objetos.findOne({ where: { objeto: objeto } });
        if (_objeto) {
            return res.status(400).json({
                msg: 'Objeto ya registrado en la base de datos: ' + objeto
            });
        }
        else {
            const nuevoObjeto = yield objetos_models_1.Objetos.create({
                objeto: objeto.toUpperCase(),
                tipo_objeto: tipo_objeto.toUpperCase(),
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                url: null,
                icono: null,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado_objeto: estado_objeto
            });
            return res.status(200).json({
                msg: 'Objeto creado exitosamente',
                objeto: nuevoObjeto // Devuelve el nuevo objeto creado
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Contactate con el administrador',
            error: error
        });
    }
});
exports.postObjeto = postObjeto;
//Elimina un objeto de la base de datos
const deleteObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_objeto } = req.body;
    try {
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { id_objeto: id_objeto }
        });
        if (_objeto) {
            yield _objeto.destroy();
            res.json(_objeto);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un objeto con el ID ' + id_objeto,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el parámetro',
        });
    }
});
exports.deleteObjeto = deleteObjeto;
//actualiza el objeto en la base de datos
const updateObjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_objeto, objeto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
    try {
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { id_objeto: id_objeto }
        });
        if (!_objeto) {
            return res.status(404).json({
                msg: 'Objeto con el ID: ' + id_objeto + ' no existe en la base de datos'
            });
        }
        yield _objeto.update({
            id_objeto: id_objeto,
            objeto: objeto,
            descripcion: descripcion,
            tipo_objeto: tipo_objeto,
            creado_por: creado_por,
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por,
            fecha_modificacion: fecha_modificacion
        });
        res.json(_objeto);
    }
    catch (error) {
        console.error('Error al actualizar el objeto:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el objeto',
        });
    }
});
exports.updateObjetos = updateObjetos;
//Inactiva el OBJ de la DBA
const inactivateObjecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { objeto } = req.body;
    try {
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { objeto: objeto }
        });
        if (!_objeto) {
            return res.status(404).json({
                msg: "El Objeto no existe: " + objeto
            });
        }
        yield _objeto.update({
            estado_objeto: 2
        });
        res.json(_objeto);
    }
    catch (error) {
        console.error('Error al activar el objeto:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el objeto',
        });
    }
});
exports.inactivateObjecto = inactivateObjecto;
//Activa el usuario de la DBA
const activateObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { objeto } = req.body;
    try {
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { objeto: objeto }
        });
        if (!_objeto) {
            return res.status(404).json({
                msg: "El Objeto no existe: " + objeto
            });
        }
        yield _objeto.update({
            estado_objeto: 1
        });
        res.json(_objeto);
    }
    catch (error) {
        console.error('Error al inactivar el objeto:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el objeto',
        });
    }
});
exports.activateObjeto = activateObjeto;
//Obtiene un objeto de la base de datos     
const getAllObjetosMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo_objeto, estado_objeto } = req.body;
    try {
        const _objeto = yield objetos_models_1.Objetos.findAll({
            where: { tipo_objeto: tipo_objeto, estado_objeto: estado_objeto }
        });
        if (_objeto) {
            res.json(_objeto);
        }
        else {
            res.status(404).json({
                msg: `el  objeto no existe: ${_objeto}`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.getAllObjetosMenu = getAllObjetosMenu;
const objetosJSON = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            json_agg(json_build_object(
                'objeto', objeto,
                'atributes', (
                    SELECT json_agg(json_build_object(
                        'id_objeto', id_objeto,
                        'descripcion', descripcion,
                        'tipo_objeto', tipo_objeto,
                        'url', url,
                        'icono', icono,
                        'creado_por', creado_por,
                        'fecha_creacion', fecha_creacion,
                        'modificado_por', modificado_por,
                        'fecha_modificacion', fecha_modificacion,
                        'estado_objeto', estado_objeto
                    ))
                    FROM mipyme.tbl_ms_objetos as sub
                    WHERE sub.objeto = main.objeto
                )
            )) AS resultado
        FROM 
            mipyme.tbl_ms_objetos as main
        WHERE estado_objeto = 1
            AND tipo_objeto = 'MANTENIMIENTO'
        GROUP BY 
            objeto
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        console.error('Error al consultar productos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.objetosJSON = objetosJSON;
