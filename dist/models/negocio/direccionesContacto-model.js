"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direcciones = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const tipoDireccion_models_1 = require("./tipoDireccion-models");
const ciudades_models_1 = require("./ciudades-models");
exports.Direcciones = connection_1.default.define('direccionesContacto', {
    id_direccion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tipo_direccion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_empresa: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_ciudad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_pais: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    direccion: {
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
    tableName: 'tbl_me_direcciones',
    schema: 'mipyme',
    timestamps: false
});
exports.Direcciones.belongsTo(ciudades_models_1.Ciudades, {
    foreignKey: 'id_ciudad',
    as: 'ciudad' // Alias para la relación con la tabla de ciudades
});
exports.Direcciones.belongsTo(tipoDireccion_models_1.TipoDireccion, {
    foreignKey: 'id_tipo_direccion',
    as: 'tipo_direccion' // Alias para la relación con la tabla de países
});
