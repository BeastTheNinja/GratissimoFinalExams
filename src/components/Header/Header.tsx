import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Header.module.scss"

import Button from "../Button/Button";
import { isLoggedIn } from "../../services/auth.service";


function Header() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            const result = await isLoggedIn();
            setLoggedIn(result);
        }

        checkLogin();

        function handleAuthChange(event: Event) {
            const customEvent = event as CustomEvent<boolean>;
            setLoggedIn(customEvent.detail);
        }

        window.addEventListener("auth-change", handleAuthChange);

        return () => {
            window.removeEventListener("auth-change", handleAuthChange);
        };
    }, []);

    if (loggedIn) {
        return null;
    }

    return (
        <header className={`${styles.Container}`}>
            <h1>Vi hjælper dig på vej til dit næste frivillige job</h1>
            <Button onClick={() => navigate("/login")}>
                Log ind eller opret dig
            </Button>
        </header>
    )
}
export default Header