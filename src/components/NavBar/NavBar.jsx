import React, { useEffect } from "react";
import "./navbar.css";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";

import { uiStateActions } from "../../store/ui-state";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useActionSelector from "../../hooks/useActionSelector";

function NavBar() {
  const { sidebarOpen, darkTheme } = useSelector((state) => state.uiState);
  const { cardSelectState, backToHome, showTableState } = useSelector(
    (state) => state.uiState
  );
  const sidebarState = useSelector((state) => state.formState.sidebarState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { action } = useActionSelector(sidebarState);

  const themeChangeHandler = () => {
    dispatch(uiStateActions.setDarkTheme(!darkTheme));
  };

  const openSidebarHandler = () => {
    dispatch(uiStateActions.setSideBarOpenState(!sidebarOpen));
  };

  const goBackHandler = () => {
    if (showTableState) {
      dispatch(uiStateActions.setShowTableState(false));
      return;
    }

    dispatch(uiStateActions.setCardSelectState(false));
    dispatch(action.updateDataState(null));
    if (backToHome) {
      navigate(-1);
      dispatch(uiStateActions.updateBackToHomeState(false));
    }
  };

  return (
    <nav className={`navbar ${cardSelectState && "show-backBtn"}`}>
      <div className="nav-left">
        <button className="menu-btn" onClick={openSidebarHandler}>
          <IoMdMenu className=" icon" />
        </button>

        <div className="nav-search">
          <input type="search" placeholder="Search..." />
          <SearchIcon className="nav-search-icon" />
        </div>
      </div>

      <button className="text-btn nav-backBtn" onClick={goBackHandler}>
        <MdArrowBackIosNew className="icon" />
        <span>Back</span>
      </button>

      <div className="nav-right">
        <div className="item theme-toggle" onClick={themeChangeHandler}>
          {!darkTheme && <DarkModeIcon className="icon" />}
          {darkTheme && <LightModeOutlinedIcon className="icon" />}
        </div>
        {/* <div className="item">
          <NotificationsIcon />
          <span>2</span>
        </div>
        <div className="item">
          <DateRangeIcon />
          <span>1</span>
        </div> */}
        <div className="item user">
          <BsPersonCircle className="icon" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
