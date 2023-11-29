"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresas = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const tipoEmpresa_models_1 = require("./tipoEmpresa-models");
exports.Empresas = connection_1.default.define('empresas', {
    id_empresa: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tipo_empresa: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    nombre_empresa: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rtn: {
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
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    }
}, {
    tableName: 'tbl_me_empresas',
    schema: 'mipyme',
    timestamps: false
});
exports.Empresas.belongsTo(tipoEmpresa_models_1.tipoEmpresa, {
    foreignKey: 'id_tipo_empresa',
    as: 'tipoEmpresa' // Alias para la relación
});
