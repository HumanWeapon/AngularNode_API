import { DataTypes } from 'sequelize';
import dataBase from '../db/connection';
import { User } from './usuario-models';
import { Objetos } from './objetos-models';

export const Bitacora: any = dataBase.define('bitacora', {
    id_bitacora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_objeto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    campo_original: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nuevo_campo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accion: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_ms_bitacora',
    schema: 'mipyme',
    timestamps: false
});
// Define la asociación
Bitacora.belongsTo(User, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
Bitacora.belongsTo(Objetos, { foreignKey: 'id_objeto', targetKey: 'id_objeto' });