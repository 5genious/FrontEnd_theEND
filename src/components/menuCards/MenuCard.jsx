import PropTypes from "prop-types";
import {
  FaRegListAlt,
  FaRegChartBar,
  FaRegFileAlt,
  FaRegUserCircle,
  FaEnvelope,
  FaCog,
  FaExclamationCircle,
} from "react-icons/fa";

const MenuCard = ({ colors, percentFillValue, cardInfo }) => {
  // Définition d'une icône en fonction du type de carte
  const renderIcon = () => {
    switch (cardInfo.value) {
      case "Incidents":
        return <FaExclamationCircle size={60} />;
      case "Demandes":
        return <FaRegFileAlt size={60} />;
      case "Statistiques":
        return <FaRegChartBar size={60} />;
      case "Utilisateurs":
        return <FaRegUserCircle size={60} />;
      case "Messages":
        return <FaEnvelope size={60} />;
      case "Paramètres":
        return <FaCog size={60} />;
      default:
        return <FaRegUserCircle size={60} />;
    }
  };

  return (
    <div className="menu-card">
      <div className="menu-card-dinfo">
        <h5 className="info-title">{cardInfo.title}</h5>
        <div className="info-value">{cardInfo.value}</div>
        <p className="info-text">{cardInfo.text}</p>
      </div>
      <div className="menu-card-icon">{renderIcon()}</div>
    </div>
  );
};

export default MenuCard;

MenuCard.propTypes = {
  colors: PropTypes.array.isRequired,
  percentFillValue: PropTypes.number.isRequired,
  cardInfo: PropTypes.object.isRequired,
};
