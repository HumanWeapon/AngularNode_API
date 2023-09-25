"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.User = connection_1.default.define('usuarios', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    creado_por: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    modificado_por: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha_modificacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    nombre_usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    correo_electronico: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    estado_usuario: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_rol: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    fecha_ultima_conexion: {
        type: sequelize_1.DataTypes.DATE,
    },
    preguntas_contestadas: {
        type: sequelize_1.DataTypes.STRING,
    },
    primer_ingreso: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    fecha_vencimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    tableName: 'tbl_ms_usuario',
    schema: 'mipyme',
    timestamps: false
});
