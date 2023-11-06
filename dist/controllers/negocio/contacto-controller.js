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
exports.updateContacto = exports.deleteContacto = exports.postContacto = exports.getContacto = exports.getAllContactos = void 0;
const contacto_models_1 = require("../../models/negocio/contacto-models");
//Obtiene todos las ciudades de la base de datos
const getAllContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _contacto = yield contacto_models_1.Contacto.findAll();
    res.json(_contacto);
});
exports.getAllContactos = getAllContactos;
//Obtiene un contacto de la base de datos     
const getContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contacto } = req.body;
    const _contacto = yield contacto_models_1.Contacto.findOne({
        where: { contacto: contacto }
    });
    if (_contacto) {
        res.json({ _contacto });
    }
    else {
        res.status(404).json({
            msg: `El contacto no existe: ${contacto}`
        });
    }
});
exports.getContacto = getContacto;
//Inserta un contacto en la base de datos
const postContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _contacto = yield contacto_models_1.Contacto.findOne({
            where: { dni: dni }
        });
        if (_contacto) {
            return res.status(400).json({
                msg: 'DNI ya registrada en la base de datos: ' + dni
            });
        }
        else {
            const contac = yield contacto_models_1.Contacto.create({
                dni: dni,
                primer_nombre: primer_nombre,
                segundo_nombre: segundo_nombre,
                primer_apellido: primer_apellido,
                segundo_apellido: segundo_apellido,
                correo: correo,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json(contac);
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
    const { id_contacto, id_tipo_contacto, dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    const _contacto = yield contacto_models_1.Contacto.findOne({
        where: { id_contacto: id_contacto }
    });
    if (!_contacto) {
        return res.status(404).json({
            msg: 'Contacto con el ID: ' + id_contacto + ' no existe en la base de datos'
        });
    }
    yield _contacto.update({
        id_contacto: id_contacto,
        id_tipo_contacto: id_tipo_contacto,
        dni: dni,
        primer_nombre: primer_nombre,
        segundo_nombre: segundo_nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        correo: correo,
        descripcion: descripcion,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'El contacto con el ID: ' + id_contacto + ' ha sido actualizado exitosamente',
    });
});
exports.updateContacto = updateContacto;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
