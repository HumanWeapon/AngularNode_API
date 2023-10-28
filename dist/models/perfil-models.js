"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPerfil = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.UserPerfil = connection_1.default.define('user_perfil', {
    usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'tbl_ms_usuario',
    schema: 'mipyme',
    timestamps: false
});
