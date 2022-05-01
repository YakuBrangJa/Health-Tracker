import "./sectionContainer.css";

function SectionContainer(props) {
  return (
    <section className="main-section">
      <h1>{props.title}</h1>
      {props.children}
    </section>
  );
}

export default SectionContainer;
