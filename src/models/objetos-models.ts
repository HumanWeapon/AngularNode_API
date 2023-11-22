import { DataTypes } from 'sequelize';
import dataBase from '../db/connection';

export const Objetos: any = dataBase.define('objetos', {
    id_objeto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    objeto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_objeto: {
        type: DataTypes.STRING,
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
    },
    estado_objeto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_ms_objetos',
    schema: 'mipyme',
    timestamps: false
})