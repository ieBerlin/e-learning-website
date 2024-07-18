import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function RootLayout() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef();
  useEffect(() => {
    setNavbarHeight(navbarRef.current.offsetHeight);
  }, []);
  return (
    <div className="relative">
      <Navbar ref={navbarRef} />
      <main
        style={{
          marginTop: navbarHeight,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
