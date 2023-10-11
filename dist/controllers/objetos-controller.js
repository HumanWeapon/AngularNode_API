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
exports.updateObjetos = exports.deleteObjeto = exports.postObjeto = exports.getObjeto = exports.getAllObjetos = void 0;
const objetos_models_1 = require("../models/objetos-models");
//Obtiene todos los objetos de la base de datos
const getAllObjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _objetos = yield objetos_models_1.Objetos.findAll();
    res.json(_objetos);
});
exports.getAllObjetos = getAllObjetos;
//Obtiene un objeto de la base de datos
const getObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { objeto } = req.body;
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
});
exports.getObjeto = getObjeto;
//Inserta un objeto en la base de datos
const postObjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { objeto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
    try {
        const _objeto = yield objetos_models_1.Objetos.findOne({
            where: { objeto: objeto }
        });
        if (_objeto) {
            return res.status(400).json({
                msg: 'Objeto ya registrado en la base de datos: ' + objeto
            });
        }
        else {
            yield objetos_models_1.Objetos.create({
                objeto: objeto,
                descripcion: descripcion,
                tipo_objeto: tipo_objeto,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion
            });
            res.json({
                msg: 'El Objeto: ' + objeto + ' ha sido creada exitosamente',
            });
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
            res.json({
                msg: 'El objeto con el ID: ' + id_objeto + ' ha sido eliminado exitosamente',
            });
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
//actualiza el rol en la base de datos
const updateObjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_objeto, objeto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion } = req.body;
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
    res.json({
        msg: 'El Objeto con el ID: ' + id_objeto + ' ha sido actualizado exitosamente',
    });
});
exports.updateObjetos = updateObjetos;
