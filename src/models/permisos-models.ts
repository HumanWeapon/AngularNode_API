import { DataTypes } from 'sequelize';
import dataBase from '../db/connection';

export const Permisos: any = dataBase.define('permisos', {
    id_permisos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_objeto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    permiso_insercion: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    permiso_eliminacion: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },  
    permiso_actualizacion: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },  
    permiso_consultar: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
        allowNull: false
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false
    }   
    }, 
    {
    tableName: 'tbl_ms_permisos',
    schema: 'mipyme',
    timestamps: false
})