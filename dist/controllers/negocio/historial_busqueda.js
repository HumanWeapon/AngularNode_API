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
exports.postHistorialB = exports.gethistorial_busqueda_PYME = exports.getAllHistorialB = void 0;
const historial_busqueda_1 = require("../../models/negocio/historial_busqueda");
const connection_1 = __importDefault(require("../../db/connection"));
//Consulta todos los registros del historial de búsqueda
const getAllHistorialB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT 
            HISTORIAL.id_historial,
            HISTORIAL.id_pyme,
            PYME.nombre_pyme,
            HISTORIAL.id_producto,
            PRODUCTO.producto,
            HISTORIAL.id_pais,
            PAIS.pais,
            HISTORIAL.id_empresa,
            EMPRESA.nombre_empresa
        FROM mipyme.tbl_me_historial_busqueda HISTORIAL
        LEFT JOIN mipyme.tbl_me_pyme PYME ON HISTORIAL.id_pyme = PYME.id_pyme
        LEFT JOIN mipyme.tbl_me_productos PRODUCTO ON HISTORIAL.id_producto = PRODUCTO.id_producto
        LEFT JOIN mipyme.tbl_me_paises PAIS ON HISTORIAL.id_pais = PAIS.id_pais
        LEFT JOIN mipyme.tbl_me_empresas EMPRESA ON HISTORIAL.id_empresa = EMPRESA.id_empresa
        ORDER BY id_historial DESC
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
exports.getAllHistorialB = getAllHistorialB;
//Consulta todos los registros del historial de búsqueda para una PYME por el id_pyme
const gethistorial_busqueda_PYME = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pyme } = req.params;
    try {
        const HistB = yield historial_busqueda_1.Historial_Busqueda.findAll({
            where: { id_pyme: id_pyme }
        });
        res.json(HistB);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.gethistorial_busqueda_PYME = gethistorial_busqueda_PYME;
//Inserta una nuevo registro en la Base de Datos
const postHistorialB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pyme, id_producto, id_pais, id_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const HistB = yield historial_busqueda_1.Historial_Busqueda.create({
            id_pyme: id_pyme,
            id_producto: id_producto,
            id_pais: id_pais,
            id_empresa: id_empresa,
            descripcion: descripcion.toUpperCase(),
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: Date.now(),
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: Date.now(),
            estado: estado
        });
        return res.json(HistB);
    }
    catch (error) {
        console.error('Error contacte al administrador:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.postHistorialB = postHistorialB;
