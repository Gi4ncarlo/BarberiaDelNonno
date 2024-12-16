import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./SolicitarTurno.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../redux/reducer";
import Modal from "../../components/ModalLogin"; 
import { useNavigate } from "react-router-dom";

const SolicitarTurno = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); 
  const [message, setMessage] = useState(""); 

  const [tipoCorte, setCorte] = useState();
  const [precio, setPrecio] = useState();

  const tiposdeCorte = [
    { corte: "Corte de Pelo", precio: 10000 },
    { corte: "Corte de Barba", precio: 6000 },
    { corte: "Corte de Barba + Pelo", precio: 14000 },
  ];

  const registrar = async (values) => {
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_PORT}/appointments/schedule`,
        {
          ...values,
          userId: user.id,
        }
      );

      dispatch(addAppointment(response.data));

      setMessage("Turno registrado exitosamente");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);

        navigate("/appointments/userAppointments/:id");
      }, 3000);
    } catch (e) {
      console.error("Error registrando turno:", e);
      setMessage("Error registrando turno. Intente nuevamente");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    }
  };

  const validar = (values) => {
    const errors = {};
  
    if (!values.date) {
      errors.date = "❌ Debes seleccionar una fecha ❌";
    } else {
      const fechaActual = new Date();
      const selectedDate = new Date(values.date);
  
      const fechaActualSinHora = new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        fechaActual.getDate()
      );
      const selectedDateSinHora = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
  
      const dayOfWeek = selectedDate.getDay();
  
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        errors.date = "❌ Los turnos solo están disponibles de Lunes a Viernes ❌";
      }
  
      if (selectedDateSinHora.getTime() <= fechaActualSinHora.getTime()) {
        errors.date = "❌ No puede pedir un turno para Hoy o días pasados ❌";
      }
    }
  
    if (!values.time) {
      errors.time = "❌ Debes seleccionar un horario ❌";
    }
  
    return errors;
  };
  
  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];



  const handlePrecio = (corteSelected) => {
    const valor = tiposdeCorte.find((corte) => corte.corte === corteSelected);
    if (valor) {
      setPrecio(valor.precio);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          date: "",
          time: "",
        }}
        onSubmit={registrar}
        validate={validar}
      >
        <div className={styles.mainContainer}>
          <Form className={styles.formContainer}>
            <h1 className={styles.h1}>REGISTREMOS TU TURNO</h1>

            <label htmlFor="precio" className={styles.label}>
              Valor del Corte
            </label>
            <input
              type="text"
              readOnly
              className={styles.input}
              value={precio ? `$ ${precio}` : "-"}
            />

            <label htmlFor="tipoCorte" className={styles.label}>
              Tipo de Corte
            </label>
            <select
              name="tipoCorte"
              id=""
              className={styles.input}
              value={tipoCorte}
              onChange={(e) => {
                const corteSelecionado = e.target.value;
                setCorte(corteSelecionado);
                handlePrecio(corteSelecionado);
              }}
            >
              <option value="">Seleccione un Tipo de Corte</option>
              {tiposdeCorte.map((cortes) => (
                <option key={cortes.precio} value={cortes.corte}>
                  {cortes.corte}
                </option>
              ))}
            </select>

            <label htmlFor="date" className={styles.label}>
              Fecha del Turno
            </label>
            <Field name="date" type="date" className={styles.input} />
            <ErrorMessage
              name="date"
              component="div"
              className={styles.errorMsg}
            />

            <label htmlFor="time" className={styles.label}>
              Horario
            </label>
            <Field as="select" name="time" className={styles.input}>
              <option value="">Seleccione un horario</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="time"
              component="div"
              className={styles.errorMsg}
            />
            <button type="submit" className={styles.button}>
              Registrar Turno
            </button>
          </Form>
        </div>
      </Formik>

      <Modal message={message} showModal={showModal} />
    </>
  );
};

export default SolicitarTurno;
