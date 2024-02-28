import { DataTypes } from 'sequelize';
import dataBase from '../../../db/connection';
import { Empresas } from '../empresas-model';
import { Productos } from '../productos-models';
import { DireccionesContactos } from '../direccionesContacto-model';

export const OperacionesEmpresasDirecciones: any = dataBase.define('operaciones_empresas_direcciones', {
    id_emp_dir: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_direccion: {
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
    tableName: 'tbl_op_empresas_direcciones',
    schema: 'mipyme',
    timestamps: false
});

OperacionesEmpresasDirecciones.belongsTo(Empresas, {
    foreignKey: 'id_empresa',
    targetKey: 'id_empresa',
    as: 'empresa' // Alias para la relación
});

OperacionesEmpresasDirecciones.belongsTo(DireccionesContactos, {
    foreignKey: 'id_direccion',
    targetKey: 'id_direccion',
    as: 'producto' // Alias para la relación
});
