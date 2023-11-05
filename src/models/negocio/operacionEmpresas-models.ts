import { DataTypes } from 'sequelize';
import dataBase from '../../db/connection';
import { tipoEmpresa } from './tipo_empresa-models'
import { Paises } from './paises-models';
import { Contacto } from './contacto-models';

export const operacionEmpresas: any = dataBase.define('operacionempresas', {
    id_operacion_empresas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_empresa: {
        type: DataTypes.INTEGER,
      },
      id_tipo_empresa: {
        type: DataTypes.INTEGER,
      },
      id_contacto: {
        type: DataTypes.INTEGER,
      },
    rtn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    casa_matriz: {
        type: DataTypes.BOOLEAN,
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
      }
    }, 
    {
    tableName: 'tbl_me_operacion_empresas',
    schema: 'mipyme',
    timestamps: false
});

operacionEmpresas.belongsTo(tipoEmpresa, {
    foreignKey: 'id_tipo_empresa',
    as: 'tipoEmpresa' // Alias para la relación
});

operacionEmpresas.belongsTo(Paises, {
    foreignKey: 'id_pais',
    as: 'paises' // Alias para la relación
});

operacionEmpresas.belongsTo(Contacto, {
    foreignKey: 'id_contacto',
    as: 'contacto' // Alias para la relación
});