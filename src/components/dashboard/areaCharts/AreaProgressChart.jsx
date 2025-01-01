import { useSelector } from "react-redux";

const AreaProgressChart = () => {
  const { stats } = useSelector((store) => store.incidentStatistics);
  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Incidents par type</h4>
      </div>
      <div className="progress-bar-list">
        {Object.keys(stats.incidentsAnnuelsByTypes).map((key) => (
          <div className="progress-bar-item" key={key}>
            <div className="bar-item-info">
              <p className="bar-item-info-name">{key}</p>
              <p className="bar-item-info-value">
                {stats.incidentsAnnuelsByTypes[key]}
              </p>
            </div>
            <div className="bar-item-full">
              <div
                className="bar-item-filled"
                style={{
                  width: `${stats.incidentsAnnuelsByTypes[key]}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaProgressChart;
