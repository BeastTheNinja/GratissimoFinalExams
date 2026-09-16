import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Login.module.scss"

function Login() {

  return (
    <section className={styles.authPage}>
      <section className={styles.authIntro}>
        <h1>Log ind eller opret dig som bruger</h1>
        <p>Når du opretter en profil på Gratissimo får du adgang til at oprette, slette og redigere i job annoncer. Som privatperson får du mulighed for at gemme de jobs du kunne være interesseret i. </p>
        <p>Log ind for at gå til min side</p>
      </section>

      <section className={styles.authForm}>
        <LoginForm />
      </section>
    </section>
  );
}

export default Login;