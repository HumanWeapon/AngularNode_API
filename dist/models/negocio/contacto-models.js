"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
exports.Contacto = connection_1.default.define('contacto', {
    id_contacto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tipo_contacto: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'TipoContacto',
            key: 'id' // Nombre del campo al que hace referencia en el modelo 'TipoContacto'
        }
    },
    dni: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    primer_nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    segundo_nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    primer_apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    segundo_apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correo: {
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
    tableName: 'tbl_me_contacto',
    schema: 'mipyme',
    timestamps: false
});
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
