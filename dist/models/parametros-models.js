"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametros = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Parametros = connection_1.default.define('roles', {
    id_parametro: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parametro: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fecha_modificacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    creado_por: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    modificado_por: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado_parametro: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tbl_ms_parametros',
    schema: 'mipyme',
    timestamps: false
});
