import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navigator";
import Footer from "./Footer";

export default function Layout(props) {
  const { pathname } = useLocation();

  // Hide filters on login or register if needed
  const hideFilters = ["/login", "/register"].includes(pathname);

  return (
    <>
      {/* Navbar + filters */}
      {!hideFilters && <Navbar {...props} />}

      {/* Where child routes (like HomePage, CheckoutPage...) get rendered */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      {!hideFilters && <Footer />}
    </>
  );
}


