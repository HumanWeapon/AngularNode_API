import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { TipoContacto } from './tipoContacto-models';
import { Empresas } from './empresas-model';

export const Contacto: any = dataBase.define('contacto', {
    id_contacto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tipo_contacto: {
        type: DataTypes.INTEGER,
    },
    id_empresa: {
        type: DataTypes.INTEGER,
    },
    nombre_completo: {
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
    tableName: 'tbl_me_contactos',
    schema: 'mipyme',
    timestamps: false
});
Contacto.belongsTo(TipoContacto, {
    foreignKey: 'id_tipo_contacto',
    as: 'tipo_contacto' // Alias para la relación
});
Contacto.belongsTo(Empresas, {
    foreignKey: 'id_empresa',
    as: 'empresa' // Alias para la relación con Empresa
});