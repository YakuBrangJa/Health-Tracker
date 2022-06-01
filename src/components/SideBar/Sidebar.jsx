import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import React, { useRef, useState } from "react";
// import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

import Backdrop from "../Modals/Backdrop";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import { uiStateActions } from "../../store/ui-state";
import { useSelector, useDispatch } from "react-redux";

function Sidebar() {
  const { sidebarOpen, darkTheme, windowWidth } = useSelector(
    (state) => state.uiState
  );
  const sidebarList = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  const sidebarRef = useRef();

  const [finishedCollapse, setFinishedCollapse] = useState(true);

  const sideBarHander = () => {
    dispatch(uiStateActions.setSideBarOpenState(!sidebarOpen));
  };
  const sideBarClose = () => {
    dispatch(uiStateActions.setSideBarOpenState(false));
    dispatch(uiStateActions.setCardSelectState(false));
    dispatch(uiStateActions.setShowTableState(false));
    setFinishedCollapse(false);
    setTimeout(() => {
      setFinishedCollapse(true);
    }, 300);
  };

  const selectedList = ({ isActive }) => {
    return {
      backgroundColor: isActive && (!darkTheme ? "#eee" : "#1f252f"),
      color: isActive ? "#457ddfee" : "",
    };
  };

  useOnClickOutside(
    sidebarRef,
    () => dispatch(uiStateActions.setSideBarOpenState(false)),
    sidebarOpen
  );

  return (
    <section
      className={`sidebar ${!sidebarOpen && "collapse"}  ${
        finishedCollapse && "finished-collapse"
      }`}
      ref={sidebarRef}
    >
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
          <div className="sidebar-logo">LOGO</div>
          <button className="sidebar-close" onClick={sideBarHander}>
            <ArrowBackIosNewOutlinedIcon className="icon" />
            <ArrowBackIosNewOutlinedIcon className="icon" />
          </button>
        </div>
        <ul className="sidebar-mid">
          <p className="title">OVERVIEW</p>
          {sidebarList.overview.map((list) => (
            <li key={list.route} onClick={sideBarClose}>
              <NavLink to={list.route} style={selectedList}>
                {list.icons}
                <span>{list.title}</span>
              </NavLink>
            </li>
          ))}

          <p className="title">BROWSE</p>
          {sidebarList.browse.map((list) => (
            <li key={list.route} onClick={sideBarClose}>
              <NavLink to={list.route} style={selectedList}>
                {list.icons}
                <span>{list.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="sidebar-bottom">
          {/* <p className="title">USER</p> */}
          {sidebarList.user.map((list) => (
            <li key={list.route} onClick={sideBarClose}>
              <NavLink to={list.route} style={selectedList}>
                {list.icons}
                <span>{list.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {windowWidth < 576 && sidebarOpen && <Backdrop />}
    </section>
  );
}

export default Sidebar;
