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
exports.getcontactosActivos = exports.telefonosdeContactosPorId = exports.telefonosconcontacto = exports.activateContactoTelefono = exports.inactivateContactoTelefono = exports.updateContactoTelefono = exports.deleteContactoTelefono = exports.postContactoTelefono = exports.getContactoTelefono = exports.getAllContactosTelefono = void 0;
const telefonos_models_1 = require("../../models/negocio/telefonos-models");
const connection_1 = __importDefault(require("../../db/connection"));
//Obtiene todos los contactos de la base de datos
const getAllContactosTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _contactoT = yield telefonos_models_1.ContactoTelefono.findAll();
        res.json(_contactoT);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getAllContactosTelefono = getAllContactosTelefono;
//Obtiene un contacto de la base de datos     
const getContactoTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_contacto } = req.body;
    try {
        const _contactoT = yield telefonos_models_1.ContactoTelefono.findAll({
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
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getContactoTelefono = getContactoTelefono;
//Inserta un contacto en la base de datos
const postContactoTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_contacto, telefono, extencion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _contactoT = yield telefonos_models_1.ContactoTelefono.findOne({
            where: { telefono: telefono }
        });
        if (_contactoT) {
            return res.status(400).json({
                msg: 'Telefono ya existe: ' + telefono
            });
        }
        else {
            const newConT = yield telefonos_models_1.ContactoTelefono.create({
                id_contacto: id_contacto,
                telefono: telefono,
                extencion: extencion,
                descripcion: descripcion.toUpperCase(),
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            const query = `
                SELECT 
                    TELEFONOS.id_telefono,
                    CONTACTOS.NOMBRE,
                    TELEFONOS.telefono,
                    TELEFONOS.extencion, 
                    TELEFONOS.descripcion, 
                    TELEFONOS.creado_por, 
                    TELEFONOS.fecha_creacion, 
                    TELEFONOS.modificado_por, 
                    TELEFONOS.fecha_modificacion, 
                    TELEFONOS.estado, 
                    TELEFONOS.id_contacto
                FROM mipyme.tbl_me_telefonos AS TELEFONOS
                LEFT JOIN 
                    (
                        SELECT id_contacto, estado, (primer_nombre||' '||segundo_nombre||' '||primer_apellido||' '||segundo_apellido) AS NOMBRE 
                        FROM mipyme.tbl_me_contactos
                        WHERE estado = 1
                    ) AS CONTACTOS
                ON TELEFONOS.id_contacto = CONTACTOS.id_contacto
                WHERE TELEFONOS.id_telefono = ${newConT.id_telefono}
            `;
            const [results, metadata] = yield connection_1.default.query(query);
            res.json(results[0]);
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postContactoTelefono = postContactoTelefono;
//Elimina una ciudad de la base de datos
const deleteContactoTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_telefono } = req.body;
    try {
        const _contactoT = yield telefonos_models_1.ContactoTelefono.findOne({
            where: { id_telefono: id_telefono }
        });
        if (_contactoT) {
            yield _contactoT.destroy();
            res.json(_contactoT);
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
    const { id_telefono, id_contacto, telefono, extencion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _contactoT = yield telefonos_models_1.ContactoTelefono.findOne({
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
            extencion: extencion,
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        const query = `
        SELECT 
            TELEFONOS.id_telefono, 
            TELEFONOS.telefono, 
            (CONTACTOS.primer_nombre||' '||CONTACTOS.segundo_nombre||' '||CONTACTOS.primer_apellido||' '||CONTACTOS.segundo_apellido) AS CONTACTO,
            TELEFONOS.extencion, 
            TELEFONOS.descripcion, 
            TELEFONOS.creado_por, 
            TELEFONOS.fecha_creacion, 
            TELEFONOS.modificado_por, 
            TELEFONOS.fecha_modificacion, 
            TELEFONOS.estado, 
            TELEFONOS.id_contacto
        FROM mipyme.tbl_me_telefonos AS TELEFONOS
        LEFT JOIN 
            (
                SELECT id_contacto, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, estado
                FROM mipyme.tbl_me_contactos
                WHERE estado = 1
            ) AS CONTACTOS
        ON 
        TELEFONOS.id_contacto = CONTACTOS.id_contacto
        WHERE TELEFONOS.id_contacto = ${_contactoT.id_contacto}
            AND TELEFONOS.estado = 1
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        console.error('Error al actualizar el contacto telefono:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el contacto telefono:',
        });
    }
});
exports.updateContactoTelefono = updateContactoTelefono;
//Inactiva el usuario de la DBA
const inactivateContactoTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { telefono } = req.body;
    try {
        const _contactoT = yield telefonos_models_1.ContactoTelefono.findOne({
            where: { telefono: telefono }
        });
        if (!_contactoT) {
            return res.status(404).json({
                msg: "El Telefono no existe: " + telefono
            });
        }
        yield _contactoT.update({
            estado: 2
        });
        res.json(_contactoT);
    }
    catch (error) {
        console.error('Error al inactivar el contacto telefono:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar el contacto telefono:',
        });
    }
});
exports.inactivateContactoTelefono = inactivateContactoTelefono;
//Activa el usuario de la DBA
const activateContactoTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { telefono } = req.body;
    try {
        const _contactoT = yield telefonos_models_1.ContactoTelefono.findOne({
            where: { telefono: telefono }
        });
        if (!_contactoT) {
            return res.status(404).json({
                msg: "El Telefono no existe: " + telefono
            });
        }
        yield _contactoT.update({
            estado: 1
        });
        res.json(_contactoT);
    }
    catch (error) {
        console.error('Error al activar el contacto telefono:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar el contacto telefono',
        });
    }
});
exports.activateContactoTelefono = activateContactoTelefono;
const telefonosconcontacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT 
            TELEFONOS.id_telefono,
            CONTACTOS.NOMBRE,
            TELEFONOS.telefono, 
            TELEFONOS.extencion, 
            TELEFONOS.descripcion, 
            TELEFONOS.creado_por, 
            TELEFONOS.fecha_creacion, 
            TELEFONOS.modificado_por, 
            TELEFONOS.fecha_modificacion, 
            TELEFONOS.estado, 
            TELEFONOS.id_contacto
        FROM mipyme.tbl_me_telefonos AS TELEFONOS
        LEFT JOIN 
            (
                SELECT id_contacto, estado, (primer_nombre||' '||segundo_nombre||' '||primer_apellido||' '||segundo_apellido) AS NOMBRE 
                FROM mipyme.tbl_me_contactos
                WHERE estado = 1
            ) AS CONTACTOS
        ON TELEFONOS.id_contacto = CONTACTOS.id_contacto
        WHERE CONTACTOS.nombre IS NOT NULL 
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        console.error('Error al consultar telefonos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.telefonosconcontacto = telefonosconcontacto;
const telefonosdeContactosPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            TELEFONOS.id_telefono, 
            TELEFONOS.telefono, 
            (CONTACTOS.primer_nombre||' '||CONTACTOS.segundo_nombre||' '||CONTACTOS.primer_apellido||' '||CONTACTOS.segundo_apellido) AS CONTACTO,
            TELEFONOS.extencion, 
            TELEFONOS.descripcion, 
            TELEFONOS.creado_por, 
            TELEFONOS.fecha_creacion, 
            TELEFONOS.modificado_por, 
            TELEFONOS.fecha_modificacion, 
            TELEFONOS.estado, 
            TELEFONOS.id_contacto
        FROM mipyme.tbl_me_telefonos AS TELEFONOS
        LEFT JOIN 
            (
                SELECT id_contacto, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, estado
                FROM mipyme.tbl_me_contactos
                WHERE estado = 1
            ) AS CONTACTOS
        ON 
        TELEFONOS.id_contacto = CONTACTOS.id_contacto
        WHERE TELEFONOS.id_contacto = ${id}
            AND TELEFONOS.estado = 1
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        console.error('Error al consultar telefonos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.telefonosdeContactosPorId = telefonosdeContactosPorId;
const getcontactosActivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT id_contacto, (primer_nombre||' '||segundo_nombre||' '||primer_apellido||' '||segundo_apellido) AS contacto 
        FROM mipyme.tbl_me_contactos
        WHERE estado = 1
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        console.error('Error al consultar contactos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.getcontactosActivos = getcontactosActivos;
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
