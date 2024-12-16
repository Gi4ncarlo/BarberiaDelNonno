"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const brevo_1 = require("@getbrevo/brevo");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Instancia de la API de correos transaccionales
const apiInstance = new brevo_1.TransactionalEmailsApi();
// Configuración de la clave API
apiInstance.setApiKey(brevo_1.TransactionalEmailsApiApiKeys.apiKey, process.env.SENDINBLUE_API_KEY || "");
const sendEmailRegister = (email, name, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("dentro del sendEmailRegister email ", email);
    console.log("dentro del sendEmailRegister name ", name);
    console.log("dentro del sendEmailRegister username ", username);
    console.log("dentro del sendEmailRegister password ", password);
    // Creación del contenido del correo utilizando una plantilla
    const sendSmtpEmail = new brevo_1.SendSmtpEmail();
    sendSmtpEmail.to = [{ email, name }];
    sendSmtpEmail.templateId = 1;
    sendSmtpEmail.params = {
        NAME: name,
        USERNAME: username,
        PASSWORD: password,
    };
    sendSmtpEmail.sender = {
        name: "Barberia",
        email: "giancarlozanarini11@gmail.com",
    };
    try {
        const result = yield apiInstance.sendTransacEmail(sendSmtpEmail);
        if (result && result.body) {
            console.log(`Correo enviado exitosamente. Message ID: ${result.body.messageId}`);
        }
        else {
            console.error("Error en la respuesta del servidor.");
        }
    }
    catch (error) {
        console.error("Error al enviar el correo:", error);
    }
});
exports.default = sendEmailRegister;
