import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import { useSelector } from "react-redux";

const AreaCards = () => {
  const { stats } = useSelector((store) => store.incidentStatistics);
  console.log(stats.incidentsMensuelsEA / stats.incidentsMensuels);

  return (
    <section className="flex justify-center items-center content-area-cards mx-auto">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={100}
        cardInfo={{
          title: "Incidents Mensuels",
          value: stats.incidentsMensuels,
          text: `there is ${stats.incidentsMensuels} this month`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={stats.incidentsMensuelsEA / stats.incidentsMensuels}
        cardInfo={{
          title: "Incidents Mensuels En Attente",
          value: stats.incidentsMensuelsEA,
          text: `there is ${stats.incidentsMensuelsEA} this month`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={stats.incidentsMensuelsEC / stats.incidentsMensuels}
        cardInfo={{
          title: "Incidents Mensuels En Cours",
          value: stats.incidentsMensuelsEC,
          text: `there is ${stats.incidentsMensuelsEC} this month`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={stats.incidentsMensuelsT / stats.incidentsMensuels}
        cardInfo={{
          title: "Incidents Mensuels Traités ",
          value: stats.incidentsMensuelsT,
          text: `there is ${stats.incidentsMensuelsT} this month`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={stats.incidentsMensuelsAnn / stats.incidentsMensuels}
        cardInfo={{
          title: "Incidents Mensuels Annulés",
          value: stats.incidentsMensuelsAnn,
          text: `there is ${stats.incidentsMensuelsAnn} this month`,
        }}
      />
    </section>
  );
};

export default AreaCards;
