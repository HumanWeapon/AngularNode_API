"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.operacionEmpresas = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const tipo_empresa_models_1 = require("./tipo_empresa-models");
const paises_models_1 = require("./paises-models");
const contacto_models_1 = require("./contacto-models");
exports.operacionEmpresas = connection_1.default.define('operacionempresas', {
    id_operacion_empresas: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_empresa: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_tipo_empresa: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_contacto: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    rtn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    casa_matriz: {
        type: sequelize_1.DataTypes.BOOLEAN,
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
    },
    id_pais: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tbl_me_operacion_empresas',
    schema: 'mipyme',
    timestamps: false
});
exports.operacionEmpresas.belongsTo(tipo_empresa_models_1.tipoEmpresa, {
    foreignKey: 'id_tipo_empresa',
    as: 'tipoEmpresa' // Alias para la relación
});
exports.operacionEmpresas.belongsTo(paises_models_1.Paises, {
    foreignKey: 'id_pais',
    as: 'paises' // Alias para la relación
});
exports.operacionEmpresas.belongsTo(contacto_models_1.Contacto, {
    foreignKey: 'id_contacto',
    as: 'contacto' // Alias para la relación
});
