import styles from "../styles/Home.module.css";
import pelo from "../assets/pelo.jpg";
import barba from "../assets/barba.jpg";
import barbayPelo from "../assets/barbayPelo.jpg";
import corte1 from "../assets/corte1.jpg";
import corte2 from "../assets/corte2.jpg";
import corte3 from "../assets/corte3.avif";
import corte4 from "../assets/corte4.jpg";
import corte5 from "../assets/corte5.jpg";
import corte6 from "../assets/corte 6.avif";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export const Home = () => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="main-content">
      <div className={styles.header}>
        <h1 className={styles.title}>BARBERIA DEL NONNO</h1>
        <h3 className={styles.subtitle}>
          Una vida de Experiencia y Elegancia nos caracterizan.{" "}
        </h3>
      </div>

      <h2 className={styles.h2}>NUESTROS SERVICIOS</h2>
      <section className={styles.serviciosContainer}>

          <div className={styles.servicio}>
            <img className={styles.img} src={pelo} alt="Primer tipo de Corte" />
            <h3 className={styles.h3}>Corte de Pelo</h3>
            <p className={styles.p}>
              Transforma tu estilo con un corte de pelo a la medida. Atención
              personalizada, técnica profesional y un look que destaca. ¡Reserva
              tu cita hoy mismo!
            </p>
            <p className={styles.costo}>$10.000</p>
          </div>

        <div className={styles.servicio}>
          <img className={styles.img} src={barba} alt="Segundo tipo de Corte" />
          <h3 className={styles.h3}>Corte de Barba</h3>
          <p className={styles.p}>
            Dale forma a tu barba con un corte experto. Define tu estilo con
            precisión y cuidado en cada detalle. ¡Haz tu cita y luce impecable!
          </p>
          <p className={styles.costo}>$6.000</p>
        </div>

        <div className={styles.servicio}>
          <img
            className={styles.img}
            src={barbayPelo}
            alt="Tercer tipo de Corte"
          />
          <h3 className={styles.h3}>Corte de Pelo + Corte de Barba</h3>
          <p className={styles.p}>
            Luce impecable con nuestro combo de corte de pelo y barba. Estilo a
            la medida, técnicas profesionales y un look que destaca. ¡Reserva tu
            cita y transforma tu imagen hoy mismo!
          </p>
          <p className={styles.costo}>$14.000</p>
        </div>
      </section>

      <section className={styles.contenedorGaleria}>
        <h2 className={styles.h2}>GALERIA DE IMAGENES </h2>
        <div className={styles.galeria}>
          <img src={corte1} className={styles.galeriaImg} alt="" />
          <img src={corte2} className={styles.galeriaImg} alt="" />
          <img src={corte3} className={styles.galeriaImg} alt="" />
          <img src={corte4} className={styles.galeriaImg} alt="" />
          <img src={corte5} className={styles.galeriaImg} alt="" />
          <img src={corte6} className={styles.galeriaImg} alt="" />
        </div>
      </section>

      <section className={styles.horariosContainer}>
        <div className={styles.horarios}>
          <h3 className={styles.h3Horarios}>HORARIOS:</h3>
          <p className={styles.parrafoHorarios}> Lun a Viernes de 9:00 a 18:00</p>
        </div>
        <Link to={"/appointments/schedule"}>
          <button className={styles.pediTurnoBtn}>Pedí tu Turno</button>
        </Link>
      </section>

      <section className={styles.contenedorExteriorHistoria}>
        <h2 className={styles.h2Historia}>UN POCO DE HISTORIA..</h2>
        <div className={styles.contenedorHistoria}>
          <div className={styles.historia}>
            <p className={styles.textoHistoria}>
              Fundada en honor al abuelo Giovanni, quien abrió su primera
              barbería en una pequeña villa italiana en 1920,{" "}
              <strong className={styles.strong}> Barbería Del Nonno</strong> en
              Rosario mantiene vivo su legado. Con técnicas clásicas y un
              ambiente acogedor, ofrecemos cortes y afeitadas que combinan
              tradición y estilo moderno, garantizando una experiencia única.
            </p>
          </div>
          <div className={styles.historia}>
            <p className={styles.textoHistoria}>
              A lo largo de los años,{" "}
              <strong className={styles.strong}> Barbería Del Nonno</strong> no
              solo se ha adaptado a los cambios en la moda y los estilos, sino
              que también ha sabido mantenerse fiel a sus raíces. Cada visita es
              un viaje al pasado, donde se mezcla la nostalgia de los viejos
              tiempos con la frescura de lo moderno. Los clientes no solo vienen
              por un corte o un afeitado; vienen a vivir una experiencia que ha
              sido transmitida de generación en generación.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
