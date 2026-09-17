import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";

function MyPage() {
  const navigate = useNavigate()
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
        <Button>
          Mine annoncer
        </Button>
        <Button>
          Mine favoritter
        </Button>


      </section>
    </>
  );
}

export default MyPage;
