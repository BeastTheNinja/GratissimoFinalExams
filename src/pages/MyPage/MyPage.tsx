import { useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import MyAnnouncement from "../../components/MyAnnouncement/MyAnnouncement";
import MyFavorit from "../../components/MyFavorit/MyFavorit";

function MyPage() {
  const navigate = useNavigate()

  const [activeview, setActiveView] = useState<"MineAnnoncer" | "MineFavoritter">("MineAnnoncer");
  return (
    <>
      <section>
        <h1>Velkommen (Brugerens navn)</h1>
        <p>Rediger eller slet dine annoncer. Du kan også danne dig et overblik over de annoncer du har gemt som favorit, samt fjerne dem igen</p>
        <Button onClick={() => navigate("/login")}>
          Log ud
        </Button>
        <Button onClick={() => navigate("/mypage/editprofile")}>
          Rediger Profil
        </Button>
      </section>
      <section>
        <Button onClick={() => setActiveView("MineAnnoncer")}>
          Mine annoncer
        </Button>
        <Button onClick={() => setActiveView("MineFavoritter")}>
          Mine favoritter
        </Button>
      </section>
      <section>
        {activeview === "MineAnnoncer" && <MyAnnouncement />}
        {activeview === "MineFavoritter" && <MyFavorit />}
      </section>
    </>
  );
}

export default MyPage;
