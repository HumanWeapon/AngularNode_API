import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';

export const ContactoTelefono: any = dataBase.define('contactoTelefono', {
    id_telefono: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_contacto: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Contacto', // Nombre del modelo al que hace referencia
          key: 'id' // Nombre del campo al que hace referencia en el modelo 'Contacto'
        }
      },
      id_tipo_telefono: {
        type: DataTypes.INTEGER,
        references: {
          model: 'TipoTelefono', // Nombre del modelo al que hace referencia
          key: 'id' // Nombre del campo al que hace referencia en el modelo 'TipoTelefono'
        }
      },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extencion: {
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
    tableName: 'tbl_me_contacto_telefono',
    schema: 'mipyme',
    timestamps: false
})













/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */