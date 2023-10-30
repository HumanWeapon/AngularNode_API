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
exports.updateCategoria = exports.deleteCategoria = exports.postCategoria = exports.getCategoria = exports.getAllCategorias = void 0;
const categoria_models_1 = require("../../models/negocio/categoria-models");
//Obtiene todos las categorias de productos de la base de datos
const getAllCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_models_1.Categorias.findAll();
    res.json(categoria);
});
exports.getAllCategorias = getAllCategorias;
// Obtiene una categoria de la base de datos por su ID
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria } = req.body;
    const _categoria = yield categoria_models_1.Categorias.findOne({
        where: { id_categoria: id_categoria }
    });
    if (_categoria) {
        res.json(_categoria);
    }
    else {
        res.status(404).json({
            msg: `el ID de la categoria no existe: ${id_categoria}`
        });
    }
});
exports.getCategoria = getCategoria;
// Inserta una categoria en la base de datos
const postCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    try {
        const _categoria = yield categoria_models_1.Categorias.findOne({
            where: { categoria: categoria }
        });
        if (_categoria) {
            return res.status(400).json({
                msg: 'La categoria ya fue registrada en la base de datos: ' + categoria
            });
        }
        else {
            yield categoria_models_1.Categorias.create({
                categoria: categoria,
                descripcion: descripcion,
                creado_por: creado_por,
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por,
                fecha_modificacion: fecha_modificacion,
                estado: estado
            });
            res.json({
                msg: 'La categoria: ' + categoria + ' ha sido creada exitosamente',
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
exports.postCategoria = postCategoria;
// Elimina una categoria de la base de datos
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria } = req.params; // Obtén el ID desde los parámetros de la URL
    try {
        const _categoria = yield categoria_models_1.Categorias.findOne({
            where: { id_categoria: id_categoria }
        });
        if (_categoria) {
            yield _categoria.destroy();
            res.json({
                msg: 'La categoria con el ID: ' + id_categoria + ' ha sido eliminada exitosamente',
            });
        }
        else {
            res.status(404).json({
                msg: 'No se encontró una categoria con el ID ' + id_categoria,
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar la categoria:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la categoria',
        });
    }
});
exports.deleteCategoria = deleteCategoria;
//actualiza la categoria en la base de datos
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria, categoria, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado } = req.body;
    const catego = yield categoria_models_1.Categorias.findOne({
        where: { id_categoria: id_categoria }
    });
    if (!catego) {
        return res.status(404).json({
            msg: "La categoria con el ID: " + id_categoria + " no existe"
        });
    }
    yield catego.update({
        id_categoria: id_categoria,
        categoria: categoria,
        descripcion: descripcion,
        creado_por: creado_por,
        fecha_creacion: fecha_creacion,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        estado: estado
    });
    res.json({
        msg: 'Categoria: ' + catego + ' ha sido actualizado exitosamente',
    });
});
exports.updateCategoria = updateCategoria;
