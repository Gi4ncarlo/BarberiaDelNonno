import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom"; 
import Modal from "../../components/ModalLogin";
import { useState } from "react";
import { useDispatch } from "react-redux"; // Importa useDispatch
import { loginSuccess } from "../../redux/reducer"; // Importa la acción

const Login = () => {
  const dispatch = useDispatch(); // Crea una instancia de useDispatch
  const navigate = useNavigate(); 
  const [showModal, setShowModal] = useState(false); 
  const [message, setMessage] = useState("");

  const ingresar = (values) => {
    axios.post("http://localhost:3000/users/login", values)
    .then((res) => {
      if (res.data.login) {
        setMessage("Iniciando Sesion..");
        setShowModal(true);
 
        setTimeout(() => {
          setShowModal(false);
          //setIsLogged(true);
          dispatch(loginSuccess({ user: res.data.user, logged: res.data.login }));
          navigate("/"); 
        }, 3000);
      } else {
        console.log("Error en el login");
      }
    })
    .catch((e) => {
      console.log(e);
      setMessage(`Datos incorrectos. Intente Nuevamente`);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
       // setIsLogged(false);
      }, 3000);
    });
  }

  const validar = (values) => {
    const errors = {};
   
    if (!/^[a-zA-Z0-9]{4,16}$/.test(values.username)) {
      errors.username = " ❌ El usuario ingresado no cumple con los requisitos alfanuméricos ❌";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
      errors.password = " ❌ La contraseña ingresada es inválida. La longitud mínima es de 8 caracteres ❌";
    }

    return errors;
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        onSubmit={ingresar}
        validate={validar}
      >
        <div className={styles.container}>
          <Form className={styles.formContainer}>
            <h1 className={styles.h1}>DEL NONNO LOGIN</h1>
            <Field name="username" type="text" className={styles.input} placeholder="Ingrese su usuario" />
            <ErrorMessage name="username" component="div" className={styles.errorMsg} />
            <Field name="password" type="password" className={styles.input} placeholder="Ingrese su password" />
            <ErrorMessage name="password" component="div" className={styles.errorMsg} />
            <button type="submit" className={styles.button}>INGRESAR</button>
          </Form>
        </div>
      </Formik>

      <Modal message={message} showModal={showModal} />
    </>
  );
}

export default Login;
