import { MdArrowForwardIos } from "react-icons/md";

import "./dataTable.css";
import { useSelector } from "react-redux";
import { useState } from "react";

function DataTable({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const unitState = useSelector((state) => state.formState.unitState);

  const sortedData = [...data].sort(
    (a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`)
  );

  const formatDate = (date, time) => {
    const fullDate = new Date(`${date}T${time}`);
    const curYearStart = new Date(new Date().getFullYear(), "0", "1");

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      year:
        fullDate.getTime() - curYearStart.getTime() < 0 ? "numeric" : undefined,
    }).format(fullDate);
  };

  const selectedHandler = (id) =>
    setSelectedItem(id === selectedItem ? null : id);

  return (
    <div className={`container-table`}>
      <div className="table-head">
        <span>Value ({unitState.symbol})</span>
        <span>Date</span>
      </div>
      <ul className="table-body">
        {sortedData.map((item, i) => {
          return (
            <li key={i} className={`${selectedItem === item.id && "selected"}`}>
              <div
                className="data-span"
                onClick={() => selectedHandler(item.id)}
              >
                <span className="value">{unitState.to(item.value)}</span>
                <div className="date-span">
                  <span className="date">
                    {formatDate(item.date, item.time)}
                  </span>
                  <MdArrowForwardIos className="icon" />
                </div>
              </div>
              <span className="delete-span">Delete</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DataTable;
