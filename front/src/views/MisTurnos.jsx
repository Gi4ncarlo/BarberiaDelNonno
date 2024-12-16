import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Turno from "../components/Turno";
import styles from "../styles/MisTurnos.module.css";
import Loader from "../components/Loader";
import { setAppointments } from "../redux/reducer";

import imgNoTurnos from "../assets/NoTurnos.jpg"


export const MisTurnos = () => {
  const dispatch = useDispatch();
  const { user, appointments } = useSelector((state) => state.user);
  const [isLoaded, setLoaded] = useState(false);

  const [userAppointments, setUserAppointments] = useState()

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/appointments`);
        const userAppointments = response.data.filter(
          (appointment) => appointment.userId.id === user.id
        );
        setUserAppointments(userAppointments)
        dispatch(setAppointments(userAppointments));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoaded(true);
      }
    };

    if (user.id) {
      fetchAppointments();
    }
  }, [dispatch, user.id]);

  if (!isLoaded) {
    return <Loader />;
  }


  return (
    <div className={`${styles.container} ${userAppointments.length > 0 ? styles.activeContainer : styles.container}`}>
      <h1 className={styles.titulo}>TURNOS REGISTRADOS :</h1>
      <div className={styles.imgContainer}>
        {userAppointments.length === 0 && (
          <img src={imgNoTurnos} alt="Imagen no hay Turnos" className={styles.img} />
        )}
      </div>
      <div className="main-content">
        <div className={styles.contenedor}>
          {appointments.length > 0 &&
            appointments.map((turno) => (
              <Turno
                key={turno.id}
                id={turno.id}
                date={turno.date}
                time={turno.time}
                status={turno.status}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
