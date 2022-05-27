import "./favourites.css";

import HomeHeaders from "./home-childs/HomeHeaders";
import CardItem from "../section-components/CardItem/CardItem";
import LoadingCard from "../section-components/SectionLoading/LoadingCard";

import { useSelector } from "react-redux";

function Favourites() {
  const { bodyMeasurements, heart, respiratory, otherData } = useSelector(
    (state) => state
  );
  const isLoading = useSelector((state) => state.uiState.isLoading);

  const stateArray = [
    bodyMeasurements.bodyMeasurements,
    heart.heart,
    respiratory.respiratory,
    otherData.otherData,
  ];

  let favArr = stateArray
    .map((item) =>
      Object.values(item).filter((item) => item.favourite === true)
    )
    .flat()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="favourite">
      <HomeHeaders title={"Favourites"} />
      <div className="favourite-card">
        {!isLoading &&
          favArr.map((item) => (
            <CardItem
              key={item.id}
              id={item.id}
              title={item.title}
              data={item.data}
              unit={item.unit}
              selectedUnit={item.selectedUnit}
              type={item.type}
              isHome={true}
            />
          ))}

        {isLoading &&
          Array.from(Array(8).keys()).map((item, i) => (
            <LoadingCard key={i} isHome={true} />
          ))}
      </div>
    </div>
  );
}

export default Favourites;
