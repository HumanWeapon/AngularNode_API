import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { Contacto } from './contacto-models'
import { TipoDireccion } from './tipoDireccion-models'
import { Ciudades } from './ciudades-models';
import { Paises } from './paises-models';

export const Direcciones: any = dataBase.define('direccionesContacto', {
    id_direccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tipo_direccion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_ciudad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_pais: {
        type: DataTypes.INTEGER,
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
    tableName: 'tbl_me_direcciones',
    schema: 'mipyme',
    timestamps: false
});
Direcciones.belongsTo(Ciudades, {
    foreignKey: 'id_ciudad',
    as: 'ciudad' // Alias para la relación con la tabla de ciudades
});
Direcciones.belongsTo(TipoDireccion, {
    foreignKey: 'id_tipo_direccion',
    as: 'tipo_direccion' // Alias para la relación con la tabla de países
});