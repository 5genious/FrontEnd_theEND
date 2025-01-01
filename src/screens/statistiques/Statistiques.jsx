import { useDispatch } from "react-redux";
import { AreaCards, AreaCharts } from "../../components";
import { getStatistics } from "../../features/Statistics/incidentStatisticsSlice";

const Statistiques = () => {
  const dispatch = useDispatch();
  dispatch(getStatistics());
  return (
    <div className="content-area">
      <AreaCards />
      <AreaCharts />
    </div>
  );
};

export default Statistiques;
