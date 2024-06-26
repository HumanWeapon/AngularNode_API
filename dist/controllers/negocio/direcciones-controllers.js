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
exports.putDireccion = exports.postDireccion = exports.activateDireccion = exports.inactivateDirecion = exports.getDireccionesEmpresaporActivasID = exports.getDireccionesEmpresaporID = exports.getCiudades = exports.getTipoDirecciones = exports.getdirecciones = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const direccionesContacto_model_1 = require("../../models/negocio/direccionesContacto-model");
const sequelize_1 = require("sequelize");
//Obtiene las direcciones
const getdirecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT 
            DIRECCIONES.id_direccion,
            DIRECCIONES.direccion,
            DIRECCIONES.id_tipo_direccion,
            TIPO_DIRECCION.tipo_direccion,
            DIRECCIONES.id_ciudad,
            CIUDAD.ciudad,
            DIRECCIONES.id_pais, 
            PAIS.pais,
            DIRECCIONES.id_empresa,
            EMPRESA.nombre_empresa,
            DIRECCIONES.descripcion,
            DIRECCIONES.creado_por,
            DIRECCIONES.fecha_creacion,
            DIRECCIONES.modificado_por,
            DIRECCIONES.fecha_modificacion,
            DIRECCIONES.estado
        FROM mipyme.tbl_me_direcciones AS DIRECCIONES
        LEFT JOIN 
            (
                SELECT id_ciudad, ciudad
                FROM mipyme.tbl_me_ciudades
            ) AS CIUDAD
        ON DIRECCIONES.id_ciudad = CIUDAD.id_ciudad
        LEFT JOIN 
            (
                SELECT id_pais , pais
                FROM mipyme.tbl_me_paises
            ) AS PAIS
        ON DIRECCIONES.id_pais = PAIS.id_pais
        LEFT JOIN 
            (
                SELECT id_tipo_direccion, tipo_direccion 
                FROM mipyme.tbl_me_tipo_direccion
                WHERE estado = 1
            ) AS TIPO_DIRECCION
        ON DIRECCIONES.id_tipo_direccion = TIPO_DIRECCION.id_tipo_direccion
        LEFT JOIN 
            (
                SELECT id_empresa, nombre_empresa
                FROM mipyme.tbl_me_empresas
            ) AS EMPRESA
        ON DIRECCIONES.id_empresa = EMPRESA.id_empresa
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getdirecciones = getdirecciones;
//Obtiene todos los tipo de dirección activos
const getTipoDirecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT id_tipo_direccion, tipo_direccion 
		FROM mipyme.tbl_me_tipo_direccion
		WHERE estado = 1
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getTipoDirecciones = getTipoDirecciones;
//Obtiene todas las ciudades activas
const getCiudades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT A.id_ciudad, (B.pais||' | '||A.ciudad) AS CIUDAD
        FROM mipyme.tbl_me_ciudades as A
        LEFT JOIN 
            (
                SELECT id_pais , pais
                FROM mipyme.tbl_me_paises
            ) AS B
        ON A.id_pais = B.id_pais
        WHERE A.estado = 1
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getCiudades = getCiudades;
//Obtiene las direcciones asociadas a la empresa por ID muestra activas e inactivas
const getDireccionesEmpresaporID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            DIRECCIONES.id_direccion,
            DIRECCIONES.direccion,
            DIRECCIONES.id_tipo_direccion,
            TIPO_DIRECCION.tipo_direccion,
            DIRECCIONES.id_ciudad,
            CIUDAD.ciudad,
            DIRECCIONES.id_pais, 
            PAIS.pais,
            DIRECCIONES.descripcion,
            DIRECCIONES.creado_por,
            DIRECCIONES.fecha_creacion,
            DIRECCIONES.modificado_por,
            DIRECCIONES.fecha_modificacion,
            DIRECCIONES.estado
        FROM mipyme.tbl_me_direcciones AS DIRECCIONES
        LEFT JOIN 
            (
                SELECT id_ciudad, ciudad
                FROM mipyme.tbl_me_ciudades
            ) AS CIUDAD
        ON DIRECCIONES.id_ciudad = CIUDAD.id_ciudad
        LEFT JOIN 
            (
                SELECT id_pais , pais
                FROM mipyme.tbl_me_paises
            ) AS PAIS
        ON DIRECCIONES.id_pais = PAIS.id_pais
        LEFT JOIN 
            (
                SELECT id_tipo_direccion, tipo_direccion 
                FROM mipyme.tbl_me_tipo_direccion
            ) AS TIPO_DIRECCION
        ON DIRECCIONES.id_tipo_direccion = TIPO_DIRECCION.id_tipo_direccion
        WHERE DIRECCIONES.id_empresa = ${id}
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getDireccionesEmpresaporID = getDireccionesEmpresaporID;
//Obtiene las direcciones activas asociadas a la empresa por ID
const getDireccionesEmpresaporActivasID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            DIRECCIONES.id_direccion,
            DIRECCIONES.direccion,
            DIRECCIONES.id_tipo_direccion,
            TIPO_DIRECCION.tipo_direccion,
            DIRECCIONES.id_ciudad,
            CIUDAD.ciudad,
            DIRECCIONES.id_pais, 
            PAIS.pais,
            DIRECCIONES.descripcion,
            DIRECCIONES.creado_por,
            DIRECCIONES.fecha_creacion,
            DIRECCIONES.modificado_por,
            DIRECCIONES.fecha_modificacion,
            DIRECCIONES.estado
        FROM mipyme.tbl_me_direcciones AS DIRECCIONES
        LEFT JOIN 
            (
                SELECT id_ciudad, ciudad
                FROM mipyme.tbl_me_ciudades
            ) AS CIUDAD
        ON DIRECCIONES.id_ciudad = CIUDAD.id_ciudad
        LEFT JOIN 
            (
                SELECT id_pais , pais
                FROM mipyme.tbl_me_paises
            ) AS PAIS
        ON DIRECCIONES.id_pais = PAIS.id_pais
        LEFT JOIN 
            (
                SELECT id_tipo_direccion, tipo_direccion 
                FROM mipyme.tbl_me_tipo_direccion
            ) AS TIPO_DIRECCION
        ON DIRECCIONES.id_tipo_direccion = TIPO_DIRECCION.id_tipo_direccion
        WHERE DIRECCIONES.id_empresa = ${id}
            AND DIRECCIONES.estado = 1
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getDireccionesEmpresaporActivasID = getDireccionesEmpresaporActivasID;
//Inactiva la direccion de la DBA
const inactivateDirecion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_direccion } = req.body;
    try {
        const _direc = yield direccionesContacto_model_1.Direcciones.findOne({
            where: { id_direccion: id_direccion }
        });
        if (!_direc) {
            return res.status(404).json({
                msg: "Direccion no encontrada: id-" + id_direccion
            });
        }
        yield _direc.update({
            estado: 2
        });
        res.json(_direc);
    }
    catch (error) {
        console.error('Error al inactivar la direccion:', error);
        res.status(500).json({
            msg: 'Contactate con el administrador',
        });
    }
});
exports.inactivateDirecion = inactivateDirecion;
//Activa la direccion de la DBA
const activateDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_direccion } = req.body;
    try {
        const _direc = yield direccionesContacto_model_1.Direcciones.findOne({
            where: { id_direccion: id_direccion }
        });
        if (!_direc) {
            return res.status(404).json({
                msg: "Direccion no encontrada: id-" + id_direccion
            });
        }
        yield _direc.update({
            estado: 1
        });
        res.json(_direc);
    }
    catch (error) {
        console.error('Error al activar la direccion:', error);
        res.status(500).json({
            msg: 'Contactate con el administrador',
        });
    }
});
exports.activateDireccion = activateDireccion;
// Inserta una nueva dirección en la DBA
const postDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad } = req.body;
    try {
        const query = `
            INSERT INTO mipyme.tbl_me_direcciones(
                direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const results = yield connection_1.default.query(query, {
            replacements: [direccion, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad],
            type: sequelize_1.QueryTypes.INSERT
        });
        res.json(results);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postDireccion = postDireccion;
// Actualiza una dirección existente en la DBA por su ID
const putDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id; // Obtener el ID de la dirección de los parámetros de la solicitud
    const { direccion, descripcion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad } = req.body;
    try {
        const query = `
            UPDATE mipyme.tbl_me_direcciones
            SET direccion = ?, descripcion = ?, modificado_por = ?, fecha_modificacion = ?, estado = ?, id_tipo_direccion = ?, id_empresa = ?, id_pais = ?, id_ciudad = ?
            WHERE id_direccion = ?;
        `;
        const results = yield connection_1.default.query(query, {
            replacements: [direccion, descripcion, modificado_por, fecha_modificacion, estado, id_tipo_direccion, id_empresa, id_pais, id_ciudad, id],
            type: sequelize_1.QueryTypes.UPDATE
        });
        res.json(results);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error al actualizar la dirección',
            error
        });
    }
});
exports.putDireccion = putDireccion;
