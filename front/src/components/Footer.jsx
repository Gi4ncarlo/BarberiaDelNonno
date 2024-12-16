import styles from "../styles/Footer.module.css";
import favicon from "../assets/favicon.jpg"
import facebook from "../assets/facebook.png"
import instagram from "../assets/instagram.png"
import twitter from "../assets/twitter.png"

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.sobreNosotros}>
          <h4 className={styles.h4}>Barberia del Nonno & Asociados</h4>
          <br/>
          <br />
          <p className={styles.p}>🕒 Horario: Lunes a Viernes: 09:00 - 18:00</p>
          <br />
          <p className={styles.p}>📞 Teléfono: +54 11 1234-5678</p>
          <br />
          <p className={styles.p}>✂️ Tradición y Estilo en cada corte desde 1980</p>



      </div>
      <div className={styles.logo}>
        <Link to={"/"}>
        <img className={styles.img} src={favicon} alt="Logo Pagina" />
        </Link>
      </div>
      <div className={styles.redesSociales}>
        {/* Aquí colocas los iconos de redes sociales */}
        <a href="https://facebook.com" target="_blank"> <img className={styles.social} src={facebook} alt="Logo de Facebook" /></a>
        <a href="https://instagram.com" target="_blank" ><img className={styles.social} src={instagram} alt="Logo de Facebook" /></a>
        <a href="https://twitter.com" target="_blank"><img className={styles.social} src={twitter} alt="Logo de Facebook" /></a>
      </div>
    </footer>
  );
};

export default Footer;
