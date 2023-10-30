import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';

export const Contacto: any = dataBase.define('contacto', {
    id_contacto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tipo_contacto: {
        type: DataTypes.INTEGER,
        references: {
          model: 'TipoContacto', // Nombre del modelo al que hace referencia
          key: 'id' // Nombre del campo al que hace referencia en el modelo 'TipoContacto'
        }
      },
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primer_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    segundo_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primer_apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    segundo_apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
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
    tableName: 'tbl_me_contacto',
    schema: 'mipyme',
    timestamps: false
})


















/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */