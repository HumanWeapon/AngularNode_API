"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bitacora = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_models_1 = require("./usuario-models");
const objetos_models_1 = require("./objetos-models");
exports.Bitacora = connection_1.default.define('bitacora', {
    id_bitacora: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_objeto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    campo_original: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nuevo_campo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    accion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tbl_ms_bitacora',
    schema: 'mipyme',
    timestamps: false
});
// Define la asociación
exports.Bitacora.belongsTo(usuario_models_1.User, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
exports.Bitacora.belongsTo(objetos_models_1.Objetos, { foreignKey: 'id_objeto', targetKey: 'id_objeto' });
