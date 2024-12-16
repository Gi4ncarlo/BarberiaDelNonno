import axios from "axios";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "./Register.module.css"

import image from "../../assets/FormImg.jpg"
import { useNavigate } from "react-router-dom";

import Modal from "../../components/ModalLogin";

const Register = () => {
  const navigate = useNavigate(); 
  const [showModal, setShowModal] = useState(false); 
  const [message, setMessage] = useState("");


  const registrar = (values) => {

    axios.post(`${import.meta.env.VITE_PORT}/users/register`, values )
    .then(() => {
       setMessage("Registro Exitoso!");
       setShowModal(true);

       setTimeout(() => {
        setShowModal(false);
        navigate("/users/login"); 
      }, 3000);


    })
    .catch((e) => {
      console.log(e)
      setMessage(`Algo salio mal.. Intente nuevamente`);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    })
  
  }

  const validar = (values) => {
    const errors = {};
    if (!/^[a-zA-Z\s]{3,}$/.test(values.name)) {
      errors.name = " ❌ El nombre ingresado no cumple con la longitud minima ❌ ";
    }

    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/.test(values.email)){
        errors.email = " ❌ El correo ingresado no es valido ❌"
    }

    if(!/^\d{8}$/.test(values.nDni)){
        errors.nDni = " ❌ El dni ingresado es invalido ❌"
    }

    if(!/^[a-zA-Z0-9]{4,16}$/.test(values.username)){
      errors.username = " ❌ El usuario ingresado no cumple con los requisitos alfanumericos ❌"
    }
  
    if(!/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)){
      errors.password = " ❌ La contraseña ingresada es invalida. La longitud minima es de 8 caracteres ❌"
    }

    return errors;
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          birthdate: "",
          nDni: "",
          username: "",
          password: ""
        }}
        onSubmit={ registrar }
        validate={validar}
      >
        <div className={styles.mainContainer}>
        <Form className={styles.formContainer}>
          <h1 className={styles.h1}>Formulario de Registro</h1>
          <label htmlFor="name" className={styles.label}>Nombre</label>
          <Field name="name" type="text" className={styles.input} placeholder="Ingrese su Nombre"/>
          <ErrorMessage name="name" component="div" className={styles.errorMsg}/>
          <label htmlFor="email" className={styles.label}>Email</label>
          <Field name="email" type="email" className={styles.input} placeholder="Ingrese su Email"/>
          <ErrorMessage name="email" component="div" className={styles.errorMsg}/>
          <label htmlFor="birthdate" className={styles.label}>Fecha De Nacimiento</label>
          <Field name="birthdate" type="date" className={styles.input}/>
          <ErrorMessage name="birthday" component="div" className={styles.errorMsg}/>
          <label htmlFor="nDni" className={styles.label}>Numero DNI</label>
          <Field name="nDni" type="number" className={styles.input} placeholder="Ingrese su Numero de DNI"/>
          <ErrorMessage name = "nDni" component="div" className={styles.errorMsg}/>
          <label htmlFor="username" className={styles.label}>Username</label>
          <Field name="username" type="text" className={styles.input} placeholder="Ingrese su usuario"/>
          <ErrorMessage name = "username" component="div" className={styles.errorMsg}/>
          <label htmlFor="password" className={styles.label}>Password</label>
          <Field name="password" type="password" className={styles.input} placeholder="Ingrese su password"/>
          <ErrorMessage name = "password" component="div" className={styles.errorMsg}/>
          <button type="submit" className={styles.button}>Registrarse</button>
        </Form>

        <img src={image} alt="Imagen ilustrativa" className={styles.img}/>
        </div>
      </Formik>

      <Modal message={message} showModal={showModal} />
    </>
  );
};

export default Register;
