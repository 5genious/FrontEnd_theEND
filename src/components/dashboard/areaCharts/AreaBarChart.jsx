import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import "./AreaCharts.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

class Entry {
  constructor(month, incidents, demandes) {
    this.month = month;
    this.incidents = incidents;
    this.demandes = demandes;
  }
}

const AreaBarChart = () => {
  const { stats } = useSelector((store) => store.incidentStatistics);
  const [chartData, setChartData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const newData = [];
    let newMaxValue = 0;

    for (const key in stats.incidentsAnnuels) {
      const incidents = stats.incidentsAnnuels[key];
      newData.push(new Entry(key, incidents, 0));
      if (incidents > newMaxValue) {
        newMaxValue = incidents;
      }
    }

    setChartData(newData);

    // Calculate the new maximum value for the Y-axis with an added margin
    setMaxValue(Math.ceil(newMaxValue * 1.1)); // Adding a 10% margin
  }, [stats.incidentsAnnuels]);

  const { theme } = useContext(ThemeContext);

  const formatTooltipValue = (value) => {
    return `${value}`;
  };

  const formatYAxisLabel = (value) => {
    return `${value}`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  // Generate dynamic ticks based on the maxValue
  function getTicks(maxValue) {
    const step =
      maxValue <= 10
        ? 1
        : maxValue <= 20
        ? 2
        : maxValue <= 100
        ? 5
        : maxValue <= 200
        ? 10
        : 20;
    const ticks = [];
    for (let i = 0; i <= maxValue; i += step) {
      ticks.push(i);
    }
    return ticks;
  }

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Total Incidents Annuels</h5>
        <div className="chart-info-data">
          <div className="info-data-value"></div>
          <div className="info-data-text">
            <FaArrowUpLong />
            <p>5% than last month.</p>
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={200}
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              padding={{ left: 10 }}
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                fontSize: 14,
                fontWeight: "900",
              }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                fontSize: 14,
                fontWeight: "900",
              }}
              ticks={getTicks(maxValue)}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="incidents"
              fill="#475be8"
              activeBar={false}
              isAnimationActive={false}
              barSize={30}
              radius={[4, 4, 4, 4]}
            />
            {/* <Bar
              dataKey="loss"
              fill="#e3e7fc"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
