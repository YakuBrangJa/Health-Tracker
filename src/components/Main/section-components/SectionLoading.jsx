import "./sectionLoading.css";
import SectionContainer from "./SectionContainer";

function LoadingChild() {
  return <div className="loading-child loading-animation"></div>;
}

function SectionLoading(props) {
  return (
    <SectionContainer title={props.title}>
      <div className="section-loading">
        <div className="loading-left">
          <h3 className="loading-animation"></h3>
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
        </div>
        <div className="loading-right">
          <div className="loading-right__head">
            <div className="icon loading-animation"></div>
            <h3 className="loading-animation"></h3>
            <span className="loading-animation"></span>
          </div>
          <div className="loading-date__nav loading-animation"></div>
          <div className="loading-unit__control">
            <div className="value loading-animation"></div>
            <div className="unit loading-animation"></div>
          </div>
          <div className="loading-graph loading-animation"></div>
        </div>
      </div>
    </SectionContainer>
  );
}

export default SectionLoading;
