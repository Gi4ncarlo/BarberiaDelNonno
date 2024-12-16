import {
    TransactionalEmailsApi,
    SendSmtpEmail,
    TransactionalEmailsApiApiKeys,
  } from "@getbrevo/brevo";

  import * as dotenv from "dotenv";
dotenv.config();

  
  // Instancia de la API de correos transaccionales
  const apiInstance = new TransactionalEmailsApi();
  
  // Configuración de la clave API
  apiInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    process.env.SENDINBLUE_API_KEY || ""
  );
  
  
  const sendEmailRegister = async (
    email: string,
    name: string,
    username: string,
    password: string
  ): Promise<void> => {
  
    console.log("dentro del sendEmailRegister email ", email);
    console.log("dentro del sendEmailRegister name ", name);
    console.log("dentro del sendEmailRegister username ", username);
    console.log("dentro del sendEmailRegister password ", password);
  
    // Creación del contenido del correo utilizando una plantilla
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.to = [{ email, name }];
    sendSmtpEmail.templateId = 1; 
    sendSmtpEmail.params = {
      NAME : name,
      USERNAME: username,
      PASSWORD: password,
    };
    sendSmtpEmail.sender = {
      name: "Barberia",
      email: "giancarlozanarini11@gmail.com",
    };
  
    try {
      const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
  
      if (result && result.body) {
        console.log(
          `Correo enviado exitosamente. Message ID: ${result.body.messageId}`
        );
      } else {
        console.error("Error en la respuesta del servidor.");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };
  
  export default sendEmailRegister;