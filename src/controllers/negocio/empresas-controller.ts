import {Request, Response} from 'express';
import { Empresas } from '../../models/negocio/empresas-model';
import { tipoEmpresa } from '../../models/negocio/tipoEmpresa-models';
import db from '../../db/connection'

// Obtiene todas las Empresas con el tipo de empresa
export const getAllEmpresas = async (req: Request, res: Response) => {
    try {
        const empresas = await Empresas.findAll({
            include: {
                model: tipoEmpresa,
                as: 'tipoEmpresa' // Usar el alias definido en la asociación
            }
        });
        res.json(empresas);
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener todas las empresas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//Obtiene todas las Empresas pyme o exportadoreas
export const getEmpresasPymes = async (req: Request, res: Response) => {
    const { id_tipo_empresa } = req.body;
try {
    const empresa = await Empresas.findAll({
        where: {id_tipo_empresa: id_tipo_empresa}
    });
    res.json(empresa)
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

//Obtiene una Empresa por ID
export const getEmpresa = async (req: Request, res: Response) => {
    const { id_empresa } = req.body;
try {
    const _empresa = await Empresas.findOne({
        where: {id_empresa: id_empresa}
    });
    if(_empresa){
        res.json(_empresa)
    }
    else{
        res.status(404).json({
            msg: `el ID de la Empresa no existe: ${id_empresa}`
        })
    }
} catch (error) {
    res.status(400).json({
        msg: 'Contactate con el administrador',
        error
    }); 
}
}

// Inserta una nueva Empresa en la base de datos
export const postEmpresa = async (req: Request, res: Response) => {

    const { id_tipo_empresa, nombre_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;

    try{
        const _empresa = await Empresas.findOne({
            where: {nombre_empresa: nombre_empresa}
        })
        if (_empresa){
            return res.status(400).json({
                msg: 'Empresa ya registrada en la base de datos: '+ nombre_empresa
            })
        }else{
            const empresa = await Empresas.create({
                id_tipo_empresa:id_tipo_empresa,
                nombre_empresa: nombre_empresa.toUpperCase(),
                descripcion: descripcion.toUpperCase(), 
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: fecha_creacion,
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: fecha_modificacion,
                estado: estado
            })
            //res.json(empresa)
            const empresas = await Empresas.findOne({
                where: {nombre_empresa: empresa.nombre_empresa},
                include: {
                    model: tipoEmpresa,
                    as: 'tipoEmpresa' // Usar el alias definido en la asociación
                }
            });
            res.json(empresas);
        
    }
}
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

// Elimina la Pyme de la base de datos
export const deleteEmpresa = async (req: Request, res: Response) => {
    const { id_empresa } = req.body; // Obtén el ID desde los parámetros de la URL

    try {
        const _empresa = await Empresas.findOne({
            where: { id_empresa: id_empresa}
        });

        if (_empresa) {
            await _empresa.destroy();
            res.json(_empresa);
        } else {
            res.status(404).json({
                msg: 'No se encontró una Empresa con el ID ' + id_empresa,
            });
        }
    } catch (error) {
        console.error('Error al eliminar la Empresa:', error);
        res.status(500).json({
            msg: 'Hubo un error al eliminar la Empresa',
        });
    }
};

//actualiza el Telefono en la base de datos
export const updateEmpresa = async (req: Request, res: Response) => {
    const { id_empresa, id_tipo_empresa, nombre_empresa, descripcion, creado_por, fecha_creacion, modificado_por, fecha_modificacion, estado} = req.body;
try {
    const _empresa = await Empresas.findOne({
        where: {id_empresa: id_empresa}
    });
    if(!_empresa){
        return res.status(404).json({
            msg: 'Empresa con el ID: '+ id_empresa +' no existe en la base de datos'
        });
    }else{
        const empresa = await _empresa.update({
         id_empresa: id_empresa,
         id_tipo_empresa:id_tipo_empresa,
         nombre_empresa: nombre_empresa.toUpperCase(),
         descripcion: descripcion.toUpperCase(), 
         creado_por: creado_por.toUpperCase(),
         fecha_creacion: fecha_creacion,
         modificado_por: modificado_por.toUpperCase(),
         fecha_modificacion: fecha_modificacion,
         estado: estado
        
        });
        const empresas = await Empresas.findOne({
            where: {id_empresa: empresa.id_empresa},
            include: {
                model: tipoEmpresa,
                as: 'tipoEmpresa' // Usar el alias definido en la asociación
            }
        });
        res.json(empresas);
    }
} catch (error) {
    console.error('Error al actualizar la empresa:', error);
    res.status(500).json({ 
        msg: 'Hubo un error al actualizar la empresa',
});
}
}

//Inactiva la empresa
export const inactivateEmpresa = async (req: Request, res: Response) => {
    const { id_empresa } = req.body;
try {
    const empresa = await Empresas.findOne({
        where: {id_empresa: id_empresa}
    });
    if(!empresa){
        return res.status(404).json({
            msg: "La Empresa no existe"
        });
    }

    await empresa.update({
        estado: 2
    });
    res.json(empresa);

} catch (error) {
    console.error('Error al inactivar la empresa:', error);
    res.status(500).json({
        msg: 'Hubo un error al inactivar la empresa',

    });
}
}

//Activa la empresa
export const activateEmpresa = async (req: Request, res: Response) => {
    const { id_empresa } = req.body;
    try {
        const empresa = await Empresas.findOne({
            where: {id_empresa: id_empresa}
        });
        if(!empresa){
            return res.status(404).json({
                msg: "La Empresa no existe"
            });
        }

        await empresa.update({
            estado: 1
        });
        res.json('Empresa activada');


    } catch (error) {
        console.error('Error al activar la empres:', error);
        res.status(500).json({
            msg: 'Hubo un error al activar la empresa',

        });
    }
}
//OBTIENE LAS EMPRESAS PARA MOSTRARLAS EN EL SEARCH
export const getEmpresaSearch = async (req: Request, res: Response) => {
    const { id_empresa } = req.params; // Leer los parámetros de consulta

    try {
        const query = `
        SELECT
        *
        FROM mipyme.tbl_me_empresas EMPRESA
        WHERE EMPRESA.id_empresa = ?
            AND EMPRESA.estado = 1
        `;

        const params = [id_empresa]; // Parámetros de consulta

        const [results, metadata] = await db.query(query, { replacements: params });
        
        // Verificar si hay resultados
        if (results && results.length > 0) {
            res.json(results);
        } else {
            // Si no hay resultados, enviar un array vacío
            res.json([]);
        }
    } catch (error) {
        console.error('Error contacte al administrador:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}