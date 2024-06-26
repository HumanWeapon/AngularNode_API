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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuario_models_1 = require("./usuario-models");
const connection_1 = __importDefault(require("../db/connection"));
// Rutas API
const preguntas_1 = __importDefault(require("../routes/preguntas"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const preguntas_usuario_1 = __importDefault(require("../routes/preguntas_usuario"));
const parametros_1 = __importDefault(require("../routes/parametros"));
const rol_1 = __importDefault(require("../routes/rol"));
const objetos_1 = __importDefault(require("../routes/objetos"));
const permisos_1 = __importDefault(require("../routes/permisos"));
const paises_1 = __importDefault(require("../routes/negocio/paises"));
const ciudades_1 = __importDefault(require("../routes/negocio/ciudades"));
const tipoDireccion_1 = __importDefault(require("../routes/negocio/tipoDireccion"));
const tipoContacto_1 = __importDefault(require("../routes/negocio/tipoContacto"));
const contacto_1 = __importDefault(require("../routes/negocio/contacto"));
const Telefonos_1 = __importDefault(require("../routes/negocio/Telefonos"));
const tipotelefono_1 = __importDefault(require("../routes/negocio/tipotelefono"));
const pyme_1 = __importDefault(require("../routes/negocio/pyme"));
const Bitacora_1 = __importDefault(require("../routes/Bitacora"));
const tipoEmpresa_1 = __importDefault(require("../routes/negocio/tipoEmpresa"));
const categoria_1 = __importDefault(require("../routes/negocio/categoria"));
const Tipo_Requisito_1 = __importDefault(require("../routes/negocio/Tipo_Requisito"));
const productos_1 = __importDefault(require("../routes/negocio/productos"));
const empresas_1 = __importDefault(require("../routes/negocio/empresas"));
const operacionEmpresas_1 = __importDefault(require("../routes/negocio/operacionEmpresas"));
const direcciones_1 = __importDefault(require("../routes/negocio/direcciones"));
const Empresas_Productos_1 = __importDefault(require("../routes/negocio/Operaciones/Empresas_Productos"));
const Emprersas_Contactos_1 = __importDefault(require("../routes/negocio/Operaciones/Emprersas_Contactos"));
const historial_busqueda_1 = __importDefault(require("../routes/negocio/historial_busqueda"));
const consultas_pyme_1 = __importDefault(require("../routes/consultas-pyme"));
const backup_1 = __importDefault(require("../routes/backup"));
const restaurar_1 = __importDefault(require("../routes/restaurar"));
class Server {
    constructor() {
        console.log('Estoy en el constructor');
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnectValidate();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('App corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/users', usuario_1.default);
        this.app.use('/api/preguntas', preguntas_1.default);
        this.app.use('/api/preguntasusuario', preguntas_usuario_1.default);
        this.app.use('/api/parametros', parametros_1.default);
        this.app.use('/api/roles', rol_1.default);
        this.app.use('/api/objetos', objetos_1.default);
        this.app.use('/api/permisos', permisos_1.default);
        this.app.use('/api/bitacora', Bitacora_1.default);
        this.app.use('/api/paises', paises_1.default);
        this.app.use('/api/ciudades', ciudades_1.default); //FM
        this.app.use('/api/tipoDireccion', tipoDireccion_1.default); //FM
        this.app.use('/api/tipoContacto', tipoContacto_1.default); //FM
        this.app.use('/api/contacto', contacto_1.default); //FM
        this.app.use('/api/telefonos', Telefonos_1.default); //FM
        this.app.use('/api/tipotelefono', tipotelefono_1.default);
        this.app.use('/api/pyme', pyme_1.default);
        this.app.use('/api/categoria', categoria_1.default); //BF
        this.app.use('/api/tipoEmpresa', tipoEmpresa_1.default);
        this.app.use('/api/tipo_requisito', Tipo_Requisito_1.default);
        this.app.use('/api/productos', productos_1.default);
        this.app.use('/api/empresa', empresas_1.default);
        this.app.use('/api/opempresa', operacionEmpresas_1.default);
        this.app.use('/api/direcciones', direcciones_1.default);
        this.app.use('/api/empresas_productos', Empresas_Productos_1.default);
        this.app.use('/api/empresas_contactos', Emprersas_Contactos_1.default);
        this.app.use('/api/historial_busqueda', historial_busqueda_1.default);
        this.app.use('/api/consultas_pyme', consultas_pyme_1.default);
        this.app.use('/api/generar_backup', backup_1.default);
        this.app.use('/api/restaurar', restaurar_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        // Configurar CORS
        this.app.use((0, cors_1.default)({}));
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield usuario_models_1.User.sync();
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
    dbConnectValidate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
