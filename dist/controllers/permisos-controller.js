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
exports.getPermnisosObjetos = exports.permisosdeRoutes = exports.objetosSinRolV2 = exports.objetosSinRol = exports.permisosRolesObjetos = exports.activatePermiso = exports.inactivatePermiso = exports.updatePermisos = exports.deletePermiso = exports.postPermiso = exports.getPermiso = exports.getAllPermisos = void 0;
const permisos_models_1 = require("../models/permisos-models");
const objetos_models_1 = require("../models/objetos-models");
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Obtiene todos los permisos de la base de datos
const getAllPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _permisos = yield permisos_models_1.Permisos.findAll();
        res.json(_permisos);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }
});
exports.getAllPermisos = getAllPermisos;
//Obtiene un permiso de la base de datos
const getPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_permisos } = req.body;
    try {
        const _permiso = yield permisos_models_1.Permisos.findOne({
            where: { id_permisos: id_permisos }
        });
        if (_permiso) {
            res.json({ _permiso });
        }
        else {
            res.status(404).json({
                msg: `el Id del permiso no existe: ${id_permisos}`
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
exports.getPermiso = getPermiso;
//Inserta un nuevo permiso 
const postPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_rol, id_objeto, permiso_insercion, permiso_eliminacion, permiso_actualizacion, permiso_consultar, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado_permiso } = req.body;
        // Crea el nuevo permiso
        const newPermiso = yield permisos_models_1.Permisos.create({
            id_rol: id_rol,
            id_objeto: id_objeto,
            permiso_insercion: permiso_insercion,
            permiso_eliminacion: permiso_eliminacion,
            permiso_actualizacion: permiso_actualizacion,
            permiso_consultar: permiso_consultar,
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado_permiso: estado_permiso
        });
        return res.json(newPermiso);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error: error // Devuelve el mensaje de error para una mejor depuración
        });
    }
});
exports.postPermiso = postPermiso;
//Elimina un permiso de la base de datos
const deletePermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_permisos } = req.body;
    try {
        const _permisos = yield permisos_models_1.Permisos.findOne({
            where: { id_permisos: id_permisos }
        });
        if (_permisos) {
            yield _permisos.destroy();
            res.json(_permisos);
        }
        else {
            res.status(404).json({
                msg: 'No se encontró ningun permiso con esa numeracion',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }
});
exports.deletePermiso = deletePermiso;
//actualiza el permiso en la base de datos
const updatePermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_permisos, estado_permiso, id_rol, id_objeto, permiso_insercion, permiso_eliminacion, permiso_actualizacion, permiso_consultar, modificado_por, fecha_modificacion } = req.body;
    try {
        const _permiso = yield permisos_models_1.Permisos.findOne({
            where: { id_permisos: id_permisos }
        });
        if (!_permiso) {
            return res.status(404).json({
                msg: 'El permiso seleccionado no existe en la base de datos'
            });
        }
        yield _permiso.update({
            id_permisos: id_permisos,
            id_rol: id_rol,
            id_objeto: id_objeto,
            permiso_insercion: permiso_insercion,
            permiso_eliminacion: permiso_eliminacion,
            permiso_actualizacion: permiso_actualizacion,
            permiso_consultar: permiso_consultar,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado_permiso: estado_permiso
        });
        res.json(_permiso);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }
});
exports.updatePermisos = updatePermisos;
//Inactiva el usuario de la DBA
const inactivatePermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_permisos } = req.body;
    try {
        const _permiso = yield permisos_models_1.Permisos.findOne({
            where: { id_permisos: id_permisos }
        });
        if (!_permiso) {
            return res.status(404).json({
                msg: "El Permiso no existe: " + id_permisos
            });
        }
        yield _permiso.update({
            estado_permiso: 2
        });
        res.json(_permiso);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }
});
exports.inactivatePermiso = inactivatePermiso;
//Activa el usuario de la DBA
const activatePermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_permisos } = req.body;
    try {
        const _permiso = yield permisos_models_1.Permisos.findOne({
            where: { id_permisos: id_permisos }
        });
        if (!_permiso) {
            return res.status(404).json({
                msg: "El Permiso no existe: " + id_permisos
            });
        }
        yield _permiso.update({
            estado_permiso: 1
        });
        res.json(_permiso);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error interno, contacta al administrador.',
            error
        });
    }
});
exports.activatePermiso = activatePermiso;
//Activa el usuario de la DBA
const permisosRolesObjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol } = req.body; // Suponiendo que aquí recibes el id_rol del usuario logeado
    try {
        const _permiso = yield permisos_models_1.Permisos.findAll({
            where: { id_rol: id_rol, estado_permiso: 1 },
            include: [
                {
                    model: objetos_models_1.Objetos,
                    as: 'objetos',
                    where: { estado_objeto: 1, tipo_objeto: 'MENU_SIDEBAR' }
                }
            ],
            order: [
                [
                    sequelize_1.Sequelize.literal(`CASE 
                        WHEN "objetos"."id_objeto" = 25 THEN 1 
                        WHEN "objetos"."id_objeto" = 46 THEN 2
                        WHEN "objetos"."id_objeto" = 23 THEN 3
                        WHEN "objetos"."id_objeto" = 22 THEN 4 
                        WHEN "objetos"."id_objeto" = 9 THEN 5
                        WHEN "objetos"."id_objeto" = 26 THEN 6
                        WHEN "objetos"."id_objeto" = 7 THEN 7 
                        WHEN "objetos"."id_objeto" = 29 THEN 8 
                        ELSE 9 
                        END`)
                ]
            ],
        });
        res.json(_permiso);
    }
    catch (error) {
        console.error('Error al obtener parámetros de permisos:', error);
        res.status(500).json({ error: 'Error al obtener parámetros de permisos' });
    }
});
exports.permisosRolesObjetos = permisosRolesObjetos;
const objetosSinRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT
             OBJETOS.id_objeto
            ,OBJETOS.objeto
            ,OBJETOS.tipo_objeto
            ,(OBJETOS.tipo_objeto||' | '||OBJETOS.objeto)AS NOMBRE_OBJETO
            ,PERMISOS.id_permisos
            ,ROLES.id_rol
            ,ROLES.rol
        FROM mipyme.tbl_ms_objetos AS OBJETOS
        LEFT JOIN 
            (
                SELECT * FROM mipyme.tbl_ms_permisos
                WHERE estado_permiso = 1
                    AND id_rol = ${id}
            ) AS PERMISOS
        ON OBJETOS.id_objeto = PERMISOS.id_objeto
        LEFT JOIN 
            (
                SELECT * 
                FROM mipyme.tbl_ms_roles
                WHERE estado_rol = 1
            ) AS ROLES
        ON PERMISOS.id_rol = ROLES.id_rol
        WHERE OBJETOS.estado_objeto = 1
            AND PERMISOS.id_permisos IS NULL
        ORDER BY OBJETO = 'BUSCAR PRODUCTOS' DESC, OBJETO = 'DASHBOARD' DESC, OBJETO = 'PYMES' DESC, 
            OBJETO = 'EMPRESAS' DESC, OBJETO = 'SEGURIDAD' DESC, OBJETO = 'ADMINISTRACION' DESC, OBJETO = 'MANTENIMIENTO' DESC,
            tipo_objeto ASC
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        console.error('Error al consultar contactos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.objetosSinRol = objetosSinRol;
//Obtiene el objeto mediante el ID
const objetosSinRolV2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT objeto FROM mipyme.tbl_ms_permisos PERMISOS
        LEFT JOIN mipyme.tbl_ms_objetos OBJETOS ON PERMISOS.id_objeto = OBJETOS.id_objeto
        WHERE PERMISOS.id_permisos = ${id}
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results[0]);
    }
    catch (error) {
        console.error('Error al consultar contactos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.objetosSinRolV2 = objetosSinRolV2;
//consulta los permisos de los roles para poder acceder a las rutas.
const permisosdeRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol, id_objeto, id_usuario } = req.params;
    try {
        const query = `
        SELECT * FROM mipyme.tbl_ms_permisos PERMISO
        LEFT JOIN mipyme.tbl_ms_usuario USUARIO ON PERMISO.id_rol = USUARIO.id_rol
        WHERE PERMISO.id_rol = ${id_rol} 
            AND PERMISO.id_objeto = ${id_objeto}
            AND USUARIO.id_usuario = ${id_usuario}
            AND PERMISO.estado_permiso = 1
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        if (results.length) {
            // Genera el token
            const token = jsonwebtoken_1.default.sign({
                id_objeto: id_rol,
                id_permiso: id_objeto
            }, process.env.SECRET_KEY || 'Lamers005*');
            res.json(token);
        }
        else {
            res.json('No cuentas con permisos');
        }
    }
    catch (error) {
        console.error('Error: ', error);
        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: error.message
            });
        }
        else {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: 'Error desconocido' // Otra manejo de errores si no es una instancia de Error
            });
        }
    }
});
exports.permisosdeRoutes = permisosdeRoutes;
const getPermnisosObjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol, id_objeto } = req.params;
    try {
        const query = `
        SELECT * FROM mipyme.tbl_ms_permisos
        WHERE id_rol = ${id_rol}
            AND id_objeto = ${id_objeto}
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results[0]);
    }
    catch (error) {
        console.error('Error al consultar contactos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.getPermnisosObjetos = getPermnisosObjetos;
