import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';

export const tipoTelefono: any = dataBase.define('tipo_telefono', {
    id_tipo_telefono: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    tipo_telefono: {
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
    tableName: 'tbl_me_tipo_telefono',
    schema: 'mipyme',
    timestamps: false
})