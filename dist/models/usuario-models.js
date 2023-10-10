"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.User = connection_1.default.define('usuario', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    creado_por: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    modificado_por: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    fecha_modificacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
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
        allowNull: true
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_rol: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    },
    fecha_ultima_conexion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    primer_ingreso: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    fecha_vencimiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    intentos_fallidos: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'tbl_ms_usuario',
    schema: 'mipyme',
    timestamps: false
});
