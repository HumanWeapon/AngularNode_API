import { Request, Response } from 'express';
import db from '../../../db/connection';
import { OperacionesEmpresasContacto } from '../../../models/negocio/Operaciones/Empresas_Contactos';

//obtiene los contactos registrados y no registrados de una empresa
export const consultarContactosNoRegistradosPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            OPERACIONES_CONTACTOS.id_emp_contactos,
            OPERACIONES_CONTACTOS.id_empresa,
            CONTACTOS.id_contacto,
            CASE
                WHEN OPERACIONES_CONTACTOS.id_empresa IS NULL THEN FALSE
                ELSE TRUE
            END AS POSEE_CONTACTO,
            CONTACTOS.id_tipo_contacto,
            TIPO_CONTACTO.tipo_contacto,
            (CONTACTOS.primer_nombre||' '||CONTACTOS.segundo_nombre||' '||CONTACTOS.primer_apellido||' '||CONTACTOS.segundo_apellido) nombre_completo,
            CONTACTOS.descripcion,
            CONTACTOS.creado_por,
            CONTACTOS.fecha_modificacion,
            CONTACTOS.modificado_por,
            CONTACTOS.fecha_modificacion,
            CONTACTOS.estado
        FROM mipyme.tbl_me_contactos AS CONTACTOS
        LEFT JOIN (SELECT * FROM mipyme.tbl_me_tipo_contacto WHERE estado = 1) AS TIPO_CONTACTO
        ON CONTACTOS.id_tipo_contacto = TIPO_CONTACTO.id_tipo_contacto
        LEFT JOIN 
            (
                SELECT * 
                FROM mipyme.tbl_op_empresas_contactos
                WHERE estado = 1 AND id_empresa = ${id}
            ) AS OPERACIONES_CONTACTOS
        ON CONTACTOS.id_contacto = OPERACIONES_CONTACTOS.id_contacto
        WHERE CONTACTOS.ESTADO = 1
        `;

        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar contactos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


//obtiene los contactos registrados de una empresa
export const consultarContactosActivosporId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const query = `
        SELECT 
            A.id_contacto,
            A.id_empresa,
            A.id_tipo_contacto,
            B.tipo_contacto,
            (A.primer_nombre||' '||A.segundo_nombre||' '||A.primer_apellido||' '||A.segundo_apellido) AS nombre_completo,
            A.descripcion,
            A.creado_por,
            A.fecha_creacion
        FROM mipyme.tbl_me_contactos AS A
        LEFT JOIN 
        (
            SELECT * 
            FROM mipyme.tbl_me_tipo_contacto 
            WHERE estado = 1
        ) AS B
        ON A.id_tipo_contacto = B.id_tipo_contacto
        WHERE A.estado = 1
            and A.id_empresa = ${id}
        `;

        const [results, metadata] = await db.query(query);

        res.json(results);
    } catch (error) {
        console.error('Error al consultar contactos:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Agregar un nuevo registro
export const agregarOperacionEmpresaContacto = async (req: Request, res: Response) => {
    try {
        const nuevoRegistro = await OperacionesEmpresasContacto.create(req.body);
        res.json(nuevoRegistro);
    } catch (error) {
        console.error('Error al agregar el contacto:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Eliminar un registro por ID
export const eliminarOperacionEmpresaContacto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const operacion = await OperacionesEmpresasContacto.findByPk(id);
        if (!operacion) {
            return res.status(404).json({ msg: 'Operación empresa producto no encontrada' });
        }
        await operacion.destroy();
        res.json({ msg: 'Contacto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar la operación empresa producto:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};