import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cardItem.css";
import { uiStateActions } from "../../../../store/ui-state";

import ValueContainer from "../ValueContainer";

import useDateTimeFormatter from "../../../../hooks/useDateTimeFormatter";

function CardItem({
  id,
  title,
  data,
  unit,
  type,
  selectedUnit,
  selected,
  actions,
  vitalsActions,
  isHome,
}) {
  const dispatch = useDispatch();
  const [latestData, setLatestData] = useState(null);
  const sidebarState = useSelector((state) => state.formState.sidebarState);
  const typeStyleConfig = useSelector((state) => state.sideBar.browse);

  useEffect(() => {
    if (data.length === 0) return;
    setLatestData(
      data.reduce((a, b) =>
        new Date(`${a.date}T${a.time}`) > new Date(`${b.date}T${b.time}`)
          ? a
          : b
      )
    );
  }, [data]);

  const { formattedDate, format } = useDateTimeFormatter();

  useEffect(() => {
    if (!latestData) return;
    format(latestData.date, latestData.time);
  }, [latestData, format]);

  const onClickHandler = () => {
    if (sidebarState !== "/vitals") {
      dispatch(actions.updateDataState(id));
      dispatch(actions.updateFirstClick(true));
    }

    if (sidebarState === "/vitals") {
      dispatch(actions.updateVitalsDataState(id));
      dispatch(vitalsActions.updateDataState(id));
      dispatch(vitalsActions.updateFirstClick(true));
    }
    dispatch(uiStateActions.setCardSelectState(true));
  };

  const matchedType = typeStyleConfig.find(
    (item) => item.route.replace("/", "") === type
  );

  if (data.length === 0 && !isHome) {
    return (
      <div
        className={`emptyCardItem ${selected && "active"}`}
        onClick={onClickHandler}
      >
        <div className="emptyCardItem-top">
          <span className="cardItem-name">{title}</span>
          <div
            className={`emptyCardItem-add__container ${selected && "active"}`}
          >
            <span className="emptyCardItem-add">Add data</span>
            <KeyboardArrowRightSharpIcon
              className={`cardItem-forward__icon `}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`cardItem ${selected && "active"} ${isHome && "homeCard"}`}
        onClick={onClickHandler}
      >
        <div className="cardItem-left">
          <span
            className="cardItem-name"
            // style={{
            //   color: `${isHome && matchedType.color}`,
            // }}
          >
            {title}
          </span>
          <ValueContainer
            unit={unit}
            selectedUnit={selectedUnit}
            latestData={latestData}
            isDetailTab={false}
            isHome={isHome}
          />
        </div>
        <div className="cardItem-right">
          {isHome && matchedType.icons}
          <div className={`cardItem-date__container ${selected && "active"}`}>
            <span className="cardItem-date">{formattedDate}</span>
            <KeyboardArrowRightSharpIcon
              className={`cardItem-forward__icon `}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CardItem;
