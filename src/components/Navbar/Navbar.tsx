import { useNavigate } from "react-router";

import Button from "../Button/Button";

import { useEffect, useState } from "react";

import { isLoggedIn, logout } from "../../services/auth.service";

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    async function checkLogin() {
      const authenticated = await isLoggedIn();
      setLoggedIn(authenticated);
    }

    function handleAuthChange(event: Event) {
      const customEvent = event as CustomEvent<boolean>;
      setLoggedIn(customEvent.detail);
    }

    checkLogin();

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  async function handleLogout() {
    logout();

    window.dispatchEvent(
      new CustomEvent("auth-change", {
        detail: false,
      })
    );

    setLoggedIn(false);
    navigate("/");
  }

  return (
    <nav>
      <div>
        
      </div>


      <div>

        {!loggedIn ? (
          <>
            <Button onClick={() => navigate("/login")}>
              Log ind
            </Button>

            <Button onClick={() => navigate("/register")}>
              Opret bruger
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/profil")}>
              Profil
            </Button>

            <Button onClick={handleLogout}>
              Log ud
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
