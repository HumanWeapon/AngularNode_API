import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { Contacto } from './contacto-models'
import { TipoDireccion } from './tipoDireccion-models'

export const DireccionesContactos: any = dataBase.define('direccionesContacto', {
    id_direccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tipo_direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
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
    tableName: 'tbl_me_direcciones_contactos',
    schema: 'mipyme',
    timestamps: false
});
DireccionesContactos.belongsTo(TipoDireccion, {
    foreignKey: 'id_tipo_direccion',
    as: 'tipoDireccion' // Alias para la relación
});