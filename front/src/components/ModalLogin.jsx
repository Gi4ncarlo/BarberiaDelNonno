import styles from "../styles/ModalLogin.module.css"

const ModalLogin = ({ message, showModal }) => {
  if (!showModal) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2 className={styles.h2}>{message}</h2>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
