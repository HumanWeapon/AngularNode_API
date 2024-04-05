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
exports.getPaisesPorProducto = exports.getProductosSearch = exports.eliminarOperacionEmpresaProducto = exports.consultarProductosNoRegistradosPorId = exports.consultarOperacionEmpresaProductoPorId = exports.agregarOperacionEmpresaProducto = exports.consultarOperacionesEmpresasProductos = void 0;
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
//Obtiene los productos presentados en el objeto BUSCAR PRODUCTOS
const getProductosSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoria, pais } = req.query; // Leer los parámetros de consulta
    let categoriaCondition = '';
    let paisCondition = '';
    const params = [];
    if (categoria) {
        categoriaCondition = 'AND CATEGORIA.categoria = ?';
        params.push(categoria);
    }
    else {
        categoriaCondition = 'AND CATEGORIA.categoria IS NOT NULL';
    }
    if (pais) {
        paisCondition = 'AND DIRECCION.pais = ?';
        params.push(pais);
    }
    else {
        paisCondition = 'AND DIRECCION.pais IS NOT NULL';
    }
    try {
        const query = `
            SELECT DISTINCT
                ROW_NUMBER() OVER(ORDER BY PRODUCTO.producto) AS numero_registro,
                PRODUCTO.id_producto,
                PRODUCTO.producto,
                PRODUCTO.id_categoria,
                MAX(CATEGORIA.categoria) AS categoria,
                MAX(PRODUCTO.descripcion) AS descripcion,
                MAX(DIRECCION.pais) AS pais,
                MAX(DIRECCION.ciudad) AS ciudad
            FROM mipyme.tbl_me_productos PRODUCTO
            LEFT JOIN (SELECT id_categoria, categoria FROM mipyme.tbl_me_categoria_productos WHERE estado = 1) CATEGORIA ON PRODUCTO.id_categoria = CATEGORIA.id_categoria
            LEFT JOIN (SELECT id_empresa, id_producto FROM mipyme.tbl_op_empresas_productos WHERE estado = 1) EMPRESAS ON PRODUCTO.id_producto = EMPRESAS.id_producto
            LEFT JOIN 
                (
                    SELECT 
                        DIRECCION.id_empresa,
                        CIUDAD.ciudad,
                        PAIS.pais
                    FROM mipyme.tbl_me_direcciones DIRECCION
                    LEFT JOIN mipyme.tbl_me_ciudades CIUDAD ON DIRECCION.id_ciudad = CIUDAD.id_ciudad
                    LEFT JOIN mipyme.tbl_me_paises PAIS ON DIRECCION.id_pais = PAIS.id_pais
                    WHERE DIRECCION.estado = 1
                        AND CIUDAD.estado = 1
                        AND pais.estado = 1    
                ) DIRECCION ON EMPRESAS.id_empresa = DIRECCION.id_empresa
            WHERE PRODUCTO.ESTADO = 1
                AND EMPRESAS.id_empresa IS NOT NULL
                ${categoriaCondition}
                ${paisCondition}
            GROUP BY 
                PRODUCTO.id_producto, PRODUCTO.producto
            ORDER BY PRODUCTO.producto ASC
        `;
        // Crear un array con los parámetros en el orden correcto
        const params = [];
        if (categoria)
            params.push(categoria);
        if (pais)
            params.push(pais);
        const [results, metadata] = yield connection_1.default.query(query, { replacements: params });
        res.json(results);
    }
    catch (error) {
        console.error('Error al consultar productos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.getProductosSearch = getProductosSearch;
//OBTIENE LOS PAÍSES DE LAS EMPRESAS REGISTRADAS
const getPaisesPorProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params; // Leer los parámetros de consulta
    try {
        const query = `
        --PARA OBTENER LOS PAÍSES DE LAS EMPRESAS REGISTRADAS
        SELECT DISTINCT
            PAIS.id_pais,
            PAIS.pais
        FROM mipyme.tbl_me_paises PAIS
        LEFT JOIN mipyme.tbl_me_direcciones DIRECCION ON PAIS.id_pais = DIRECCION.id_pais
        LEFT JOIN mipyme.tbl_op_empresas_productos PRODUCTO ON DIRECCION.id_empresa = PRODUCTO.id_empresa
        WHERE DIRECCION.direccion IS NOT NULL
            AND PAIS.estado = 1
            AND DIRECCION.estado = 1
            AND PRODUCTO.estado = 1
            AND PRODUCTO.id_producto = ?`;
        const params = [id_producto]; // Parámetros de consulta
        const [results, metadata] = yield connection_1.default.query(query, { replacements: params });
        // Verificar si hay resultados
        if (results && results.length > 0) {
            res.json(results);
        }
        else {
            // Si no hay resultados, enviar un array vacío
            res.json([]);
        }
    }
    catch (error) {
        console.error('Error contacte al administrador:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.getPaisesPorProducto = getPaisesPorProducto;
