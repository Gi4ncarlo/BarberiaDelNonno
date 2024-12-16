import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.mainContainer}>
      <form className={styles.formContainer}>
        <h1 className={styles.h1}>Formulario de Contacto</h1>
        <h3 className={styles.h3}>
          Tiene alguna consulta? No dude en hacernos saber y le contestaremos a la brevedad
        </h3>

        <div className={styles.inputs}>
          <input type="text" placeholder="Ingrese su Nombre" className={styles.input}/>
          <input type="text" placeholder="Ingrese su Email" className={styles.input} />
        </div>

        <textarea name="" id="" placeholder="Redacte su consulta" cols={15} rows={15} className={styles.textArea}></textarea>

        <button type="submit" className={styles.button}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
