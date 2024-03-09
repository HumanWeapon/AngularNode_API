import {Request, Response, request} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/usuario-models';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { Roles } from '../models/roles-models';
import { Objetos } from '../models/objetos-models';
import { Permisos } from '../models/permisos-models';
import config from './config';
import { transporter } from './mailer';
import { PreguntasUsuario} from '../models/preguntas_usuario-model'

export const loginUser = async (req: Request, res: Response) => {
    const {
        usuario,
        contrasena
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
    try {
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
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
}

export const getCorreoElectronicoPorUsuario = async (req: Request, res: Response) => {
    try {
        const { usuario } = req.body;
        const user = await User.findOne({
            attributes: ['correo_electronico'], // Solo selecciona el campo de correo electrónico
            where: { usuario: usuario }
        });
        if (user) {
            res.json(user.correo_electronico); // Devuelve solo el correo electrónico
        } else {
            res.status(404).json({
                msg: `No existe el usuario: ${usuario}`
            });
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
};
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
            const newUser = await User.create({
                creado_por: creado_por.toUpperCase(),
                fecha_creacion: Date.now(),
                modificado_por: modificado_por.toUpperCase(),
                fecha_modificacion: Date.now(),
                usuario: usuario.toUpperCase(),
                nombre_usuario: nombre_usuario.toUpperCase(),
                correo_electronico: correo_electronico.toUpperCase(),
                contrasena: hashedPassword,
                id_rol: id_rol,
                fecha_ultima_conexion: null,
                fecha_vencimiento: fecha_vencimiento,
                intentos_fallidos: intentos_fallidos
            })
            return res.json(newUser); // Devolver el nuevo usuario creado como respuesta
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
    res.json(user);
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
    res.json(user);
}
//Actualiza el usuario en la base de datos
export const updateUsuario = async (req: Request, res: Response) => {
    const { 
        id_usuario,
        usuario,
        modificado_por,
        fecha_modificacion,
        nombre_usuario,
        correo_electronico,
        estado_usuario,
        id_rol,
        fecha_vencimiento,
        fecha_ultima_conexion
     } = req.body;

    const user = await User.findOne({
        where: {id_usuario: id_usuario}
    });
    if(!user){
        return res.status(404).json({
            msg: "El usuario con el ID: "+id_usuario+ " no existe"
        });
    }

    await user.update({
        id_usuario: id_usuario,
        usuario: usuario.toUpperCase(),
        modificado_por: modificado_por.toUpperCase(),
        fecha_modificacion: fecha_modificacion,
        nombre_usuario: nombre_usuario.toUpperCase(),
        correo_electronico: correo_electronico.toUpperCase(),
        estado_usuario: estado_usuario,
        id_rol: id_rol,
        fecha_vencimiento: fecha_vencimiento,
        fecha_ultima_conexion: fecha_ultima_conexion
    });
    res.json(user);
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
// Realiza una consulta INNER JOIN entre las tablas Usuario y Roles
export const usuariosAllRoles = async (req: Request, res: Response) => {
    try {
        const usuario = await User.findAll({
            include: [
                {
                    model: Roles,
                    as: 'roles' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener preguntas de usuario:', error);
        res.status(500).json({ error: 'Error al obtener preguntas de usuario' });
    }
}
// Realiza una consulta INNER JOIN entre las tablas Usuario, Roles y Objetos
export const usuariosAllParametros = async (req: Request, res: Response) => {
    const { usuario } = req.body;
    try {
      const Users = await User.findOne({
        where: { usuario: usuario },
        include: [
          {
            model: Roles,
            as: 'roles',
            include: [
              {
                model: Permisos,
                as: 'permisos',
                include: [
                    {
                      where: { usuario: usuario },
                      model: Permisos ,
                      as: 'permisos',
                    },
                  ],
              },
            ],
          },
        ],
      });
  
      res.json(Users);
    } catch (error) {
      console.error('Error al obtener parámetros de usuario:', error);
      res.status(500).json({ error: 'Error al obtener parámetros de usuario de usuario' });
    }
}
  
  export const forgotPassword = async (req: Request, res: Response) => {
    const { correo_electronico } = req.body;

    if (!correo_electronico) {
        return res.status(400).json({ message: 'El Correo Electronico es Requerido!' });
    }

    let emailStatus = 'OK';
    let verificationLink;

    try {
        const user = await User.findOne({ where: { correo_electronico } });

        if (!user) {
            return res.status(400).json({ message: 'Correo Electronico no encontrado' });
        }

        const token = jwt.sign({ userId: user.id_usuario }, config.jwtSecretReset, { expiresIn: '10m' });
        verificationLink = `http://localhost:4200/resetPassword${token}`;

        user.resetToken = token;
        await user.save();

        try {
            await transporter.sendMail({
                from: '"Recuperacion de Contraseña" <utilidadMiPyme>',
                to: user.correo_electronico,
                subject: "Recuperacion de Contraseña ✔ Utilidad MiPyme",
                html: `
                <b>Por favor da click en el enlace para poder recuperar tu contraseña:</b>
                <a href="${verificationLink}">${verificationLink}</a>
                `
            });
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        }

        return res.json({ message: 'Verifica tu correo electrónico', userEmail: user.correo_electronico, info: emailStatus });
    } catch (error) {
        console.error('Error al generar el token de restablecimiento:', error);
        emailStatus = 'error';
        return res.status(500).json({ message: 'Error al generar el token de restablecimiento' });
    }
}



export const resetPassword = async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const resetToken = req.headers.reset as string;

    try {
        if (!resetToken || !newPassword || typeof resetToken !== 'string' || typeof newPassword !== 'string') {
            return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' });
        }

        let user;
        let jwtPayload; 

        jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
        user = await User.findOne({ where: { resetToken } });

        if (!user) {
            return res.status(401).json({ message: 'Token de reinicio inválido' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ contrasena: hashedPassword, resetToken: resetToken });

        return res.json({ message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        return res.status(500).json({ message: 'Error al restablecer la contraseña' });
    }
}


//Nueva Contraseña
/*export const newPassword = async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const resetToken = req.headers.reset as string;

    if (!(resetToken && newPassword)) {
        return res.status(400).json({ message: 'Todos los valores son requeridos' });
    }

    let user;
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
        user = await User.findOne({ where: { resetToken } });

        if (!user) {
            return res.status(401).json({ message: 'Token de reinicio inválido' });
        }

        user.contrasena = newPassword;
        const validationOps = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOps);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        // Hashear la nueva contraseña antes de guardarla
        user.hashPassword();
        await user.save();
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);

        // Verificar el tipo de error y devolver un mensaje más específico
        let errorMessage;
           if (error instanceof JsonWebTokenError) {
              errorMessage = 'El token de reinicio es inválido';
           } else {
               errorMessage = 'Ocurrió un error al cambiar la contraseña';
}

        return res.status(500).json({ message: errorMessage });
    }

    res.json({ message: 'Se cambió la contraseña correctamente' });
}*/




 

