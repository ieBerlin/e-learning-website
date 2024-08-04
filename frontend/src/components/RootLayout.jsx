import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Modal from "./modal/Modal";
import { ActionButton, CancelButton } from "./modal/ActionsButtons";

export default function RootLayout() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef();
  useEffect(() => {
    setNavbarHeight(navbarRef.current.offsetHeight);
  }, []);

  return (
    <div className="relative">
      <Modal
        title="Logout"
        actionsButtons={[
          <ActionButton key="12" label="Save" />,
          <CancelButton key="122" />,
        ]}
      />
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
