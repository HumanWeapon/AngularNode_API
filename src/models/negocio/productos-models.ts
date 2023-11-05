import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';

export const Productos: any = dataBase.define('productos', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    producto: {
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
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_me_productos',
    schema: 'mipyme',
    timestamps: false
})