"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const categoria_models_1 = require("./categoria-models");
const paises_models_1 = require("./paises-models");
const contacto_models_1 = require("./contacto-models");
exports.Productos = connection_1.default.define('productos', {
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_categoria: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    id_pais: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    id_contacto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    producto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    creado_por: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    modificado_por: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha_modificacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tbl_me_productos',
    schema: 'mipyme',
    timestamps: false
});
exports.Productos.belongsTo(categoria_models_1.Categorias, {
    foreignKey: 'id_categoria',
    as: 'categoria' // Alias para la relación
});
exports.Productos.belongsTo(paises_models_1.Paises, {
    foreignKey: 'id_pais',
    as: 'paises' // Alias para la relación
});
exports.Productos.belongsTo(contacto_models_1.Contacto, {
    foreignKey: 'id_contacto',
    as: 'contacto' // Alias para la relación
});
