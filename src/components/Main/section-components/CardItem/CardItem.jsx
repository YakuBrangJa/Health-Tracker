import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import { IoIosArrowForward } from "react-icons/io";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./cardItem.css";
import uiState, { uiStateActions } from "../../../../store/ui-state";

import ValueContainer from "../ValueContainer";
import useDateTimeFormatter from "../../../../hooks/useDateTimeFormatter";
import useActionSelector from "../../../../hooks/useActionSelector";

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
  const navigate = useNavigate();
  const [latestData, setLatestData] = useState(null);
  const sidebarState = useSelector((state) => state.formState.sidebarState);
  const typeStyle = useSelector((state) => state.sideBar.browse);
  const windowWidth = useSelector((state) => state.uiState.windowWidth);

  const matchedType = typeStyle.find(
    (item) => item.route.replace("/", "") === type
  );

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

  const { action } = useActionSelector(matchedType.route);

  const onClickHandler = () => {
    if (isHome) {
      navigate(matchedType.route);
      dispatch(action.updateDataState(id));
      dispatch(action.updateFirstClick(true));
      dispatch(uiStateActions.setCardSelectState(true));
      dispatch(uiStateActions.updateFromHomeCardState(true));
      dispatch(uiStateActions.updateBackToHomeState(true));
      return;
    }

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
    dispatch(uiStateActions.setShowTableState(false));
  };

  // CARD TEXT STYLE
  const cardTextStyle = (e) => {
    return {
      color: `${!isHome ? matchedType.color : ""}`,
    };
  };

  if (data.length === 0 && !isHome) {
    return (
      <div
        className={`emptyCardItem ${selected && "active"}`}
        onClick={onClickHandler}
      >
        <div className="emptyCardItem-top">
          <span
            className="cardItem-name"
            style={{
              color: `${
                (windowWidth < 577 && !isHome) || selected
                  ? matchedType.color
                  : ""
              }`,
            }}
          >
            {title}
          </span>
          <div
            className={`emptyCardItem-add__container ${selected && "active"}`}
          >
            <span className="emptyCardItem-add">Add data</span>
            <IoIosArrowForward className={`icon`} />
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
        <div className="cardItem-top">
          <span
            className="cardItem-name"
            style={{
              color: `${
                (windowWidth < 577 && !isHome) || selected
                  ? matchedType.color
                  : ""
              }`,
            }}
          >
            {title}
          </span>
          <div className={`cardItem-date__container ${selected && "active"}`}>
            <span className="cardItem-date">{formattedDate}</span>
            <IoIosArrowForward className="icon" />
          </div>
        </div>
        <div className="cardItem-bottom">
          <ValueContainer
            unit={unit}
            selectedUnit={selectedUnit}
            latestData={latestData}
            isDetailTab={false}
            isHome={isHome}
          />
          {isHome && matchedType.icons}
        </div>
      </div>
    );
  }
}

export default CardItem;
