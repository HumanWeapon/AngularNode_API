import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';

export const Paises: any = dataBase.define('paises', {
    id_pais: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_contacto: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Contacto', // Nombre del modelo al que hace referencia
          key: 'id' // Nombre del campo al que hace referencia en el modelo 'Contacto'
        }
      },
    pais: {
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
    cod_pais: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_me_paises',
    schema: 'mipyme',
    timestamps: false
})