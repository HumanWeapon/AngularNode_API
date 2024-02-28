import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { Paises } from './paises-models';

export const Ciudades: any = dataBase.define('ciudades', {
    id_ciudad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ciudad: {
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
    },
    id_pais: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_me_ciudades',
    schema: 'mipyme',
    timestamps: false
});
Ciudades.belongsTo(Paises, {
    foreignKey: 'id_pais',
    as: 'pais' // Alias para la relación
});














/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */