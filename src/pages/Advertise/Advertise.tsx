import { NavLink } from "react-router";
import AdvertiseForm from "../../components/AdvertiseForm/AdvertiseForm";
import styles from "./Advertise.module.scss";

function Advertise() {
    return (
        <main className={styles.page}>
            <section className={styles.intro}>
                <h1>Opret en annonce og find frivillige til din forening</h1>

                <p>
                    Gratissimo er gratis for alle. Frivillige, organisationer og
                    foreninger. Du skaber det frivillige liv, og vi formidler kontakten.
                </p>

                <NavLink to="/mypage">
                    Gå til min side
                </NavLink>
            </section>

            <AdvertiseForm />
        </main>
    );
}

export default Advertise;