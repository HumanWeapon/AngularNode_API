import { DataTypes } from 'sequelize';
import dataBase from '../../../db/connection';
import { Empresas } from '../empresas-model';
import { Contacto } from '../contacto-models';

export const OperacionesEmpresasContacto: any = dataBase.define('operaciones_empresas_productos', {
    id_emp_contactos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_contacto: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
{
    tableName: 'tbl_op_empresas_contactos',
    schema: 'mipyme',
    timestamps: false
});

OperacionesEmpresasContacto.belongsTo(Empresas, {
    foreignKey: 'id_empresa',
    targetKey: 'id_empresa',
    as: 'empresa' // Alias para la relación
});

OperacionesEmpresasContacto.belongsTo(Contacto, {
    foreignKey: 'id_contacto',
    targetKey: 'id_contacto',
    as: 'contacto' // Alias para la relación
});
