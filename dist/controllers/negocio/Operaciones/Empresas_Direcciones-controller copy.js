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
exports.consultarContactosNoRegistradosPorId = void 0;
const connection_1 = __importDefault(require("../../../db/connection"));
const consultarContactosNoRegistradosPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            OPERACIONES_CONTACTOS.id_emp_contactos,
            OPERACIONES_CONTACTOS.id_empresa,
            CONTACTOS.id_contacto,
            CASE
                WHEN OPERACIONES_CONTACTOS.id_empresa IS NULL THEN FALSE
                ELSE TRUE
            END AS POSEE_CONTACTO,
            CONTACTOS.id_tipo_contacto,
            TIPO_CONTACTO.tipo_contacto,
            (CONTACTOS.primer_nombre||' '||CONTACTOS.segundo_nombre||' '||CONTACTOS.primer_apellido||' '||CONTACTOS.segundo_apellido) nombre_completo,
            CONTACTOS.descripcion,
            CONTACTOS.creado_por,
            CONTACTOS.fecha_modificacion,
            CONTACTOS.modificado_por,
            CONTACTOS.fecha_modificacion,
            CONTACTOS.estado
        FROM mipyme.tbl_me_contactos AS CONTACTOS
        LEFT JOIN (SELECT * FROM mipyme.tbl_me_tipo_contacto WHERE estado = 1) AS TIPO_CONTACTO
        ON CONTACTOS.id_tipo_contacto = TIPO_CONTACTO.id_tipo_contacto
        LEFT JOIN 
            (
                SELECT * 
                FROM mipyme.tbl_op_empresas_contactos
                WHERE estado = 1 AND id_empresa = ${id}
            ) AS OPERACIONES_CONTACTOS
        ON CONTACTOS.id_contacto = OPERACIONES_CONTACTOS.id_contacto
        WHERE CONTACTOS.ESTADO = 1
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        console.error('Error al consultar contactos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.consultarContactosNoRegistradosPorId = consultarContactosNoRegistradosPorId;
