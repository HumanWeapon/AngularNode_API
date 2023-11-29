import { DataTypes } from 'sequelize';
import dataBase from '../db/connection';

export const Parametros: any = dataBase.define('roles', {
    id_parametro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parametro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },    
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    creado_por: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modificado_por: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado_parametro: {
        type: DataTypes.INTEGER,
        allowNull: false
    }   
    }, 
    {
    tableName: 'tbl_ms_parametros',
    schema: 'mipyme',
    timestamps: false
})