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
exports.activateContacto = exports.inactivateContacto = exports.updateContacto = exports.deleteContacto = exports.postContacto = exports.getContacto = exports.getAllContactosconTipoContacto = exports.getAllContactos = void 0;
const contacto_models_1 = require("../../models/negocio/contacto-models");
const tipoContacto_models_1 = require("../../models/negocio/tipoContacto-models");
//Obtiene todos las ciudades de la base de datos
const getAllContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _contacto = yield contacto_models_1.Contacto.findAll();
    res.json(_contacto);
});
exports.getAllContactos = getAllContactos;
//Obtiene todos las contactos con el tipo de contacto de la base de datos
const getAllContactosconTipoContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _contacto = yield contacto_models_1.Contacto.findAll({
            include: {
                model: tipoContacto_models_1.TipoContacto,
                as: 'tipo_contacto',
                where: {
                    estado: 1
                },
                attributes: ['id_tipo_contacto', 'tipo_contacto']
            }
        });
        res.json(_contacto);
    }
    catch (error) {
        console.error('Error al obtener los contactos:', error);
        res.status(500).json({
            msg: 'Hubo un error al obtener los contactos'
        });
    }
});
exports.getAllContactosconTipoContacto = getAllContactosconTipoContacto;
//Obtiene un contacto de la base de datos     
const getContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.body;
    try {
        const _contacto = yield contacto_models_1.Contacto.findAll({
            where: { dni: dni }
        });
        if (_contacto) {
            res.json(_contacto);
        }
        else {
            res.status(404).json({
                msg: `El contacto con el RTN:${dni} no existe`
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
exports.getContacto = getContacto;
//Inserta un contacto en la base de datos
const postContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_tipo_contacto, id_empresa, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        // Crea el contacto
        const contac = yield contacto_models_1.Contacto.create({
            id_tipo_contacto: id_tipo_contacto,
            id_empresa: id_empresa,
            primer_nombre: primer_nombre.toUpperCase(),
            segundo_nombre: segundo_nombre.toUpperCase(),
            primer_apellido: primer_apellido.toUpperCase(),
            segundo_apellido: segundo_apellido.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        // Consulta el contacto recién creado con su tipo de contacto asociado
        const contactoConTipo = yield contacto_models_1.Contacto.findOne({
            where: { primer_nombre: contac.primer_nombre, segundo_nombre: contac.segundo_nombre, primer_apellido: contac.primer_apellido, segundo_apellido: contac.segundo_apellido },
            include: {
                model: tipoContacto_models_1.TipoContacto,
                as: 'tipo_contacto',
                where: {
                    estado: 1
                },
                attributes: ['id_tipo_contacto', 'tipo_contacto']
            }
        });
        // Devuelve el contacto con su tipo de contacto asociado en la respuesta
        res.json(contactoConTipo);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postContacto = postContacto;
//Elimina una ciudad de la base de datos
const deleteContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_contacto } = req.body;
    try {
        const _contacto = yield contacto_models_1.Contacto.findOne({
            where: { id_contacto: id_contacto }
        });
        if (_contacto) {
            yield _contacto.destroy();
            res.json(_contacto);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró el contacto con el ID ' + id_contacto,
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
exports.deleteContacto = deleteContacto;
//actualiza el contacto en la base de datos
const updateContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_contacto, id_empresa, id_tipo_contacto, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _contacto = yield contacto_models_1.Contacto.findOne({
            where: { id_contacto: id_contacto }
        });
        if (!_contacto) {
            return res.status(404).json({
                msg: 'Contacto con el ID: ' + id_contacto + ' no existe en la base de datos'
            });
        }
        yield _contacto.update({
            id_tipo_contacto: id_tipo_contacto,
            id_empresa: id_empresa,
            primer_nombre: primer_nombre.toUpperCase(),
            segundo_nombre: segundo_nombre.toUpperCase(),
            primer_apellido: primer_apellido.toUpperCase(),
            segundo_apellido: segundo_apellido.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json(_contacto);
    }
    catch (error) {
        console.error('Error al actualizar el contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el contacto',
        });
    }
});
exports.updateContacto = updateContacto;
//Inactiva el usuario de la DBA
const inactivateContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { primer_nombre } = req.body;
    try {
        const _contacto = yield contacto_models_1.Contacto.findOne({
            where: { primer_nombre: primer_nombre }
        });
        if (!_contacto) {
            return res.status(404).json({
                msg: "El Contacto no existe: " + primer_nombre
            });
        }
        yield _contacto.update({
            estado: 2
        });
        res.json(_contacto);
    }
    catch (error) {
        console.error('Error al inactivar el contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el contacto',
        });
    }
});
exports.inactivateContacto = inactivateContacto;
//Activa el usuario de la DBA
const activateContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { primer_nombre } = req.body;
    try {
        const _contacto = yield contacto_models_1.Contacto.findOne({
            where: { primer_nombre: primer_nombre }
        });
        if (!_contacto) {
            return res.status(404).json({
                msg: "El Contacto no existe: " + primer_nombre
            });
        }
        yield _contacto.update({
            estado: 1
        });
        res.json(_contacto);
    }
    catch (error) {
        console.error('Error al activar el contacto:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el contacto',
        });
    }
});
exports.activateContacto = activateContacto;
