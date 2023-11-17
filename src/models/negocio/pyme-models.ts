import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { tipoEmpresa } from './tipoEmpresa-models';

export const Pyme: any = dataBase.define('pyme', {
    id_pyme: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_tipo_empresa: {
        type: DataTypes.INTEGER,
      },
    nombre_pyme: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
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
    tableName: 'tbl_me_pyme',
    schema: 'mipyme',
    timestamps: false
});

Pyme.belongsTo(tipoEmpresa, {
    foreignKey: 'id_tipo_empresa',
    as: 'tipoEmpresa' // Alias para la relación
});