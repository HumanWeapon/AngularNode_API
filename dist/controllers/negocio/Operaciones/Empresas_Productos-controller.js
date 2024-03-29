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
exports.eliminarOperacionEmpresaProducto = exports.consultarProductosNoRegistradosPorId = exports.consultarOperacionEmpresaProductoPorId = exports.agregarOperacionEmpresaProducto = exports.consultarOperacionesEmpresasProductos = void 0;
const Empresas_Productos_1 = require("../../../models/negocio/Operaciones/Empresas_Productos");
const productos_models_1 = require("../../../models/negocio/productos-models");
const categoria_models_1 = require("../../../models/negocio/categoria-models");
const connection_1 = __importDefault(require("../../../db/connection"));
// Consultar todos los registros
const consultarOperacionesEmpresasProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operaciones = yield Empresas_Productos_1.OperacionesEmpresasProductos.findAll();
        res.json(operaciones);
    }
    catch (error) {
        console.error('Error al consultar las operaciones empresas productos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.consultarOperacionesEmpresasProductos = consultarOperacionesEmpresasProductos;
// Agregar un nuevo registro
const agregarOperacionEmpresaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoRegistro = yield Empresas_Productos_1.OperacionesEmpresasProductos.create(req.body);
        res.json(nuevoRegistro);
    }
    catch (error) {
        console.error('Error al agregar la operación empresa producto:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.agregarOperacionEmpresaProducto = agregarOperacionEmpresaProducto;
// Consultar todos los registros por ID de empresa
const consultarOperacionEmpresaProductoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Buscar todas las operaciones que corresponden al ID de la empresa
        const operaciones = yield Empresas_Productos_1.OperacionesEmpresasProductos.findAll({
            where: { id_empresa: id },
            include: [
                {
                    model: productos_models_1.Productos,
                    as: 'producto',
                    include: [
                        {
                            model: categoria_models_1.Categorias,
                            required: true,
                            as: 'categoria',
                            attributes: ['categoria'],
                            where: { estado: 1 } // Condición para la categoría
                        }
                    ],
                    required: true,
                    attributes: ['producto', 'descripcion'],
                    where: { estado: 1 }
                }
            ]
        });
        res.json(operaciones);
    }
    catch (error) {
        console.error('Error al consultar las operaciones empresa producto por ID de empresa:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.consultarOperacionEmpresaProductoPorId = consultarOperacionEmpresaProductoPorId;
const consultarProductosNoRegistradosPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            B.id_emp_prod,
            B.id_empresa,
            CASE
                WHEN B.id_empresa IS NULL THEN FALSE
                ELSE TRUE
            END AS POSEE_PRODUCTO,
            A.id_producto,
            A.id_categoria,
            C.categoria,
            A.producto,
            A.descripcion
        FROM mipyme.tbl_me_productos AS A
        LEFT JOIN (SELECT id_emp_prod, id_empresa, id_producto, estado FROM mipyme.tbl_op_empresas_productos 
                WHERE estado = 1 AND id_empresa = ${id}) AS B
        ON A.id_producto = B.id_producto
        LEFT JOIN (SELECT id_categoria, categoria, estado FROM mipyme.tbl_me_categoria_productos WHERE estado = 1) AS C
        ON A.id_categoria = C.id_categoria
        WHERE A.estado = 1
            --AND B.id_empresa IS NULL
            AND C.categoria is NOT NULL
        `;
        const [results, metadata] = yield connection_1.default.query(query);
        res.json(results);
    }
    catch (error) {
        console.error('Error al consultar productos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.consultarProductosNoRegistradosPorId = consultarProductosNoRegistradosPorId;
// Eliminar un registro por ID
const eliminarOperacionEmpresaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const operacion = yield Empresas_Productos_1.OperacionesEmpresasProductos.findByPk(id);
        if (!operacion) {
            return res.status(404).json({ msg: 'Operación empresa producto no encontrada' });
        }
        yield operacion.destroy();
        res.json({ msg: 'Operación empresa producto eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar la operación empresa producto:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.eliminarOperacionEmpresaProducto = eliminarOperacionEmpresaProducto;
