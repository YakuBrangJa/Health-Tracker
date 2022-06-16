import "./section.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SectionContainer from "./SectionContainer";
import SectionLoading from "./SectionLoading/SectionLoading";
import CardItem from "./CardItem/CardItem";
import Detail from "./Detail/Detail";

import useHttps from "../../../hooks/useHttps";
import { formStateActions } from "../../../store/form-state";
import { uiStateActions } from "../../../store/ui-state";

function Section({
  data,
  title,
  componentState,
  actions,
  // isLoading,
  vitalsActions,
}) {
  const dataArray = Object.values(data);
  const dataState = componentState.dataState;

  const dataKey = Object.keys(data).find((key) => data[key].id === dataState);

  const itemWithData = dataArray.filter((item) => item.data.length > 0);
  const itemWithoutData = dataArray.filter((item) => item.data.length === 0);

  const dispatch = useDispatch();
  const { sidebarState, dataSubmitted } = useSelector(
    (state) => state.formState
  );
  const { cardSelectState, isLoading, fromHomeCard, windowWidth } = useSelector(
    (state) => state.uiState
  );

  useEffect(() => {
    dispatch(uiStateActions.updateFromHomeCardState(false));
    if (fromHomeCard) return;
    dispatch(uiStateActions.setCardSelectState(false));
  }, []);

  // const scrollRef = useRef(null);
  // const executeScroll = () => (scrollRef.current.scrollTop = 0);

  // SETTING ACTIVE ITEM ON LOAD
  useEffect(() => {
    if (sidebarState === "/vitals" || !actions) return;
    if (componentState.firstClick || windowWidth < 576) return;
    if (itemWithData.length > 0) {
      dispatch(actions.updateDataState(itemWithData[0].id));
    } else if (itemWithoutData.length > 0) {
      dispatch(actions.updateDataState(itemWithoutData[0].id));
    }
  }, [
    itemWithData,
    itemWithoutData,
    componentState,
    actions,
    windowWidth,
    sidebarState,
  ]);

  useEffect(() => {
    if (sidebarState !== "/vitals" || !vitalsActions) return;
    if (componentState.firstClick || windowWidth < 576) return;
    if (itemWithData.length > 0) {
      dispatch(vitalsActions.updateDataState(itemWithData[0].id));
      dispatch(
        itemWithData[0].actions.updateVitalsDataState(itemWithData[0].id)
      );
    } else if (itemWithoutData.length > 0) {
      dispatch(vitalsActions.updateDataState(itemWithoutData[0].id));
      dispatch(
        itemWithoutData[0].actions.updateVitalsDataState(itemWithoutData[0].id)
      );
    }
  }, [
    itemWithData,
    itemWithoutData,
    componentState,
    vitalsActions,
    windowWidth,
    sidebarState,
    actions,
  ]);

  // // SENDING DATA TO FIREBASE
  // const { sendRequest } = useHttps();
  // useEffect(() => {
  //   // return;
  //   if (!dataSubmitted) return;

  //   sendRequest({
  //     url: `https://clone-demo-c5cc6-default-rtdb.firebaseio.com/health-tracker${
  //       sidebarState === "/vitals" ? data[dataKey].route : sidebarState
  //     }/${dataKey}.json`,
  //     method: "PUT",
  //     body: {
  //       id: data[dataKey].id,
  //       title: data[dataKey].title,
  //       selectedUnit: data[dataKey].selectedUnit,
  //       data: data[dataKey].data,
  //       favourite: data[dataKey].favourite,
  //     },
  //   });

  //   dispatch(formStateActions.setDataSubmitted(false));
  // }, [data, dataKey, sendRequest, sidebarState]);
  // // END OF SENDING DATA TO FIREBASE

  // const [testLoading, setTestLoading] = useState(true);
  if (isLoading) return <SectionLoading title={title}></SectionLoading>;

  return (
    <SectionContainer title={title}>
      <div className="section-container">
        <div className={`container-left ${cardSelectState && "selected"}`}>
          <div className="container-child">
            {itemWithData.length > 0 && (
              <div className="summary">
                <h3>Summary</h3>
                <div>
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
                        actions={title === "Vitals" ? value.actions : actions}
                        vitalsActions={vitalsActions}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {itemWithoutData.length > 0 && (
              <div className="noData">
                <h3>No Data</h3>
                <div>
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
                        actions={title === "Vitals" ? value.actions : actions}
                        vitalsActions={vitalsActions}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={`container-right ${cardSelectState && "selected"}`}>
          {data[dataKey] && (
            <Detail
              key={data[dataKey].id}
              id={data[dataKey].id}
              title={data[dataKey].title}
              data={data[dataKey].data}
              unit={data[dataKey].unit}
              favourite={data[dataKey].favourite}
              selectedUnit={data[dataKey].selectedUnit}
              type={data[dataKey].type}
              actions={title === "Vitals" ? data[dataKey].actions : actions}
              chartConfig={data[dataKey].chartConfig}
              dataKey={dataKey}
            />
          )}
        </div>
      </div>
    </SectionContainer>
  );
}

export default Section;
