import { Outlet } from "react-router";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
