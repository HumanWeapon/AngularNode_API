"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactoTelefono = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const paises_models_1 = require("./paises-models"); // Asegúrate de que la importación sea correcta
const contacto_models_1 = require("./contacto-models"); // Asegúrate de que la importación sea correcta
exports.ContactoTelefono = connection_1.default.define('contactoTelefono', {
    id_telefono: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cod_area: {
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
    },
    id_contacto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_pais: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tbl_me_telefonos',
    schema: 'mipyme',
    timestamps: false
});
exports.ContactoTelefono.belongsTo(paises_models_1.Paises, {
    foreignKey: 'id_pais',
    targetKey: 'id_pais',
    as: 'paises' // Alias para la relación
});
exports.ContactoTelefono.belongsTo(contacto_models_1.Contacto, {
    foreignKey: 'id_contacto',
    targetKey: 'id_contacto',
    as: 'contacto' // Alias para la relación
});
/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */ 
