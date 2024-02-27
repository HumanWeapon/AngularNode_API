"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionesEmpresasProductos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../db/connection"));
const empresas_model_1 = require("../empresas-model");
const productos_models_1 = require("../productos-models");
exports.OperacionesEmpresasProductos = connection_1.default.define('operaciones_empresas_productos', {
    id_emp_prod: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_empresa: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER,
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
    tableName: 'tbl_op_empresas_productos',
    schema: 'mipyme',
    timestamps: false
});
exports.OperacionesEmpresasProductos.belongsTo(empresas_model_1.Empresas, {
    foreignKey: 'id_empresa',
    targetKey: 'id_empresa',
    as: 'empresa' // Alias para la relación
});
exports.OperacionesEmpresasProductos.belongsTo(productos_models_1.Productos, {
    foreignKey: 'id_producto',
    targetKey: 'id_producto',
    as: 'producto' // Alias para la relación
});
