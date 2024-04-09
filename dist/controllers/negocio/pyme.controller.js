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
exports.getOnePyme = exports.getRolPyme = exports.pymesAllTipoEmpresa = exports.activatePyme = exports.inactivatePyme = exports.updatePyme = exports.deletePyme = exports.postPyme = exports.getPyme = exports.getAllPymes = exports.loginPyme = void 0;
const pyme_models_1 = require("../../models/negocio/pyme-models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tipoEmpresa_models_1 = require("../../models/negocio/tipoEmpresa-models");
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_1 = require("sequelize");
const loginPyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_pyme, rtn } = req.body;
    try {
        // Busca la pyme en la base de datos
        const pyme = yield pyme_models_1.Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });
        if (!pyme) {
            return res.status(400).json({
                msg: 'Pyme no encontrada.'
            });
        }
        // Compara el RTN proporcionado con el almacenado en la base de datos
        if (pyme.rtn !== rtn) {
            return res.status(400).json({
                msg: 'RTN inválido.',
                requestData: req.body
            });
        }
        // Si el RTN coincide, verifica el estado de la pyme
        if (pyme.estado !== 1) {
            return res.status(400).json({
                msg: 'Pyme inactiva.'
            });
        }
        // Genera el token de autenticación
        const token = jsonwebtoken_1.default.sign({
            pyme: pyme
        }, process.env.SECERT_KEY || 'Lamers005*');
        res.json(token);
    }
    catch (error) {
        console.error('Error en loginPyme:', error);
        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: error.message
            });
        }
        else {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: 'Error desconocido'
            });
        }
    }
});
exports.loginPyme = loginPyme;
//Obtiene todas las Pymes
const getAllPymes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pyme = yield pyme_models_1.Pyme.findAll();
    res.json(pyme);
});
exports.getAllPymes = getAllPymes;
//Obtiene una Pyme por ID
const getPyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_pyme } = req.body;
        const _pyme = yield pyme_models_1.Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });
        if (_pyme) {
            res.json(_pyme);
        }
        else {
            res.status(404).json({
                msg: `No Existe La Pyme: ${nombre_pyme}`
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
exports.getPyme = getPyme;
// Inserta una nueva Pyme en la base de datos
const postPyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_pyme, rtn, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, fecha_ultima_conexion, id_rol, nombre_contacto, correo_contacto, telefono_contacto } = req.body;
    try {
        const _pyme = yield pyme_models_1.Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });
        const newPyme = yield pyme_models_1.Pyme.create({
            nombre_pyme: nombre_pyme.toUpperCase(),
            rtn: rtn,
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: Date.now(),
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: Date.now(),
            estado: estado,
            fecha_ultima_conexion: Date.now(),
            id_rol: id_rol,
            nombre_contacto: nombre_contacto.toUpperCase(),
            correo_contacto: correo_contacto.toUpperCase(),
            telefono_contacto: telefono_contacto
        });
        res.json(newPyme);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postPyme = postPyme;
// Elimina la Pyme de la base de datos
const deletePyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pyme } = req.body; // Obtén el ID desde los parámetros de la URL
    try {
        const _pyme = yield pyme_models_1.Pyme.findOne({
            where: { id_pyme: id_pyme }
        });
        if (_pyme) {
            yield _pyme.destroy();
            res.json(_pyme);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró una Pyme con el ID ' + id_pyme,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar la Pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Pyme',
        });
    }
});
exports.deletePyme = deletePyme;
//actualiza el Telefono en la base de datos
const updatePyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_pyme, nombre_pyme, rtn, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, fecha_ultima_conexion, nombre_contacto, correo_contacto, telefono_contacto } = req.body;
        const _pyme = yield pyme_models_1.Pyme.findOne({
            where: { id_pyme: id_pyme }
        });
        if (!_pyme) {
            return res.status(404).json({
                msg: 'Pyme con el ID: ' + id_pyme + ' no existe en la base de datos'
            });
        }
        yield _pyme.update({
            id_pyme: id_pyme,
            nombre_pyme: nombre_pyme.toUpperCase(),
            rtn: rtn,
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado,
            fecha_ultima_conexion: fecha_ultima_conexion,
            nombre_contacto: nombre_contacto.toUpperCase(),
            correo_contacto: correo_contacto.toUpperCase(),
            telefono_contacto: telefono_contacto
        });
        res.json(_pyme);
    }
    catch (error) {
        console.error('Error al actualizar la pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la pyme',
        });
    }
});
exports.updatePyme = updatePyme;
//Inactiva el la pyme de la DBA
const inactivatePyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_pyme } = req.body;
        const _pymes = yield pyme_models_1.Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });
        if (!_pymes) {
            return res.status(404).json({
                msg: "La Pyme no existe: " + nombre_pyme
            });
        }
        yield _pymes.update({
            estado: 2
        });
        res.json(_pymes);
    }
    catch (error) {
        console.error('Error al inactivar la pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al inactivar la pyme',
        });
    }
});
exports.inactivatePyme = inactivatePyme;
//Activa la pyme de la DBA
const activatePyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_pyme } = req.body;
        const _pyme = yield pyme_models_1.Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });
        if (!_pyme) {
            return res.status(404).json({
                msg: "La Pyme no existe: " + nombre_pyme
            });
        }
        yield _pyme.update({
            estado: 1
        });
        res.json(_pyme);
    }
    catch (error) {
        console.error('Error al activar la pyme:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar la pyme',
        });
    }
});
exports.activatePyme = activatePyme;
const pymesAllTipoEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pyme = yield pyme_models_1.Pyme.findAll({
            include: [
                {
                    model: tipoEmpresa_models_1.tipoEmpresa,
                    as: 'tipoEmpresa' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        res.json(pyme);
    }
    catch (error) {
        console.error('Error al obtener preguntas de usuario:', error);
        res.status(500).json({ error: 'Error al obtener preguntas de usuario' });
    }
});
exports.pymesAllTipoEmpresa = pymesAllTipoEmpresa;
//Obtiene el id del rol PYME
const getRolPyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT id_rol, rol FROM mipyme.tbl_ms_roles
        WHERE ROL = 'PYME'
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results[0]);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getRolPyme = getRolPyme;
// Obtiene una  pyme por el nombre de la pyme
const getOnePyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id; // Obtener el ID de la dirección de los parámetros de la solicitud
    try {
        const query = `
            SELECT *
            FROM mipyme.tbl_me_pyme
            WHERE nombre_pyme = ?
        `;
        const results = yield connection_1.default.query(query, {
            replacements: [id],
            type: sequelize_1.QueryTypes.SELECT
        });
        if (results.length === 0) {
            return res.status(404).json({ msg: 'No se encontró ninguna PYME con ese nombre' });
        }
        res.json(results[0]); // Devuelve solo el primer resultado
    }
    catch (error) {
        console.error('Error al obtener la PYME:', error);
        res.status(500).json({ msg: 'Error al obtener la PYME' });
    }
});
exports.getOnePyme = getOnePyme;
