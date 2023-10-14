import { DataTypes } from 'sequelize';
import dataBase from '../db/connection';

export const User: any = dataBase.define('usuario', {
        id_usuario: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        creado_por: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        modificado_por: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fecha_modificacion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre_usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo_electronico: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estado_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_rol: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        fecha_ultima_conexion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fecha_vencimiento: {
            type: DataTypes.DATE,
            allowNull: true
        },
        intentos_fallidos: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
    tableName: 'tbl_ms_usuario',
    schema: 'mipyme',
    timestamps: false
})