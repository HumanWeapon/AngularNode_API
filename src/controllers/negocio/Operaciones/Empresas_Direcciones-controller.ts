import { Request, Response } from 'express';
import db from '../../../db/connection';

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