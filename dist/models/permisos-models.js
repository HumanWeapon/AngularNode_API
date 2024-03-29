"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permisos = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const roles_models_1 = require("./roles-models");
const objetos_models_1 = require("./objetos-models");
exports.Permisos = connection_1.default.define('permisos', {
    id_permisos: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_objeto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    permiso_insercion: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    permiso_eliminacion: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    permiso_actualizacion: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    permiso_consultar: {
        type: sequelize_1.DataTypes.BOOLEAN,
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
    estado_permiso: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    }
}, {
    tableName: 'tbl_ms_permisos',
    schema: 'mipyme',
    timestamps: false
});
exports.Permisos.belongsTo(roles_models_1.Roles, {
    foreignKey: 'id_rol',
    as: 'roles' // Alias para la relación
});
exports.Permisos.belongsTo(objetos_models_1.Objetos, {
    foreignKey: 'id_objeto',
    as: 'objetos' // Alias para la relación
});
