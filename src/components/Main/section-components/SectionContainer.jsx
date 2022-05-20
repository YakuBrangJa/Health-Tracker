import "./sectionContainer.css";
import { useSelector } from "react-redux";

function SectionContainer(props) {
  const cardSelected = useSelector((state) => state.uiState.cardSelectState);
  return (
    <section className={`main-section ${cardSelected && "selected"}`}>
      <h1>{props.title}</h1>
      {props.children}
    </section>
  );
}

export default SectionContainer;
