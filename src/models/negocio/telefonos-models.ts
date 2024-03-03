import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { tipoTelefono } from './tipo_telefono-models';

export const ContactoTelefono: any = dataBase.define('contactoTelefono', {
    id_telefono: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    tableName: 'tbl_me_telefonos',
    schema: 'mipyme',
    timestamps: false
});

/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */