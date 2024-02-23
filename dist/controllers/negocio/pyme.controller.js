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
exports.pymesAllTipoEmpresa = exports.activatePyme = exports.inactivatePyme = exports.updatePyme = exports.deletePyme = exports.postPyme = exports.getPyme = exports.getAllPymes = exports.loginPyme = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const pyme_models_1 = require("../../models/negocio/pyme-models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tipoEmpresa_models_1 = require("../../models/negocio/tipoEmpresa-models");
const loginPyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_pyme, rtn } = req.body;
    try {
        // Busca el usuario en la base de datos
        const pyme = yield pyme_models_1.Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });
        if (!pyme) {
            return res.status(400).json({
                msg: 'Pyme/RTN inválidos.'
            });
        }
        // Compara la contraseña proporcionada con la contraseña almacenada en forma de hash
        const passwordValid = yield bcrypt_1.default.compare(rtn, pyme.passwordHash);
        if (!passwordValid) {
            // Si la contraseña es incorrecta, aumenta el contador de intentos fallidos
            pyme.intentos_fallidos = (pyme.intentos_fallidos || 0) + 1;
            yield pyme.save();
            if (pyme.intentos_fallidos >= 3) {
                // Si el usuario ha alcanzado 3 intentos fallidos, bloquea el usuario
                pyme.estado = 3;
                yield pyme.save();
            }
            return res.status(400).json({
                msg: 'Pyme/RTN inválidos.',
                requestData: req.body // Agregar más información si es necesario
            });
        }
        else {
            // Si el inicio de sesión es exitoso, restablece los intentos fallidos
            pyme.intentos_fallidos = 0;
            yield pyme.save();
        }
        if (pyme.fecha_ultima_conexion == null) {
            return res.json(pyme.fecha_ultima_conexion);
        }
        // Validar estado del usuario
        if (pyme.estado != 1) {
            return res.status(400).json({
                msg: 'Pyme Inactiva',
            });
        }
        // Genera el token
        const token = jsonwebtoken_1.default.sign({
            pyme: pyme
        }, process.env.SECRET_KEY || 'Lamers005*');
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
                error: 'Error desconocido' // Otra manejo de errores si no es una instancia de Error
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
    const { id_pyme } = req.body;
    const _pyme = yield pyme_models_1.Pyme.findOne({
        where: { id_pyme: id_pyme }
    });
    if (_pyme) {
        res.json(_pyme);
    }
    else {
        res.status(404).json({
            msg: `el ID de la pregunta no existe: ${id_pyme}`
        });
    }
});
exports.getPyme = getPyme;
// Inserta una nueva Pyme en la base de datos
const postPyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _pyme = yield pyme_models_1.Pyme.findOne({
            where: { nombre_pyme: nombre_pyme }
        });
        const newPyme = yield pyme_models_1.Pyme.create({
            id_tipo_empresa: id_tipo_empresa,
            nombre_pyme: nombre_pyme.toUpperCase(),
            categoria: categoria.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: Date.now(),
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: Date.now(),
            estado: estado
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
        const { id_pyme, nombre_pyme, id_tipo_empresa, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
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
            id_tipo_empresa: id_tipo_empresa,
            categoria: categoria.toUpperCase(),
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: fecha_creacion,
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: fecha_modificacion,
            estado: estado
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
