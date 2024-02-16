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
exports.activateProducto = exports.inactivateProducto = exports.updateProducto = exports.deleteProducto = exports.postProducto = exports.getProductos = exports.getAllProductos = exports.getOpProductos = exports.getAllOpProductos = void 0;
const productos_models_1 = require("../../models/negocio/productos-models");
const paises_models_1 = require("../../models/negocio/paises-models");
const contacto_models_1 = require("../../models/negocio/contacto-models");
const categoria_models_1 = require("../../models/negocio/categoria-models");
const getAllOpProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const opproductos = yield productos_models_1.Productos.findAll({
            include: [{
                    model: categoria_models_1.Categorias,
                    attributes: ['id_categoria', 'categoria', 'descripcion'],
                    required: false, // LEFT JOIN
                }]
        });
        res.json(opproductos);
    }
    catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
});
exports.getAllOpProductos = getAllOpProductos;
const getOpProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_producto } = req.body;
        // Realiza la consulta con la información adicional de las tablas relacionadas
        const _opproducto = yield productos_models_1.Productos.findOne({
            where: { id_producto: id_producto },
            include: [
                { model: paises_models_1.Paises, as: 'paises' },
                { model: contacto_models_1.Contacto, as: 'contacto' },
            ],
        });
        if (_opproducto) {
            res.json(_opproducto);
        }
        else {
            res.status(404).json({
                msg: `El ID de la Operacion Empresa no existe: ${id_producto}`,
            });
        }
    }
    catch (error) {
        console.error('Error al obtener la Operacion Empresa por ID:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
});
exports.getOpProductos = getOpProductos;
//Obtiene todos las categorias de productos de la base de datos
const getAllProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = yield productos_models_1.Productos.findAll();
    res.json(producto);
});
exports.getAllProductos = getAllProductos;
// Obtiene una categoria de la base de datos por su ID
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { producto } = req.body;
    const _producto = yield productos_models_1.Productos.findOne({
        where: { producto: producto }
    });
    if (_producto) {
        res.json(_producto);
    }
    else {
        res.status(404).json({
            msg: `el producto no existe: ${producto}`
        });
    }
});
exports.getProductos = getProductos;
// Inserta una categoria en la base de datos
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria, producto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _producto = yield productos_models_1.Productos.findOne({
            where: { producto: producto }
        });
        if (_producto) {
            return res.status(400).json({
                msg: 'El producto ya fue registrado en la base de datos: ' + producto
            });
        }
        else {
            yield productos_models_1.Productos.create({
                id_categoria: id_categoria,
                producto: producto,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json({
                msg: 'El producto: ' + producto + ' ha sido creado exitosamente',
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
exports.postProducto = postProducto;
// Elimina una categoria de la base de datos
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params; // Obtén el ID desde los parámetros de la URL
    try {
        const _producto = yield productos_models_1.Productos.findOne({
            where: { id_producto: id_producto }
        });
        if (_producto) {
            yield _producto.destroy();
            res.json({
                msg: 'El producto con el ID: ' + id_producto + ' ha sido eliminado exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró el producto con el ID ' + id_producto,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el producto',
        });
    }
});
exports.deleteProducto = deleteProducto;
//actualiza la categoria en la base de datos
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto, id_categoria, producto, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    const produc = yield productos_models_1.Productos.findOne({
        where: { id_producto: id_producto }
    });
    if (!produc) {
        return res.status(404).json({
            msg: "El producto con el ID: " + id_producto + " no existe"
        });
    }
    yield produc.update({
        id_producto: id_producto,
        id_categoria: id_categoria,
        producto: producto,
        descripcion: descripcion,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'Producto: ' + produc + ' ha sido actualizado exitosamente',
    });
});
exports.updateProducto = updateProducto;
//Inactiva el usuario de la DBA
const inactivateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { producto } = req.body;
    const productos = yield productos_models_1.Productos.findOne({
        where: { producto: producto }
    });
    if (!productos) {
        return res.status(404).json({
            msg: "El Producto no existe: " + producto
        });
    }
    yield productos.update({
        estado: 2
    });
    res.json({
        msg: 'Producto: ' + producto + ' inactivado exitosamente',
    });
});
exports.inactivateProducto = inactivateProducto;
//Activa el usuario de la DBA
const activateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { producto } = req.body;
    const productos = yield productos_models_1.Productos.findOne({
        where: { producto: producto }
    });
    if (!productos) {
        return res.status(404).json({
            msg: "El producto no existe: " + producto
        });
    }
    yield productos.update({
        estado: 1
    });
    res.json({
        msg: 'Producto: ' + producto + ' ha sido activado exitosamente',
    });
});
exports.activateProducto = activateProducto;
