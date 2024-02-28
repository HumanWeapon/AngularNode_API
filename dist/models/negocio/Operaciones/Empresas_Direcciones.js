"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionesEmpresasDirecciones = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../db/connection"));
const empresas_model_1 = require("../empresas-model");
const direccionesContacto_model_1 = require("../direccionesContacto-model");
exports.OperacionesEmpresasDirecciones = connection_1.default.define('operaciones_empresas_direcciones', {
    id_emp_dir: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_empresa: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_direccion: {
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
    tableName: 'tbl_op_empresas_direcciones',
    schema: 'mipyme',
    timestamps: false
});
exports.OperacionesEmpresasDirecciones.belongsTo(empresas_model_1.Empresas, {
    foreignKey: 'id_empresa',
    targetKey: 'id_empresa',
    as: 'empresa' // Alias para la relación
});
exports.OperacionesEmpresasDirecciones.belongsTo(direccionesContacto_model_1.DireccionesContactos, {
    foreignKey: 'id_direccion',
    targetKey: 'id_direccion',
    as: 'producto' // Alias para la relación
});
