import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';

export const Tipo_Requisito: any = dataBase.define('tipo_requisito', {
    id_tipo_requisito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    tipo_requisito: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
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
    estado: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_me_tipo_requisito',
    schema: 'mipyme',
    timestamps: false
})