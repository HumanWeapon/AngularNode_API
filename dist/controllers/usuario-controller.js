"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reestablecer = exports.resetPassword = exports.forgotPassword = exports.usuariosAllParametros = exports.usuariosAllRoles = exports.cambiarContrasena = exports.updateUsuario = exports.activateUsuario = exports.inactivateUsuario = exports.postUsuario = exports.getCorreoElectronicoPorUsuario = exports.getUsuario = exports.getAllUsuarios = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_models_1 = require("../models/usuario-models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roles_models_1 = require("../models/roles-models");
const permisos_models_1 = require("../models/permisos-models");
const config_1 = __importDefault(require("./config"));
const mailer_1 = require("./mailer");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, contrasena } = req.body;
    // Suponiendo que 'user' es un objeto que contiene la propiedad 'fecha_vencimiento' con la fecha de vencimiento del usuario
    const fechaActual = new Date();
    try {
        // Busca el usuario en la base de datos
        const user = yield usuario_models_1.User.findOne({
            where: { usuario: usuario }
        });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario/contraseña inválidos.'
            });
        }
        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const passwordValid = yield bcrypt_1.default.compare(contrasena, user.contrasena);
        if (!passwordValid) {
            // Si la contraseña es incorrecta, aumenta el contador de intentos fallidos
            user.intentos_fallidos = (user.intentos_fallidos || 0) + 1;
            yield user.save();
            if (user.intentos_fallidos >= 3) {
                // Si el usuario ha alcanzado 3 intentos fallidos, bloquea el usuario
                user.estado_usuario = 3;
                yield user.save();
            }
            return res.status(400).json({
                msg: 'Usuario/contraseña inválidos.',
            });
        }
        else {
            // Si el inicio de sesión es exitoso, restablece los intentos fallidos
            user.intentos_fallidos = 0;
            yield user.save();
        }
        if (user.fecha_ultima_conexion == null) {
            return res.json(user.fecha_ultima_conexion);
        }
        //VALIDA SI EL USUARIO HA EXPIRADO
        // Convertimos la cadena de fecha en formato ISO 8601 a un objeto Date
        const fechaVencimientoUsuario = new Date(user.fecha_vencimiento);
        // Comparamos las fechas
        if (fechaActual > fechaVencimientoUsuario) {
            // Actualizar el estado de los usuarios cuya fecha de vencimiento haya pasado
            user.estado_usuario = 4;
            yield user.save();
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
        const token = jsonwebtoken_1.default.sign({
            usuario: usuario
        }, process.env.SECRET_KEY || 'Lamers005*');
        res.json(token);
    }
    catch (error) {
        console.error('Error en loginUser:', error);
        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: error.message
            });
        }
        else {
            res.status(500).json({
                msg: 'Error en el servidor',
                error: 'Error desconocido' // Otra manejo de errores si no es una instancia de Error
            });
        }
    }
});
exports.loginUser = loginUser;
//Obtiene todos los usuarios de la base de datos
const getAllUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_models_1.User.findAll();
    res.json(usuarios);
});
exports.getAllUsuarios = getAllUsuarios;
//Obtiene un usuario especifico de la base de datos
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario } = req.body;
        const user = yield usuario_models_1.User.findOne({
            where: { usuario: usuario }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                msg: `No existe el usuario: ${usuario}`
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getUsuario = getUsuario;
const getCorreoElectronicoPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario } = req.body;
        const user = yield usuario_models_1.User.findOne({
            attributes: ['correo_electronico'],
            where: { usuario: usuario }
        });
        if (user) {
            res.json(user.correo_electronico); // Devuelve solo el correo electrónico
        }
        else {
            res.status(404).json({
                msg: `No existe el usuario: ${usuario}`
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.getCorreoElectronicoPorUsuario = getCorreoElectronicoPorUsuario;
//Inserta un usuario en la base de datos
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { creado_por, modificado_por, usuario, nombre_usuario, correo_electronico, contrasena, id_rol, fecha_vencimiento, intentos_fallidos, estado_usuario } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
    try {
        // Verificar si el usuario ya existe
        const existingUser = yield usuario_models_1.User.findOne({ where: { usuario: usuario } });
        if (existingUser) {
            return res.status(400).json({
                msg: 'El usuario ya existe en la base de datos: ' + usuario
            });
        }
        // Verificar si el correo electrónico ya está registrado
        const existingEmail = yield usuario_models_1.User.findOne({ where: { correo_electronico: correo_electronico } });
        if (existingEmail) {
            return res.status(400).json({
                msg: 'El correo electrónico ya está registrado en la base de datos: ' + correo_electronico
            });
        }
        // Si el usuario y el correo electrónico no están duplicados, crear el nuevo usuario
        const newUser = yield usuario_models_1.User.create({
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
        const getuser = yield usuario_models_1.User.findOne({
            where: { usuario: newUser.usuario },
            include: [
                {
                    model: roles_models_1.Roles,
                    as: 'roles' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        res.json(getuser);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Contactate con el administrador',
            error
        });
    }
});
exports.postUsuario = postUsuario;
//Destruye el usuario de la DBA
//Inactiva el usuario de la DBA
const inactivateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    const user = yield usuario_models_1.User.findOne({
        where: { usuario: usuario }
    });
    if (!user) {
        return res.status(404).json({
            msg: "El usuario no existe: " + usuario
        });
    }
    yield user.update({
        estado_usuario: 2
    });
    res.json(user);
});
exports.inactivateUsuario = inactivateUsuario;
//Activa el usuario de la DBA
const activateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    const user = yield usuario_models_1.User.findOne({
        where: { usuario: usuario }
    });
    if (!user) {
        return res.status(404).json({
            msg: "El usuario no existe: " + usuario
        });
    }
    yield user.update({
        estado_usuario: 1
    });
    res.json(user);
});
exports.activateUsuario = activateUsuario;
//Actualiza el usuario en la base de datos
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, usuario, modificado_por, fecha_modificacion, nombre_usuario, correo_electronico, estado_usuario, id_rol, fecha_vencimiento, fecha_ultima_conexion } = req.body;
    const user = yield usuario_models_1.User.findOne({
        where: { id_usuario: id_usuario }
    });
    if (!user) {
        return res.status(404).json({
            msg: "El usuario con el ID: " + id_usuario + " no existe"
        });
    }
    yield user.update({
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
});
exports.updateUsuario = updateUsuario;
//Desbloquea la contraseña
const cambiarContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, contrasena } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(contrasena, 10);
        const user = yield usuario_models_1.User.findOne({
            where: { usuario: usuario }
        });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario no existe',
            });
        }
        yield user.update({
            contrasena: hashedPassword,
            estado_usuario: 1,
            intentos_fallidos: 0
        });
        res.json({
            msg: 'Tu contraseña ha sido cambiada con éxito',
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al cambiar tu contraseña' });
    }
});
exports.cambiarContrasena = cambiarContrasena;
// Realiza una consulta INNER JOIN entre las tablas Usuario y Roles
const usuariosAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_models_1.User.findAll({
            include: [
                {
                    model: roles_models_1.Roles,
                    as: 'roles' // Usa el mismo alias que en la definición de la asociación
                },
            ],
        });
        res.json(usuario);
    }
    catch (error) {
        console.error('Error al obtener preguntas de usuario:', error);
        res.status(500).json({ error: 'Error al obtener preguntas de usuario' });
    }
});
exports.usuariosAllRoles = usuariosAllRoles;
// Realiza una consulta INNER JOIN entre las tablas Usuario, Roles y Objetos
const usuariosAllParametros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    try {
        const Users = yield usuario_models_1.User.findOne({
            where: { usuario: usuario },
            include: [
                {
                    model: roles_models_1.Roles,
                    as: 'roles',
                    include: [
                        {
                            model: permisos_models_1.Permisos,
                            as: 'permisos',
                            include: [
                                {
                                    where: { usuario: usuario },
                                    model: permisos_models_1.Permisos,
                                    as: 'permisos',
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        res.json(Users);
    }
    catch (error) {
        console.error('Error al obtener parámetros de usuario:', error);
        res.status(500).json({ error: 'Error al obtener parámetros de usuario de usuario' });
    }
});
exports.usuariosAllParametros = usuariosAllParametros;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo_electronico } = req.body;
    if (!correo_electronico) {
        return res.status(400).json({ message: 'El Correo Electronico es Requerido!' });
    }
    let emailStatus = 'OK';
    let verificationLink;
    try {
        const user = yield usuario_models_1.User.findOne({ where: { correo_electronico } });
        if (!user) {
            return res.status(400).json({ message: 'Correo Electronico no encontrado' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id_usuario }, config_1.default.jwtSecretReset, { expiresIn: '4m' });
        verificationLink = `https://utilidadmipyme.netlify.app/reset-password/${token}`;
        user.resetToken = token;
        yield user.save();
        try {
            yield mailer_1.transporter.sendMail({
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
        }
        catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        }
        return res.json({ message: 'Verifica tu correo electrónico', userEmail: user.correo_electronico, info: emailStatus });
    }
    catch (error) {
        console.error('Error al generar el token de restablecimiento:', error);
        emailStatus = 'error';
        return res.status(500).json({ message: 'Error al generar el token de restablecimiento' });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword } = req.body;
    const resetToken = req.headers.reset;
    try {
        if (!resetToken || !newPassword || typeof resetToken !== 'string' || typeof newPassword !== 'string') {
            return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' });
        }
        let user;
        try {
            // Verificar el token y obtener el payload
            const jwtPayload = jsonwebtoken_1.default.verify(resetToken, config_1.default.jwtSecretReset);
            // Buscar al usuario utilizando el userId del payload
            user = yield usuario_models_1.User.findOne({ where: { resetToken, id_usuario: jwtPayload.userId } });
            if (!user) {
                return res.status(401).json({ message: 'Token de reinicio inválido' });
            }
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                // Token expirado
                return res.status(401).json({ message: 'El enlace o token ha expirado. Por favor, solicita un nuevo enlace de restablecimiento de contraseña.' });
            }
            else {
                throw error;
            }
        }
        // Hash de la nueva contraseña
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        // Actualizar la contraseña y limpiar el resetToken
        yield user.update({ contrasena: hashedPassword, resetToken: null });
        return res.json({ message: 'Contraseña restablecida con éxito' });
    }
    catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        //return res.status(500).json({ message: 'Error al restablecer la contraseña' });
    }
});
exports.resetPassword = resetPassword;
// Función para generar una contraseña aleatoria
const generarContraseñaAleatoria = () => {
    const longitud = 12; // Longitud de la contraseña
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
    let contraseña = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contraseña += caracteres.charAt(indice);
    }
    return contraseña;
};
const reestablecer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo_electronico } = req.body;
    console.log('Correo Electrónico recibido:', correo_electronico); // Agregar este registro de depuración
    if (!correo_electronico) {
        return res.status(400).json({ message: 'El Correo Electrónico es Requerido!' });
    }
    let emailStatus = 'OK';
    try {
        const user = yield usuario_models_1.User.findOne({ where: { correo_electronico } });
        console.log('Correo Electrónico recibido en el FindOne:', correo_electronico); // Agregar este registro de depuración
        if (!user) {
            return res.status(400).json({ message: 'Correo Electrónico no encontrado' });
        }
        // Generar la nueva contraseña aleatoria
        const newPassword = generarContraseñaAleatoria();
        console.log('Tu nueva Contraseña es: ' + newPassword);
        // Guardar la nueva contraseña en la base de datos
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        user.contrasena = hashedPassword;
        yield user.save();
        // Envía el correo electrónico con la nueva contraseña
        try {
            yield mailer_1.transporter.sendMail({
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
                <p>Correo Electrónico: ${user.correo_electronico}</p>
                <p>Nueva Contraseña: ${newPassword}</p>
                <p>Te recomendamos cambiar tu contraseña de restablecimiento en tu perfil por una nueva. Puedes hacerlo ingresando a tu cuenta y navegando a la sección de perfil.</p>
                `
            });
        }
        catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        }
        console.log('Contraseña guardada en la base de datos:', hashedPassword); // Agregar este registro de depuración
        return res.json({ message: 'Se ha enviado la nueva contraseña a tu correo electrónico', userEmail: user.correo_electronico, info: emailStatus });
    }
    catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        emailStatus = 'error';
        return res.status(500).json({ message: 'Error al restablecer la contraseña' });
    }
});
exports.reestablecer = reestablecer;
function actualizarEstadoUsuariosVencidos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Actualizar el estado de los usuarios cuya fecha de vencimiento haya pasado
            const currentDate = new Date();
            yield usuario_models_1.User.update({ estado_usuario: 3 }, // 3 es el estado para "Vencido"
            {
                where: {
                    fecha_vencimiento: { [usuario_models_1.User.sequelize.Op.gt]: currentDate }, // Compara con la fecha actual
                },
            });
            console.log('Actualización de usuarios vencidos ejecutada con éxito');
        }
        catch (error) {
            console.error('Error al ejecutar la actualización de usuarios vencidos:', error);
        }
    });
}
