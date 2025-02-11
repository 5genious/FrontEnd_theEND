import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);
  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
      </div>
      <div className="area-top-r"></div>
    </section>
  );
};

export default AreaTop;
