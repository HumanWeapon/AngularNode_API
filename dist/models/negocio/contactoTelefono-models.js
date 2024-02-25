"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactoTelefono = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const tipo_telefono_models_1 = require("./tipo_telefono-models");
exports.ContactoTelefono = connection_1.default.define('contactoTelefono', {
    id_telefono: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tipo_telefono: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    extencion: {
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
    tableName: 'tbl_me_telefonos',
    schema: 'mipyme',
    timestamps: false
});
exports.ContactoTelefono.belongsTo(tipo_telefono_models_1.tipoTelefono, {
    foreignKey: 'id_tipo_telefono',
    as: 'tipo_telefono' // Alias para la relación
});
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
