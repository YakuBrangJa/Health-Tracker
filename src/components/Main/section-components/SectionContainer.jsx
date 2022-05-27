import "./sectionContainer.css";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const SectionContainer = (props) => {
  const {
    cardSelectState: cardSelected,
    windowWidth,
    showTableState,
  } = useSelector((state) => state.uiState);
  const sectionStyle = useSelector((state) => state.sideBar);

  const matchedSection = Object.values(sectionStyle)
    .flat()
    .find((item) => item.title === props.title);

  const scrollRef = useRef();
  useEffect(() => {
    if (windowWidth > 576) return;
    scrollRef.current.scrollTop = 0;
  }, [cardSelected, windowWidth, showTableState]);

  return (
    <section
      className={`main-section ${cardSelected && "selected"}`}
      ref={scrollRef}
    >
      <div className="main-header">
        <h1>{props.title}</h1>
        {matchedSection.icons}
      </div>
      {props.children}
    </section>
  );
};

export default SectionContainer;
