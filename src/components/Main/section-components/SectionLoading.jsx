import "./sectionLoading.css";
import SectionContainer from "./SectionContainer";

function LoadingChild() {
  return <div className="loading-child"></div>;
}

function SectionLoading(props) {
  return (
    <SectionContainer title={props.title}>
      <div className="section-loading">
        <div className="loading-left">
          <h3></h3>
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
        </div>
        <div className="loading-right">
          <div className="loading-right__head">
            <div className="icon"></div>
            <h3></h3>
            <span></span>
          </div>
          <div className="loading-date__nav"></div>
          <div className="loading-unit__control">
            <div className="value"></div>
            <div className="unit"></div>
          </div>
          <div className="loading-graph"></div>
        </div>
      </div>
    </SectionContainer>
  );
}

export default SectionLoading;
