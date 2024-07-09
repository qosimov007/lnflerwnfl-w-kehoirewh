import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="px-5 lg:px-20 pt-5 ">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default RootLayout;
