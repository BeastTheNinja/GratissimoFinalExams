import { useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import MyAnnouncement from "../../components/MyAnnouncement/MyAnnouncement";
import MyFavorit from "../../components/MyFavorit/MyFavorit";
import styles from "./MyPage.module.scss";
import { Cookies } from "react-cookie";
import type { User } from "../../types/user";

const cookies = new Cookies();
function MyPage() {
  const user = cookies.get<User>("user");
  console.log(user)

  const navigate = useNavigate();

  const [activeview, setActiveView] = useState<"MineAnnoncer" | "MineFavoritter">("MineAnnoncer");

  return (
    <div className={styles.page}>
      <section className={styles.intro}>

        <h1>Velkommen {user?.firstname}</h1>
        
        <p>
          Rediger eller slet dine annoncer. Du kan også danne dig et
          overblik over dine gemte favoritter.
        </p>

        <div className={styles.actions}>
          <Button onClick={() => navigate("/login")}>
            Log ud
          </Button>
          <Button onClick={() => navigate("/mypage/editprofile")}>
            Rediger profil
          </Button>
        </div>
      </section>

      <nav className={styles.tabs}>
        <Button
          onClick={() => setActiveView("MineAnnoncer")}
          variant={activeview === "MineAnnoncer" ? "primary" : "secondary"}
        >
          Mine annoncer
        </Button>
        <Button
          onClick={() => setActiveView("MineFavoritter")}
          variant={activeview === "MineFavoritter" ? "primary" : "secondary"}
        >
          Mine favoritter
        </Button>
      </nav>

      <section className={styles.content}>
        {activeview === "MineAnnoncer" && <MyAnnouncement />}
        {activeview === "MineFavoritter" && <MyFavorit />}
      </section>
    </div>
  );
}

export default MyPage;
