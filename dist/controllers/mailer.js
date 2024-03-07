"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ismaelmidence07@gmail.com",
        pass: "qfhy rayk pboo phbd",
    },
});
try {
    exports.transporter.verify().then(() => {
        console.log('Listo para enviar Correos');
    });
}
catch (error) {
    console.error('Error al verificar el transportador:', error);
}
