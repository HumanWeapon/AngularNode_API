import { DataTypes } from 'sequelize';
import dataBase from '../db/connection';

export const Bitacora: any = dataBase.define('bitacora', {
    id_bitacora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_objeto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_ms_bitacora',
    schema: 'mipyme',
    timestamps: false
})