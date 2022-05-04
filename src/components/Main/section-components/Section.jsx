import React, { useEffect, useState } from "react";
import "./section.css";

import { useSelector, useDispatch } from "react-redux";

import SectionContainer from "./SectionContainer";
import CardItem from "./CardItem";
import Detail from "./Detail";
import SectionLoading from "./SectionLoading";
import { formStateActions } from "../../../store/form-state";

function Section(props) {
  const itemWithData = props.data.filter((item) => item.data.length > 0);
  const itemWithoutData = props.data.filter((item) => item.data.length === 0);

  const dispatch = useDispatch();
  const dataState = props.componentState.dataState;
  console.log(props.componentState.dataState);

  return (
    <SectionContainer title={props.title}>
      <div className="section-container">
        <div className="container-left">
          <div className="container-child">
            <div className="summary">
              {itemWithData.length > 0 && <h3>Summary</h3>}
              {itemWithData.map((value, i) => {
                return (
                  <CardItem
                    key={value.id}
                    id={value.id}
                    title={value.title}
                    data={value.data}
                    unit={value.unit}
                    type={value.type}
                    index={i}
                    selected={dataState === value.id}
                    dispatchOnClick={props.dispatchOnClick}
                  />
                );
              })}
            </div>
            <div className="noData">
              {itemWithoutData.length > 0 && <h3>No Data</h3>}
              {itemWithoutData.map((value, i) => {
                return (
                  <CardItem
                    key={value.id}
                    id={value.id}
                    title={value.title}
                    data={value.data}
                    unit={value.unit}
                    type={value.type}
                    selected={dataState === value.id}
                    dispatchOnClick={props.dispatchOnClick}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="container-right">
          {props.data
            .filter((value) => value.id === dataState)
            .map((value) => (
              <Detail
                key={value.id}
                id={value.id}
                title={value.title}
                data={0}
                unit={value.unit}
              />
            ))}
        </div>
      </div>
    </SectionContainer>
  );
}

export default Section;
