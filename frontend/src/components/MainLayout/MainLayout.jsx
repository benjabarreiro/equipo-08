import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./MainLayout.css";
import Footer from "./components/Footer/footer";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function MainLayout({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const {
    media: { mobile },
  } = useMediaQuery();
  useEffect(() => {
    if (!mobile && showMenu) {
      setShowMenu(false);
    }
  }, [mobile]);
  return (
    <>
      <Header mobile={mobile} showMenu={showMenu} setShowMenu={setShowMenu} />
      <main className="main">{children}</main>
      <Footer showMenu={showMenu} mobile={mobile} />
    </>
  );
}
