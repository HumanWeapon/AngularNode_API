import { DataTypes } from 'sequelize';
import dataBase from '../db/connection';
import { Roles } from './roles-models';
import { Objetos } from './objetos-models';

export const Permisos: any = dataBase.define('permisos', {
    id_permisos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_objeto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    permiso_insercion: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    permiso_eliminacion: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },  
    permiso_actualizacion: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },  
    permiso_consultar: {
        type: DataTypes.BOOLEAN,
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
    estado_permiso: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_ms_permisos',
    schema: 'mipyme',
    timestamps: false
});
Permisos.belongsTo(Roles, {
    foreignKey: 'id_rol', // Campo en User que hace referencia a Roles
    as: 'roles' // Alias para la relación
});
Permisos.belongsTo(Objetos, {
    foreignKey: 'id_objeto', // Campo en User que hace referencia a Roles
    as: 'objetos' // Alias para la relación
});