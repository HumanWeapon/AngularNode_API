import { DataTypes } from 'sequelize';
import dataBase from '../../../db/connection';
import { Empresas } from '../empresas-model';
import { Productos } from '../productos-models';

export const OperacionesEmpresasProductos: any = dataBase.define('operaciones_empresas_productos', {
    id_emp_prod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Descripcion: {
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
    tableName: 'Operaciones_Empresas_Productos',
    schema: 'mipyme',
    timestamps: false
});

OperacionesEmpresasProductos.belongsTo(Empresas, {
    foreignKey: 'id_empresa',
    targetKey: 'id_empresa',
    as: 'empresa' // Alias para la relación
});

OperacionesEmpresasProductos.belongsTo(Productos, {
    foreignKey: 'id_producto',
    targetKey: 'id_producto',
    as: 'producto' // Alias para la relación
});
