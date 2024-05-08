import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { Paises } from './paises-models'; // Asegúrate de que la importación sea correcta
import { Productos } from './productos-models';

export const Tipo_Requisito: any = dataBase.define('tipo_requisito', {
    id_tipo_requisito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    tipo_requisito: {
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
    id_pais: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_me_tipo_requisito',
    schema: 'mipyme',
    timestamps: false
});

Tipo_Requisito.belongsTo(Paises, {
    foreignKey: 'id_pais',
    targetKey: 'id_pais',
    as: 'paises' // Alias para la relación
});

Tipo_Requisito.belongsTo(Productos, {
    foreignKey: 'id_producto',
    targetKey: 'id_producto',
    as: 'productos' // Alias para la relación
});