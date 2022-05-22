//  ICONS

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import { FaLungs } from "react-icons/fa";
import { IoIosBody } from "react-icons/io";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

import uiState, { uiStateActions } from "../../store/ui-state";
import { useSelector, useDispatch } from "react-redux";

function Sidebar() {
  const sidebarOpen = useSelector((state) => state.uiState.sidebarOpen);
  const sidebarList = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const sideBarHander = () => {
    dispatch(uiStateActions.setSideBarOpenState(!sidebarOpen));
  };

  const selectedList = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#eee" : "",
      color: isActive ? "#457ddfee" : "",
    };
  };

  return (
    <section className={`sidebar ${!sidebarOpen && "collapse"}`}>
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
          <div className="sidebar-logo">LOGO</div>
          <div className="sidebar-close" onClick={sideBarHander}>
            <ArrowBackIosNewOutlinedIcon className="icon" />
            <ArrowBackIosNewOutlinedIcon className="icon" />
          </div>
        </div>
        <ul className="sidebar-mid">
          <p className="title">OVERVIEW</p>
          {sidebarList.overview.map((list) => (
            <li key={list.route} onClick={sideBarHander}>
              <NavLink to={list.route} style={selectedList}>
                {list.icons}
                <span>{list.title}</span>
              </NavLink>
            </li>
          ))}

          <p className="title">BROWSE</p>
          {sidebarList.browse.map((list) => (
            <li key={list.route} onClick={sideBarHander}>
              <NavLink to={list.route} style={selectedList}>
                {list.icons}
                <span>{list.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="sidebar-bottom">
          <p className="title">USER</p>
          {sidebarList.user.map((list) => (
            <li key={list.route} onClick={sideBarHander}>
              <NavLink to={list.route} style={selectedList}>
                {list.icons}
                <span>{list.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Sidebar;
