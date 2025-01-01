import { useSelector } from "react-redux";

const AreaProgressChartTech = () => {
  const { stats } = useSelector((store) => store.incidentStatistics);
  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Incidents Traités par Technicien</h4>
      </div>
      <div className="progress-bar-list">
        {Object.keys(stats.incidentsTraitesParTech).map((key) => (
          <div className="progress-bar-item" key={key}>
            <div className="bar-item-info">
              <p className="bar-item-info-name">{key}</p>
              <p className="bar-item-info-value">
                {stats.incidentsTraitesParTech[key]}
              </p>
            </div>
            <div className="bar-item-full">
              <div
                className="bar-item-filled"
                style={{
                  width: `${stats.incidentsTraitesParTech[key]}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaProgressChartTech;
