import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { Categorias} from './categoria-models';
import { Paises } from './paises-models';
import { Contacto } from './contacto-models';

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
    id_pais: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_contacto: {
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
});

Productos.belongsTo(Categorias, {
    foreignKey: 'id_categoria',
    as: 'categoria' // Alias para la relación
});
Productos.belongsTo(Paises, {
    foreignKey: 'id_pais',
    as: 'paises' // Alias para la relación
});

Productos.belongsTo(Contacto, {
    foreignKey: 'id_contacto',
    as: 'contacto' // Alias para la relación
});