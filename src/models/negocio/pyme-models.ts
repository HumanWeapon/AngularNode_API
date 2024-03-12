import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { tipoEmpresa } from './tipoEmpresa-models';
import { Roles } from '../roles-models';

export const Pyme: any = dataBase.define('pyme', {
    id_pyme: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_pyme: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rtn: {
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
    },
    fecha_ultima_conexion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_me_pyme',
    schema: 'mipyme',
    timestamps: false
});
Pyme.belongsTo(Roles, {
    foreignKey: 'id_rol',
    as: 'rol', // Nombre del alias para la relación
});