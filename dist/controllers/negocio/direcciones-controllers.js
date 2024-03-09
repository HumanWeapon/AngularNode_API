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
exports.getdirecciones = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
//Obtiene todas las Empresas
const getdirecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
        SELECT 
            DIRECCIONES.id_direccion,
            DIRECCIONES.id_tipo_direccion,
            DIRECCIONES.direccion,
            TIPO.tipo_direccion,
            DIRECCIONES.id_ciudad,
            CIUDAD.ciudad,
            CIUDAD.id_pais,
            CIUDAD.pais,
            DIRECCIONES.descripcion,
            DIRECCIONES.creado_por,
            DIRECCIONES.fecha_creacion,
            DIRECCIONES.modificado_por,
            DIRECCIONES.fecha_modificacion,
            DIRECCIONES.estado
        FROM mipyme.tbl_me_direcciones AS DIRECCIONES
        LEFT JOIN 
            (
                SELECT A.id_ciudad, A.ciudad, A.id_pais, B.pais
                FROM mipyme.tbl_me_ciudades as A
                LEFT JOIN 
                    (
                        SELECT id_pais , pais
                        FROM mipyme.tbl_me_paises
                        WHERE estado = 1
                    ) AS B
                ON A.id_pais = B.id_pais
                WHERE A.estado = 1
            ) AS CIUDAD
        ON DIRECCIONES.id_ciudad = CIUDAD.id_ciudad
        LEFT JOIN 
            (
                SELECT id_tipo_direccion, tipo_direccion 
                FROM mipyme.tbl_me_tipo_direccion
                WHERE estado = 1
            ) AS TIPO
        ON DIRECCIONES.id_tipo_direccion = TIPO.id_tipo_direccion
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
