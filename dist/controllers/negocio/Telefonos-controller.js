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
exports.getcontactosActivos = exports.telefonosdeContactosPorId = exports.telefonosAllContactosPaises = exports.telefonosAllContactos = exports.activateContactoTelefono = exports.inactivateContactoTelefono = exports.updateContactoTelefono = exports.deleteContactoTelefono = exports.postContactoTelefono = exports.getContactoTelefono = exports.getAllContactosTelefono = void 0;
const telefonos_models_1 = require("../../models/negocio/telefonos-models");
const connection_1 = __importDefault(require("../../db/connection"));
const contacto_models_1 = require("../../models/negocio/contacto-models");
const paises_models_1 = require("../../models/negocio/paises-models");
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
    const { id_contacto, id_pais, telefono, cod_area, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
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
                id_pais: id_pais,
                telefono: telefono,
                cod_area: cod_area,
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
                    TELEFONOS.cod_area, 
                    TELEFONOS.descripcion, 
                    TELEFONOS.creado_por, 
                    TELEFONOS.fecha_creacion, 
                    TELEFONOS.modificado_por, 
                    TELEFONOS.fecha_modificacion, 
                    TELEFONOS.estado, 
                    TELEFONOS.id_contacto,
                    TELEFONOS.id_pais
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
    const { id_telefono, id_contacto, id_pais, telefono, cod_area, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
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
            id_pais: id_pais,
            telefono: telefono,
            cod_area: cod_area,
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
        });
        res.json(_contactoT);
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
// Realiza una consulta INNER JOIN entre las tablas Usuario y Roles
const telefonosAllContactos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telefono = yield telefonos_models_1.ContactoTelefono.findAll({
            include: [
                {
                    model: contacto_models_1.Contacto,
                    as: 'contacto' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        res.json(telefono);
    }
    catch (error) {
        console.error('Error al obtener el telefono del contacto:', error);
        res.status(500).json({ error: 'Error al obtener telefonos del Contacto' });
    }
});
exports.telefonosAllContactos = telefonosAllContactos;
const telefonosAllContactosPaises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const telefonosConContactosYPaises = yield telefonos_models_1.ContactoTelefono.findAll({
            include: [
                {
                    model: contacto_models_1.Contacto,
                    as: 'contacto'
                },
                {
                    model: paises_models_1.Paises,
                    as: 'paises' // Usa el mismo alias que en la definición de la asociación en el modelo
                }
            ],
        });
        res.json(telefonosConContactosYPaises);
    }
    catch (error) {
        console.error('Error al obtener el teléfono del contacto:', error);
        res.status(500).json({ error: 'Error al obtener teléfonos del Contacto' });
    }
});
exports.telefonosAllContactosPaises = telefonosAllContactosPaises;
/*export const telefonosconcontacto = async (req: Request, res: Response) => {
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
            TELEFONOS.id_contacto,
            TELEFONOS.id_pais
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
        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar telefonos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};*/
const telefonosdeContactosPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_contacto } = req.body; // Obtener el id_contacto de los parámetros de consulta
    try {
        // Buscar los teléfonos asociados al id_contacto
        const telefonos = yield telefonos_models_1.ContactoTelefono.findAll({
            where: {
                id_contacto: id_contacto // Filtrar por id_contacto
            },
            include: [
                {
                    model: contacto_models_1.Contacto,
                    as: 'contacto'
                },
                {
                    model: paises_models_1.Paises,
                    as: 'paises' // Incluir la relación con la tabla de países
                }
            ],
        });
        res.json(telefonos); // Enviar los teléfonos encontrados como respuesta
    }
    catch (error) {
        console.error('Error al obtener los teléfonos del contacto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.telefonosdeContactosPorId = telefonosdeContactosPorId;
/*export const telefonosdeContactosPorId = async (req: Request, res: Response) => {
    const { id_contacto } = req.params;
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
            TELEFONOS.id_contacto,
            TELEFONOS.id_pais
        FROM mipyme.tbl_me_telefonos AS TELEFONOS
        LEFT JOIN
            (
                SELECT id_contacto, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, estado
                FROM mipyme.tbl_me_contactos
                WHERE estado = 1
            ) AS CONTACTOS
        ON
        TELEFONOS.id_contacto = CONTACTOS.id_contacto
        WHERE TELEFONOS.id_contacto = ${id_contacto}
            AND TELEFONOS.estado = 1
        `;

        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar telefonos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};*/
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
