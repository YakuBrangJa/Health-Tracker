import "./section.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SectionContainer from "./SectionContainer";
import SectionLoading from "./SectionLoading";
import CardItem from "./CardItem/CardItem";
import Detail from "./Detail/Detail";

import useHttps from "../../../hooks/useHttps";
import { formStateActions } from "../../../store/form-state";

function Section({ data, title, componentState, error, actions }) {
  const dataArray = Object.values(data);
  const dataState = componentState.dataState;
  console.log(data);
  const dataKey = Object.keys(data).find((key) => data[key].id === dataState);

  const itemWithData = dataArray.filter((item) => item.data.length > 0);
  const itemWithoutData = dataArray.filter((item) => item.data.length === 0);

  const dispatch = useDispatch();
  const { sidebarState, dataSubmitted } = useSelector(
    (state) => state.formState
  );

  // SETTING ACTIVE ITEM ON LOAD
  useEffect(() => {
    if (componentState.firstClick) return;

    if (itemWithData.length > 0) {
      dispatch(actions.updateDataState(itemWithData[0].id));
    } else {
      dispatch(actions.updateDataState(itemWithoutData[0].id));
    }
  }, [itemWithData, itemWithoutData, componentState, actions]);

  const { sendRequest } = useHttps();

  // SENDING DATA TO FIREBASE
  useEffect(() => {
    // return;
    if (!dataSubmitted) return;
    console.log(dataKey);

    sendRequest({
      url: `https://health-tracker-69c66-default-rtdb.firebaseio.com/health-tracker${sidebarState}/${dataKey}.json`,
      method: "PUT",
      body: {
        id: data[dataKey].id,
        title: data[dataKey].title,
        selectedUnit: data[dataKey].selectedUnit,
        data: data[dataKey].data,
      },
    });

    dispatch(formStateActions.setDataSubmitted(false));
  }, [data, dataKey, sendRequest]);

  return (
    <SectionContainer title={title}>
      <div className="section-container">
        <div className="container-left">
          <div className="container-child">
            <div className="summary">
              {itemWithData.length > 0 && <h3>Summary</h3>}
              {itemWithData.map((value) => {
                return (
                  <CardItem
                    key={value.id}
                    id={value.id}
                    title={value.title}
                    data={value.data}
                    unit={value.unit}
                    selectedUnit={value.selectedUnit}
                    type={value.type}
                    selected={dataState === value.id}
                    actions={actions}
                  />
                );
              })}
            </div>
            <div className="noData">
              {itemWithoutData.length > 0 && <h3>No Data</h3>}
              {itemWithoutData.map((value) => {
                return (
                  <CardItem
                    key={value.id}
                    id={value.id}
                    title={value.title}
                    data={value.data}
                    unit={value.unit}
                    selectedUnit={value.selectedUnit}
                    type={value.type}
                    selected={dataState === value.id}
                    actions={actions}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="container-right">
          {data[dataKey] && (
            <Detail
              key={data[dataKey].id}
              id={data[dataKey].id}
              title={data[dataKey].title}
              data={data[dataKey].data}
              unit={data[dataKey].unit}
              selectedUnit={data[dataKey].selectedUnit}
              actions={actions}
              chartConfig={data[dataKey].chartConfig}
            />
          )}
        </div>
      </div>
    </SectionContainer>
  );
}

export default Section;
