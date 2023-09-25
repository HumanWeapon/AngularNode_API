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
        allowNull: true
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true
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
        allowNull: true
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado_usuario: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    fecha_ultima_conexion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    preguntas_contestadas: {
        type: DataTypes.STRING,
        allowNull: true
    },
    primer_ingreso: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    fecha_vencimiento: {
        type: DataTypes.DATE,
        allowNull: true
    }
    }, 
    {
    tableName: 'tbl_ms_usuario',
    schema: 'mipyme',
    timestamps: false
})