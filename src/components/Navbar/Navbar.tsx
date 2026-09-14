import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

import logo from "../../assets/logo/GratissimoLogo.svg";
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
    try {
      await logout();
    } finally {
      window.dispatchEvent(
        new CustomEvent("auth-change", {
          detail: false,
        })
      );

      setLoggedIn(false);
      navigate("/");
    }
  }

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `text-base text-[#F9F9F9] ${isActive ? "underline" : ""
    }`;

  return (
    <>
      <header className="bg-[#AB0E0E]">
        <img
          className="h-20 cursor-pointer ml-10"
          src={logo}
          alt="GratissimoLogo"
          onClick={() => navigate("/")}
        />
      </header>

      <nav className="bg-[#8B0808]">
        <div className="flex flex-wrap items-center justify-between gap-5 ml-15">
          <div className="flex flex-wrap items-center gap-5">
            <NavLink
              to="/SearchResult"
              className={linkClassName}
            >
              Alle jobs
            </NavLink>

            <NavLink
              to="/advertise"
              className={linkClassName}
            >
              Opret annonce
            </NavLink>

            <NavLink
              to="/news"
              className={linkClassName}
            >
              Nyheder
            </NavLink>
          </div>

          <div className="flex flex-wrap items-center gap-5 mr-15">
            {!loggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={linkClassName}
                >
                  Log ind
                </NavLink>

                <NavLink
                  to="/register"
                  className={linkClassName}
                >
                  Opret bruger
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/mypage"
                  className={linkClassName}
                >
                  Min side
                </NavLink>

                <button
                  type="button"
                  className="text-base text-[#F9F9F9]"
                  onClick={handleLogout}
                >
                  Log ud
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;