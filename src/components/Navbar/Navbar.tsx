import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

import logo from "../../assets/logo/GratissimoLogo.svg";
import { isLoggedIn, logout } from "../../services/auth.service";
import Toaster from "../Toaster/Toaster";
import Button from "../Button/Button";

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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
  async function handleAdvertiseClick() {
    const authenticated = await isLoggedIn();

    if (!authenticated) {
      setToast({
        message: "Du skal være logget ind for at oprette en annonce.",
        type: "error",
      });

      return;
    }

    navigate("/advertise");
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

            <Button
              type="button"
              className="text-base text-[#F9F9F9]"
              onClick={handleAdvertiseClick}
            >
              Opret annonce
            </Button>

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
      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default Navbar;