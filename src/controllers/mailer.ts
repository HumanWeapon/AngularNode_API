import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "ismaelmidence07@gmail.com",
      pass: "qfhy rayk pboo phbd",
    },
});

try {
    transporter.verify().then (() =>{
        console.log('Listo para enviar Correos');
    });
} catch (error) {
    console.error('Error al verificar el transportador:', error);
}
