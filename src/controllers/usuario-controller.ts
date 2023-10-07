import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/usuario-models';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
    const { 
        id_usuario,
        creado_por,
        fecha_creacion,
        modificado_por,
        fecha_modificacion,
        usuario, 
        nombre_usuario,
        correo_electronico,
        estado_usuario,
        contrasena,
        id_rol,
        fecha_ultima_conexion,
        preguntas_contestadas,
        primer_ingreso,
        fecha_vencimiento

     } = req.body;

    
    
    //Validar si el usuario existe en la base de datos
    const user: any = await User.findOne({
        where: {usuario: usuario}
    })

    try{
        if(!user){
            return res.status(400).json({
                msg: 'usuario/contraseña invalidos.'
            })
        }
    }catch(error){
        res.status(400).json({
            msg: 'Error',
            error
        }); 
    }

    //Validamos password

// Compara la contraseña proporcionada con la almacenada en la base de datos
    const passwordValid = await bcrypt.compare(contrasena, user.contrasena);

    if (!passwordValid) {
        return res.status(400).json({
            msg: 'usuario/contraseña invalidos.',
        });
    }

// Validar estado del usuario
    if (!user.estado_usuario) {
        return res.status(400).json({
        msg: 'Usuario Inactivo',
        });
    }
    // Generamos token

    const token = jwt.sign({
        usuario: usuario
    }, process.env.SECRET_KEY || 'Lamers005*');
        
    res.json(token);
}

//Obtiene todos los usuarios de la base de datos
export const getAllUsuarios = async (req: Request, res: Response) => {
    const usuarios = await User.findAll();
    res.json({usuarios})
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

    const { usuario, nombre_usuario, correo_electronico, contrasena  } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const fecha_creacion = Date.now();

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
                fecha_creacion: fecha_creacion,
                usuario: usuario,
                nombre_usuario: nombre_usuario,
                correo_electronico: correo_electronico,
                contrasena: hashedPassword
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

//
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
        estado_usuario: false
    });
    res.json({
        msg: 'Usuario: '+ usuario+  ' inactivado exitosamente',
    });
}

//
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
        estado_usuario: true
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