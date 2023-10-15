import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/usuario-models';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {

    const {
        usuario,
        contrasena,
        id_usuario,
        creado_por,
        fecha_creacion,
        modificado_por,
        fecha_modificacion,
        nombre_usuario,
        correo_electronico,
        estado_usuario,
        id_rol,
        fecha_ultima_conexion,
        primer_ingreso,
        fecha_vencimiento,
        intentos_fallidos
    } = req.body
    
    try {
        // Busca el usuario en la base de datos
        const user: any = await User.findOne({
            where: { usuario: usuario }
        });

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario/contraseña inválidos.'
            });
        }

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const passwordValid = await bcrypt.compare(contrasena, user.contrasena);

        if (!passwordValid) {
            // Si la contraseña es incorrecta, aumenta el contador de intentos fallidos
            user.intentos_fallidos = (user.intentos_fallidos || 0) + 1;
            await user.save();

            if (user.intentos_fallidos >= 3) {
                // Si el usuario ha alcanzado 3 intentos fallidos, bloquea el usuario
                user.estado_usuario = 3;
                await user.save();
            }

            return res.status(400).json({
                msg: 'Usuario/contraseña inválidos.',
            });
        }else{
            // Si el inicio de sesión es exitoso, restablece los intentos fallidos
            user.intentos_fallidos = 0;
            await user.save();
        }

        if(user.fecha_ultima_conexion == null){
            return res.json(user.fecha_ultima_conexion);
        }

        // Validar estado del usuario
        if (user.estado_usuario != 1) {
            return res.status(400).json({
                msg: 'Usuario Inactivo',
            });
        }

        // Genera el token
        const token = jwt.sign({
            usuario: usuario
        }, process.env.SECRET_KEY || 'Lamers005*');
            
        res.json(token);
    } catch (error) {
        console.error('Error en loginUser:', error);
        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: error.message
            });
        } else {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: 'Error desconocido' // Otra manejo de errores si no es una instancia de Error
            });
        }
    }
    
}
//Obtiene todos los usuarios de la base de datos
export const getAllUsuarios = async (req: Request, res: Response) => {
    const usuarios = await User.findAll();
    res.json(usuarios)
}
//Obtiene un usuario especifico de la base de datos
export const getUsuario = async (req: Request, res: Response) => {
    const { usuario } = req.body;
    const user = await User.findOne({
        where: {usuario: usuario}
    });
    if(user){
        res.json(user)
    }
    else{
        res.status(404).json({
            msg: `No existe el usuario: ${usuario}`
        })
    }
}
//Inserta un usuario en la base de datos
export const postUsuario = async (req: Request, res: Response) => {

    const { 
        creado_por, fecha_creacion, modificado_por, fecha_modificacion, usuario, nombre_usuario, correo_electronico, 
        contrasena, id_rol, fecha_ultima_conexion, fecha_vencimiento, intentos_fallidos, estado_usuario  } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    try{
        const user = await User.findOne({
            where: {usuario: usuario}
        })
    
        if (user){
            return res.status(400).json({
                msg: 'Usuario ya existe en la base de datos: '+ usuario
            })
        }else{
            await User.create({
                creado_por: creado_por,
                fecha_creacion: Date.now(),
                modificado_por: modificado_por,
                fecha_modificacion: Date.now(),
                usuario: usuario,
                nombre_usuario: nombre_usuario,
                correo_electronico: correo_electronico,
                estado_usuario: estado_usuario,
                contrasena: hashedPassword,
                id_rol: id_rol,
                fecha_ultima_conexion: null,
                fecha_vencimiento: fecha_vencimiento,
                intentos_fallidos: intentos_fallidos
            })
            res.json({
                msg: 'Usuario: '+ usuario+  ' creado exitosamente',
            })
        }
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
    /*// Generamos token
    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
    res.json(token);*/
}
//Destruye el usuario de la DBA
export const deleteUsuario = async (req: Request, res: Response) => {
    const { usuario } = req.body;

    const user = await User.findOne({
        where: {usuario: usuario}
    });
    if(!user){
        return res.status(404).json({
            msg: "El usuario no existe: "+ usuario
        });
    }

    await user.destroy();
    res.json({
        msg: 'Usuario: '+ usuario+  ' eliminado exitosamente',
    });
}
//Inactiva el usuario de la DBA
export const inactivateUsuario = async (req: Request, res: Response) => {
    const { usuario } = req.body;

    const user = await User.findOne({
        where: {usuario: usuario}
    });
    if(!user){
        return res.status(404).json({
            msg: "El usuario no existe: "+ usuario
        });
    }

    await user.update({
        estado_usuario: 2
    });
    res.json({
        msg: 'Usuario: '+ usuario+  ' inactivado exitosamente',
    });
}
//Activa el usuario de la DBA
export const activateUsuario = async (req: Request, res: Response) => {
    const { usuario } = req.body;

    const user = await User.findOne({
        where: {usuario: usuario}
    });
    if(!user){
        return res.status(404).json({
            msg: "El usuario no existe: "+ usuario
        });
    }

    await user.update({
        estado_usuario: 1
    });
    res.json({
        msg: 'Usuario: '+ usuario+  ' ha sido activado exitosamente',
    });
}
//Actualiza el usuario en la base de datos
export const updateUsuario = async (req: Request, res: Response) => {
    const { 
        usuario,
        modificado_por,
        fecha_modificacion,
        nombre_usuario,
        correo_electronico,
        estado_usuario,
        id_rol,
        fecha_vencimiento
     } = req.body;

    const user = await User.findOne({
        where: {usuario: usuario}
    });
    if(!user){
        return res.status(404).json({
            msg: "El usuario no existe: "+ usuario
        });
    }

    await user.update({
        usuario: usuario,
        modificado_por: modificado_por,
        fecha_modificacion: fecha_modificacion,
        nombre_usuario: nombre_usuario,
        correo_electronico: correo_electronico,
        estado_usuario: estado_usuario,
        id_rol: id_rol,
        fecha_vencimiento: fecha_vencimiento
    });
    res.json({
        msg: 'Usuario: '+ usuario+  ' ha sido actualizado exitosamente',
    });
}
//Desbloquea la contraseña
export const cambiarContrasena = async (req: Request, res: Response) => {
    try {
        const { usuario, contrasena } = req.body;
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const user = await User.findOne({
            where: {usuario: usuario}
        });
        if(!user){
            return res.status(400).json({
                msg: 'Usuario no existe',
            });
        }
        await user.update({
            contrasena: hashedPassword,
            estado_usuario: 1,
            intentos_fallidos: 0
        });
        res.json({
            msg: 'Tu contraseña ha sido cambiada con éxito',
        });

    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar tu contraseña'});
    }
}