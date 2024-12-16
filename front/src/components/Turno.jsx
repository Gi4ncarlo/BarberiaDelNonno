import { useDispatch } from "react-redux";
import styles from "../styles/Turno.module.css";
import { cancelAppointment } from "../redux/reducer";
import axios from "axios";
import Modal from "./ModalLogin";
import { useState } from "react";

const Turno = ({ date, time, status, id }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const duraciones = {
    "Corte de Pelo": "40min",
    "Corte de Barba": "20min",
    "Corte de Barba + Pelo": "60min",
  };

  const handleCancel = async () => {

    const today = new Date()
    const todayDay = today.getDate()
    const turnoDate = date.split("-");
    const turnoDay = parseInt(turnoDate[2],10)

    console.log("dia de hoy : ", todayDay);
    console.log("turno day ", turnoDay );
    
    
    if(turnoDay == todayDay){

      setMessage("No se puede cancelar un turno con fecha de hoy.");
      setShowModal(true)

      setTimeout(() => {
        setMessage("");
        setShowModal(false)
      }, 3000);

    }else{

      try {
        await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
        dispatch(cancelAppointment(id)); 
      } catch (error) {
        console.error("Error cancelling appointment:", error);
      }
    }
  };

  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.leftCardPart}>
          <h4 className={styles.h4}>{formattedDate.toUpperCase()}</h4>
          <span className={styles.horario}>
            {time} {time > "12:00" ? "PM" : "AM"}
          </span>
        </div>
        <div className={styles.rightCardPart}>
          <span
            className={
              status === "active" ? styles.activeStatus : styles.cancelled
            }
          >
            {status === "active" ? " ACTIVO" : " CANCELADO"}
          </span>
          <span className={styles.contenido}>
            Duración: {duraciones["Corte de Barba"]}
          </span>
          <span className={styles.contenido}>
            Servicio: {"Corte de Barba"}
          </span>
          {status === "active" && (
            <button className={styles.cancelarBtn} onClick={handleCancel}>
              Cancelar Turno
            </button>
          )}
        </div>
      </div>
      <Modal message={message} showModal={showModal} />
    </div>
  );
};

export default Turno;
