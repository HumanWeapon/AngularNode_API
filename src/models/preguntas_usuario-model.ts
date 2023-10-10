import { DataTypes } from "sequelize";
import dataBase from "../db/connection";
import { Preguntas } from "./preguntas-model";

export const PreguntasUsuario: any = dataBase.define('preguntas_usuario', {
    id_preguntas_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pregunta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    respuesta: {
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false
    }
    }, 
    {
    tableName: 'tbl_ms_preguntas_usuario',
    schema: 'mipyme',
    timestamps: false
})
// Configura la asociación con el modelo Preguntas
PreguntasUsuario.belongsTo(Preguntas, {
    foreignKey: 'id_pregunta', // Campo en PreguntasUsuario que hace referencia a Preguntas
    as: 'pregunta' // Alias para la relación
});