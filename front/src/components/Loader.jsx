import styles from "../styles/Loader.module.css";
import logo from "../assets/favicon.jpg";

const Loader = () => {
  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedorImg}>
        <div className={styles.loader1}>
          <img className={styles.img} src={logo} alt="" />
        </div>
      </div>

      <div className={styles.cargando}> Cargando ...</div>
    </div>
  );
};

export default Loader;
