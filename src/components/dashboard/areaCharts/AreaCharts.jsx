import AreaBarChart from "./AreaBarChart";
import AreaProgressChart from "./AreaProgressChart";
import AreaProgressChartTech from "./AreaProgressChartTech";

const AreaCharts = () => {
  return (
    <section>
      <AreaBarChart />
      <div className="grid grid-cols-2 mt-10 gap-x-16">
        <AreaProgressChart />
        <AreaProgressChartTech />
      </div>
    </section>
  );
};

export default AreaCharts;
