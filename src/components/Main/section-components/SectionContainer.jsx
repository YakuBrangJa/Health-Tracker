import "./sectionContainer.css";
import { useSelector } from "react-redux";

function SectionContainer(props) {
  const cardSelected = useSelector((state) => state.uiState.cardSelectState);
  const sectionStyle = useSelector((state) => state.sideBar);

  const matchedSection = Object.values(sectionStyle)
    .flat()
    .find((item) => item.title === props.title);

  return (
    <section className={`main-section ${cardSelected && "selected"}`}>
      <div className="main-header">
        <h1>{props.title}</h1>
        {matchedSection.icons}
      </div>
      {props.children}
    </section>
  );
}

export default SectionContainer;
