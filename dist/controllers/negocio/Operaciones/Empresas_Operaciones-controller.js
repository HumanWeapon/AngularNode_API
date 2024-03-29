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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarOperacionEmpresaProducto = exports.consultarOperacionEmpresaProductoPorId = exports.consultarOperacionesEmpresasProductos = exports.agregarOperacionEmpresaProducto = void 0;
const Empresas_Productos_1 = require("../../../models/negocio/Operaciones/Empresas_Productos");
// Agregar un nuevo registro
const agregarOperacionEmpresaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoRegistro = yield Empresas_Productos_1.OperacionesEmpresasProductos.create(req.body);
        res.status(201).json(nuevoRegistro);
    }
    catch (error) {
        console.error('Error al agregar la operación empresa producto:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.agregarOperacionEmpresaProducto = agregarOperacionEmpresaProducto;
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
// Consultar un registro por ID
const consultarOperacionEmpresaProductoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const operacion = yield Empresas_Productos_1.OperacionesEmpresasProductos.findByPk(id);
        if (!operacion) {
            return res.status(404).json({ msg: 'Operación empresa producto no encontrada' });
        }
        res.json(operacion);
    }
    catch (error) {
        console.error('Error al consultar la operación empresa producto por ID:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
});
exports.consultarOperacionEmpresaProductoPorId = consultarOperacionEmpresaProductoPorId;
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
