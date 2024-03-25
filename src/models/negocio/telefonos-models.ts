import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { tipoTelefono } from './tipo_telefono-models';
import { Paises } from './paises-models'; // Asegúrate de que la importación sea correcta
import { Contacto } from './contacto-models'; // Asegúrate de que la importación sea correcta


export const ContactoTelefono: any = dataBase.define('contactoTelefono', {
    id_telefono: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cod_area: {
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
    id_contacto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_pais: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_me_telefonos',
    schema: 'mipyme',
    timestamps: false
});

ContactoTelefono.belongsTo(Paises, {
    foreignKey: 'id_pais',
    targetKey: 'id_pais',
    as: 'paises' // Alias para la relación
});

ContactoTelefono.belongsTo(Contacto, {
    foreignKey: 'id_contacto',
    targetKey: 'id_contacto',
    as: 'contacto' // Alias para la relación
});

/*                                          FRANKLIN ALEXANDER MURILLO CRUZ
                                                CUENTA: 20151021932
 */