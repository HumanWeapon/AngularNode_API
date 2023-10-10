import { DataTypes } from 'sequelize';
import dataBase from '../db/connection';

export const Preguntas: any = dataBase.define('preguntas', {
    id_pregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pregunta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creado_por: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    modificado_por: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_ms_preguntas',
    schema: 'mipyme',
    timestamps: false
})