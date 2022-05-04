import "./section.css";

import SectionContainer from "./SectionContainer";
import CardItem from "./CardItem";
import Detail from "./Detail";

function Section({ data, title, componentState, error, actions }) {
  const itemWithData = data.filter((item) => item.data.length > 0);
  const itemWithoutData = data.filter((item) => item.data.length === 0);

  const dataState = componentState.dataState;

  return (
    <SectionContainer title={title}>
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
                    actions={actions}
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
                    actions={actions}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="container-right">
          {data
            .filter((value) => value.id === dataState)
            .map((value) => (
              <Detail
                key={value.id}
                id={value.id}
                title={value.title}
                data={0}
                unit={value.unit}
                actions={actions}
              />
            ))}
        </div>
      </div>
    </SectionContainer>
  );
}

export default Section;
