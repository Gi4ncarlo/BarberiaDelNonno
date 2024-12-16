import styles from "../styles/NavBar.module.css";
import logo from "../assets/favicon.jpg";
import { Link } from "react-router-dom";

function Navbar({ isLogged, logout }) {
  return (
    <div className={styles.navbar}>
      <Link to={"/"} className={styles.navbar}>
        <img className={styles.img} src={logo} alt="Logo Pagina" />
      </Link>
      {isLogged ? (
        <>
        <div className={styles.dropdown}>
          <a href="#turnos" className={styles.dropbtn}>
            TURNOS
          </a>
          <div className={styles["dropdown-content"]}>
            <Link to={"/appointments/schedule"}>SOLICITAR TURNO</Link>
            <Link to={"/appointments/userAppointments/:id"}>MIS TURNOS</Link>
          </div>
        </div>
        <div className={styles.dropdown}>
          <a href="" className={styles.dropbtn}>
            PERFIL
          </a>
          <div className={styles["dropdown-content"]}>
          <a href=""> <button onClick={logout} className={styles.cerrarSesionBtn}>Cerrar Sesión</button> </a>
          </div>
        </div>
        </>
        
      ) : (
        <div className={styles.dropdown}>
          <a href="#perfil" className={styles.dropbtn}>
            PERFIL
          </a>
          <div className={styles["dropdown-content"]}>
            <Link to={"/users/login"}>LOGIN</Link>
            <Link to={"/users/register"}>REGISTRARSE</Link>
          </div>
        </div>
      )}

      <div>
        <Link to={"/contacto"}>CONTACTO</Link>
      </div>
    </div>
  );
}

export default Navbar;
