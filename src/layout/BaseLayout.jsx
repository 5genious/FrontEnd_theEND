import { Outlet } from "react-router-dom";
import { Sidebar, ComplexNavbar, AreaTop } from "../components";

const BaseLayout = () => {
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-area">
        <AreaTop />
        <div className="content-wrapper mb-10">
          <div className="navbar-wrapper">
            <ComplexNavbar />
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default BaseLayout;
