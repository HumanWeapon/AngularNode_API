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
exports.updateContactoTelefono = exports.deleteContactoTelefono = exports.postContactoTelefono = exports.getContactoTelefono = exports.getAllContactosTelefono = void 0;
const contactoTelefono_models_1 = require("../../models/negocio/contactoTelefono-models");
//Obtiene todos los contactos de la base de datos
const getAllContactosTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _contactoT = yield contactoTelefono_models_1.ContactoTelefono.findAll();
    res.json(_contactoT);
});
exports.getAllContactosTelefono = getAllContactosTelefono;
//Obtiene un contacto de la base de datos     
const getContactoTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_contacto } = req.body;
    const _contactoT = yield contactoTelefono_models_1.ContactoTelefono.findAll({
        where: { id_contacto: id_contacto }
    });
    if (_contactoT) {
        res.json(_contactoT);
    }
    else {
        res.status(404).json({
            msg: `No existen datos: ${id_contacto}`
        });
    }
});
exports.getContactoTelefono = getContactoTelefono;
//Inserta un contacto en la base de datos
const postContactoTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_contacto, id_tipo_telefono, telefono, extencion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _contactoT = yield contactoTelefono_models_1.ContactoTelefono.findOne({
            where: { telefono: telefono }
        });
        if (_contactoT) {
            return res.status(400).json({
                msg: 'Telefono ya registrado en la base de datos: ' + telefono
            });
        }
        else {
            yield contactoTelefono_models_1.ContactoTelefono.create({
                id_contacto: id_contacto,
                id_tipo_telefono: id_tipo_telefono,
                telefono: telefono,
                extencion: extencion,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json({
                msg: 'El telefono: ' + telefono + ' ha sido creado exitosamente',
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
exports.postContactoTelefono = postContactoTelefono;
//Elimina una ciudad de la base de datos
const deleteContactoTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_telefono } = req.body;
    try {
        const _contactoT = yield contactoTelefono_models_1.ContactoTelefono.findOne({
            where: { id_telefono: id_telefono }
        });
        if (_contactoT) {
            yield _contactoT.destroy();
            res.json({
                msg: 'El telefono con el ID: ' + id_telefono + ' ha sido eliminado exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró un telefono con el ID ' + id_telefono,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el telefono:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el telefono',
        });
    }
});
exports.deleteContactoTelefono = deleteContactoTelefono;
//actualiza el telefono en la base de datos
const updateContactoTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_telefono, id_contacto, id_tipo_telefono, telefono, extencion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    const _contactoT = yield contactoTelefono_models_1.ContactoTelefono.findOne({
        where: { id_telefono: id_telefono }
    });
    if (!_contactoT) {
        return res.status(404).json({
            msg: 'Telefono con el ID: ' + id_telefono + ' no existe en la base de datos'
        });
    }
    yield _contactoT.update({
        id_telefono: id_telefono,
        id_contacto: id_contacto,
        id_tipo_telefono: id_tipo_telefono,
        extencion: extencion,
        descripcion: descripcion,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'El telefono con el ID: ' + id_telefono + ' ha sido actualizado exitosamente',
    });
});
exports.updateContactoTelefono = updateContactoTelefono;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
