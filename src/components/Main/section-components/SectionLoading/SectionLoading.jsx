import "./sectionLoading.css";
import SectionContainer from "../SectionContainer";
import LoadingCard from "./LoadingCard";

function SectionLoading(props) {
  return (
    <SectionContainer title={props.title}>
      <div className="section-loading">
        <div className="loading-left">
          <h3 className="loading-animation"></h3>
          <div className="child-container">
            <LoadingCard delay="delay1" />
            <LoadingCard delay="delay2" />
            <LoadingCard delay="delay3" />
            <LoadingCard delay="delay4" />
            <LoadingCard delay="delay1" />
          </div>
        </div>
        <div className="loading-right">
          <div className="loading-right__head">
            <div className="icon loading-animation"></div>
            <h3 className="loading-animation"></h3>
            <span className="loading-animation"></span>
          </div>
          <div className="loading-date__nav loading-animation"></div>
          <div className="loading-unit__control">
            <div className="date loading-animation"></div>
            <div className="value loading-animation"></div>
          </div>
          <div className="loading-graph loading-animation delay2"></div>
          <div className="loading-show__data loading-animation delay1"></div>
        </div>
      </div>
    </SectionContainer>
  );
}

export default SectionLoading;
