import { MdArrowForwardIos } from "react-icons/md";

import "./dataTable.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import CSSTransi
import { formStateActions } from "../../../../../store/form-state";

function DataTable({ data, actions, sidebarState }) {
  const dispatch = useDispatch();
  const [sortedData, setSortedData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [deletingItem, setDeletingItem] = useState(null);
  const [disableTransition, setDisableTransition] = useState(false);

  const unitState = useSelector((state) => state.formState.unitState);

  useEffect(() => {
    setSortedData(
      [...data].sort(
        (a, b) =>
          new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`)
      )
    );
  }, [data]);

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

  const deleteItemHandler = (id) => {
    setDeletingItem(id);

    const delayAddData = setTimeout(() => {
      dispatch(actions.removeData({ id, sidebarState }));
      dispatch(formStateActions.setDataSubmitted(true));
    }, 260);

    const delayTransition = setTimeout(() => {
      setDisableTransition(true);
    }, 250);
  };

  useEffect(() => {
    const clearTransiDisable = setTimeout(() => {
      setDisableTransition(false);
    }, 250);

    return () => clearTimeout(clearTransiDisable);
  }, [disableTransition]);

  if (data.length === 0)
    return (
      <div className="container-table">
        <p className="emptyTable">No Data</p>
      </div>
    );

  return (
    <div className={`container-table`}>
      <div className="table-head">
        <span>Value ({unitState.symbol})</span>
        <span>Date</span>
      </div>
      <ul className="table-body">
        {sortedData.map((item, i) => {
          return (
            <li
              key={i}
              className={`${selectedItem === item.id && "selected"} ${
                deletingItem === item.id && "deleting"
              } ${disableTransition && "transition-disabled"}`}
            >
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
              <span
                className="delete-span"
                onClick={() => deleteItemHandler(item.id)}
              >
                Delete
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DataTable;
