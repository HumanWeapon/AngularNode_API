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
    // Suponiendo que 'user' es un objeto que contiene la propiedad 'fecha_vencimiento' con la fecha de vencimiento del usuario
    const fechaActual = new Date();
    
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
        //VALIDA SI EL USUARIO HA EXPIRADO
        // Convertimos la cadena de fecha en formato ISO 8601 a un objeto Date
        const fechaVencimientoUsuario = new Date(user.fecha_vencimiento);
        // Comparamos las fechas
        if (fechaActual > fechaVencimientoUsuario) {
            // Actualizar el estado de los usuarios cuya fecha de vencimiento haya pasado
            user.estado_usuario = 4;
            await user.save();
            // La fecha de vencimiento del usuario es anterior o igual a la fecha actual, por lo que el usuario ha expirado
            return res.status(400).json({
                msg: 'Tu usuario ha expirado, contacta con el administrador',
            });
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
        creado_por, modificado_por, usuario, nombre_usuario, correo_electronico, 
        contrasena, id_rol, fecha_vencimiento, intentos_fallidos, estado_usuario  } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    try{
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { usuario: usuario } });
        if (existingUser){
            return res.status(400).json({
                msg: 'El usuario ya existe en la base de datos: ' + usuario
            });
        }

        // Verificar si el correo electrónico ya está registrado
        const existingEmail = await User.findOne({ where: { correo_electronico: correo_electronico } });
        if (existingEmail){
            return res.status(400).json({
                msg: 'El correo electrónico ya está registrado en la base de datos: ' + correo_electronico
            });
        }

        // Si el usuario y el correo electrónico no están duplicados, crear el nuevo usuario
        const newUser = await User.create({
            usuario: usuario.toUpperCase(),
            nombre_usuario: nombre_usuario.toUpperCase(),
            correo_electronico: correo_electronico.toUpperCase(),
            contrasena: hashedPassword,
            id_rol: id_rol,
            fecha_ultima_conexion: null,
            fecha_vencimiento: fecha_vencimiento,
            intentos_fallidos: intentos_fallidos,
            creado_por: creado_por.toUpperCase(),
            fecha_creacion: Date.now(),
            modificado_por: modificado_por.toUpperCase(),
            fecha_modificacion: Date.now(),
            estado_usuario: estado_usuario
        });

        // Obtener los detalles del usuario recién creado
        const getuser = await User.findOne({
            where: { usuario: newUser.usuario },
            include: [
                {
                    model: Roles,
                    as: 'roles' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        res.json(getuser);
    }
    catch (error){
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        }); 
    }
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

        const token = jwt.sign({ userId: user.id_usuario }, config.jwtSecretReset, { expiresIn: '4m' });
        verificationLink = `https://utilidadmipyme.netlify.app/reset-password/${token}`;

        try {
            await transporter.sendMail({
                from: '"Recuperacion de Contraseña" <utilidadMiPyme>',
                to: user.correo_electronico,
                subject: "Recuperacion de Contraseña ✔ Utilidad MiPyme",
                html: `
                <div style="text-align: center;">
                <img src="https://www.comercioexterior.org.ar/img/noticias/grandes/5663-1.png" alt="MIPyme" width="200">
                <h1 style="font-size: 24px; color: #333333;">MIPyme</h1>
                </div>
                <br>
                <b>Hola ${user.nombre_usuario},</b>
                <br>
                <p>Por favor haz clic en el siguiente enlace para restablecer tu contraseña:</p>
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

        try {
            // Verificar el token y obtener el payload
            const jwtPayload = jwt.verify(resetToken, config.jwtSecretReset) as { userId: number };

            // Buscar al usuario utilizando el userId del payload
            user = await User.findOne({ where: { resetToken, id_usuario: jwtPayload.userId } });

            if (!user) {
                return res.status(402).json({ message: 'Token de reinicio inválido' });
            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // Token expirado
                return res.status(401).json({ message: 'El enlace para restablecer la contraseña a expirado' });
            } else {
                throw error;
            }
        }

        // Hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Actualizar la contraseña y limpia el Token de Restablecimiento
        await user.update({ contrasena: hashedPassword});

        return res.json({ message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        //return res.status(500).json({ message: 'Error al restablecer la contraseña' });
    }
}



// Función para generar una contraseña aleatoria
const generarContraseñaAleatoria = (): string => {
  const longitud = 12; // Longitud de la contraseña
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  let contraseña = '';

  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    contraseña += caracteres.charAt(indice);
  }

  return contraseña;
};

export const reestablecer = async (req: Request, res: Response) => {
    const { correo_electronico } = req.body;

    console.log('Correo Electrónico recibido:', correo_electronico); // Agregar este registro de depuración

    if (!correo_electronico) {
        return res.status(400).json({ message: 'El Correo Electrónico es Requerido!' });
    }

    let emailStatus = 'OK';

    try {
        const user = await User.findOne({ where: { correo_electronico } });
        console.log('Correo Electrónico recibido en el FindOne:', correo_electronico); // Agregar este registro de depuración

        if (!user) {
            return res.status(400).json({ message: 'Correo Electrónico no encontrado' });
        }

        // Generar la nueva contraseña aleatoria
        const newPassword = generarContraseñaAleatoria();

        console.log('Tu nueva Contraseña es: '+ newPassword)
        // Guardar la nueva contraseña en la base de datos
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.contrasena = hashedPassword;
        await user.save();

        // Envía el correo electrónico con la nueva contraseña
        try {
            await transporter.sendMail({
                from: '"Reestablecer Contraseña" <utilidadMiPyme>',
                to: user.correo_electronico,
                subject: "Reestablecer Contraseña ✔ Utilidad MiPyme",
                html: `
                <div style="text-align: center;">
                <img src="https://www.comercioexterior.org.ar/img/noticias/grandes/5663-1.png" alt="MIPyme" width="200">
                <h1 style="font-size: 24px; color: #333333;">MIPyme</h1>
                </div>
                <br>
                <b>Hola ${user.nombre_usuario},</b>
                <br>
                <p>Se ha restablecido tu contraseña. A continuación, encontrarás tus nuevos detalles de inicio de sesión:</p>
                <p>Usuario ${user.usuario}</p>
                <p>Nueva Contraseña: ${newPassword}</p>
                <p>Te recomendamos cambiar tu contraseña de restablecimiento en tu perfil por una nueva. Puedes hacerlo ingresando a tu cuenta y navegando a la sección de perfil.</p>
                `
            });
            
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        }

        console.log('Contraseña guardada en la base de datos:', hashedPassword); // Agregar este registro de depuración

        return res.json({ message: 'Se ha enviado la nueva contraseña a tu correo electrónico', userEmail: user.correo_electronico, info: emailStatus });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        emailStatus = 'error';
        return res.status(500).json({ message: 'Error al restablecer la contraseña' });
    }
}


async function actualizarEstadoUsuariosVencidos(): Promise<void> {
    try {
        // Actualizar el estado de los usuarios cuya fecha de vencimiento haya pasado
        const currentDate = new Date();
        await User.update(
            { estado_usuario: 3 }, // 3 es el estado para "Vencido"
            {
                where: {
                    fecha_vencimiento: { [User.sequelize.Op.gt]: currentDate }, // Compara con la fecha actual
                },
            }
        );
        console.log('Actualización de usuarios vencidos ejecutada con éxito');
    } catch (error) {
        console.error('Error al ejecutar la actualización de usuarios vencidos:', error);
    }
}
  