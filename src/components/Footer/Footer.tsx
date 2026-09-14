import Button from "../Button/Button";
import Input from "../Input/Input";

import { useState, type FormEvent } from "react";
import { subscribeToNewsletter } from "../../services/newsletter.service";


import LogoAtSign from "../../assets/icons/nyhedsbrevLogo.svg"
import facebook from "../../assets/icons/SoMe/Facebook.svg"
import google from "../../assets/icons/SoMe/GooglePlus.svg"
import instragram from "../../assets/icons/SoMe/InstagramCircle.svg"
import linkedin from "../../assets/icons/SoMe/LinkedInCircled.svg"

import styles from "./Footer.module.scss"
import { useNavigate } from "react-router";

function Footer() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");

    try {
      await subscribeToNewsletter(email);

      setMessage("Du er nu tilmeldt nyhedsbrevet.");
      setEmail("");
    } catch {
      setMessage("Noget gik galt. Prøv igen.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <footer className={`${styles.footerContainer}`}>
      <div>
        <ul>
          <h6>For jobsøgere</h6>
          <li>Din kundeside</li>
          <li onClick={() => navigate("/register")}>Opret profil</li>
          <li>Gemte jobs</li>
        </ul>

        <ul>
          <h6>For arbejdsgivere</h6>

          <li>Virksomhedsprofil</li>
          <li>Opret annonce</li>
          <li>Jobannoncering</li>
          <li>Rektruttering</li>
        </ul>

        <ul>
          <h6>Links</h6>

          <li>Om Gratissimo</li>
          <li>Job hos os</li>
          <li>For investorer</li>
          <li>Presse</li>
        </ul>

        <ul>

          <h6>Vil du have jobs direkte i din indbakke?</h6>
          <p>Tilmeld dig vores elektroniske nyhedsbrev</p>
          <form onSubmit={handleSubmit}>
            <img src={LogoAtSign} alt="At sign" />

            <Input
              id="email"
              name="email"
              placeholder="Indtast email..."
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sender..." : "Tilmeld"}
            </Button>
          </form>

          {message && <p>{message}</p>}
        </ul>


        <ul>
          <li>Fidusvej 23</li>
          <li>9230 Øster Lundby</li>
          <li>+45 22 13 22 13 </li>
          <img src={linkedin} alt="LinkedIn icon" />
          <img src={facebook} alt="Facebook icon" />
          <img src={instragram} alt="instragram icon" />
          <img src={google} alt="GooglePlus icon" />
        </ul>

      </div>

    </footer >
  );
}

export default Footer;
