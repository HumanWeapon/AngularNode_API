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
exports.updateProducto = exports.deleteProducto = exports.postProducto = exports.getProductos = exports.getAllProductos = void 0;
const productos_models_1 = require("../../models/negocio/productos-models");
//Obtiene todos los objetos de la base de datos
const getAllProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _productos = yield productos_models_1.Productos.findAll();
    res.json(_productos);
});
exports.getAllProductos = getAllProductos;
//Obtiene un objeto de la base de datos     
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { producto } = req.body;
    const _producto = yield productos_models_1.Productos.findOne({
        where: { producto: producto }
    });
    if (_producto) {
        res.json({ _producto });
    }
    else {
        res.status(404).json({
            msg: `el  producto no existe: ${producto}`
        });
    }
});
exports.getProductos = getProductos;
//Inserta un objeto en la base de datos
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { producto, descripcion, tipo_objeto, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _producto = yield productos_models_1.Productos.findOne({
            where: { producto: producto }
        });
        if (_producto) {
            return res.status(400).json({
                msg: 'Producto ya registrado en la base de datos: ' + producto
            });
        }
        else {
            yield productos_models_1.Productos.create({
                producto: producto,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json({
                msg: 'El Producto: ' + producto + ' ha sido creada exitosamente',
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
    /*// Generamos token
    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);*/
});
exports.postProducto = postProducto;
//Elimina un objeto de la base de datos
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.body;
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
                msg: 'No se encontró un producto con el ID ' + id_producto,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el parámetro:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar el parámetro',
        });
    }
});
exports.deleteProducto = deleteProducto;
//actualiza el rol en la base de datos
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto, id_categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    const _producto = yield productos_models_1.Productos.findOne({
        where: { id_producto: id_producto }
    });
    if (!_producto) {
        return res.status(404).json({
            msg: 'Producto con el ID: ' + id_producto + ' no existe en la base de datos'
        });
    }
    yield _producto.update({
        id_producto: id_producto,
        id_categoria: id_categoria,
        producto: _producto,
        descripcion: descripcion,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'El Producto con el ID: ' + id_producto + ' ha sido actualizado exitosamente',
    });
});
exports.updateProducto = updateProducto;
