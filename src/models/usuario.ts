import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const User = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    creado_por: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    modificado_por: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado_usuario: {
        type: DataTypes.BOOLEAN,
    },
    contrasena: {
        type: DataTypes.STRING,
    },
    id_rol: {
        type: DataTypes.NUMBER,
    },
    fecha_ultima_conexion: {
        type: DataTypes.DATE,
    },
    preguntas_contestadas: {
        type: DataTypes.STRING,
    },
    primer_ingreso: {
        type: DataTypes.BOOLEAN,
    },
    fecha_vencimiento: {
        type: DataTypes.DATE,
    },
    


}, {
    tableName: 'tbl_ms_usuario',
    schema: 'mipyme',
    timestamps: false
})