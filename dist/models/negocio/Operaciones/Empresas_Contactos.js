"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionesEmpresasContacto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../db/connection"));
const empresas_model_1 = require("../empresas-model");
const contacto_models_1 = require("../contacto-models");
exports.OperacionesEmpresasContacto = connection_1.default.define('operaciones_empresas_productos', {
    id_emp_contactos: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_empresa: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_contacto: {
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
    tableName: 'tbl_op_empresas_contactos',
    schema: 'mipyme',
    timestamps: false
});
exports.OperacionesEmpresasContacto.belongsTo(empresas_model_1.Empresas, {
    foreignKey: 'id_empresa',
    targetKey: 'id_empresa',
    as: 'empresa' // Alias para la relación
});
exports.OperacionesEmpresasContacto.belongsTo(contacto_models_1.Contacto, {
    foreignKey: 'id_contacto',
    targetKey: 'id_contacto',
    as: 'contacto' // Alias para la relación
});
