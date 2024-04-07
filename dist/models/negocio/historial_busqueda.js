"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Historial_Busqueda = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Historial_Busqueda = connection_1.default.define('historial_busqueda', {
    id_historial: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_pyme: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_pais: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_empresa: {
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
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    }
}, {
    tableName: 'tbl_me_historial_busqueda',
    schema: 'mipyme',
    timestamps: false
});
