"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objetos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Objetos = connection_1.default.define('objetos', {
    id_objeto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    objeto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tipo_objeto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    icono: {
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
    estado_objeto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tbl_ms_objetos',
    schema: 'mipyme',
    timestamps: false
});
