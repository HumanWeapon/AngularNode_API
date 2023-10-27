"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const roles_models_1 = require("./roles-models");
exports.User = connection_1.default.define('usuario', {
    id_usuario: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
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
        allowNull: false
    },
    correo_electronico: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    estado_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_rol: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    fecha_ultima_conexion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    fecha_vencimiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    intentos_fallidos: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tbl_ms_usuario',
    schema: 'mipyme',
    timestamps: false
});
exports.User.belongsTo(roles_models_1.Roles, {
    foreignKey: 'id_rol',
    as: 'roles' // Alias para la relación
});
