import React from "react";
import "./navbar.css";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdMenu } from "react-icons/io";

import { uiStateActions } from "../../store/ui-state";
import { useSelector, useDispatch } from "react-redux";

function NavBar() {
  const sidebarOpen = useSelector((state) => state.uiState.sidebarOpen);
  const dispatch = useDispatch();

  const openSidebarHandler = () => {
    dispatch(uiStateActions.setSideBarOpenState(!sidebarOpen));
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <IoMdMenu className="icon" onClick={openSidebarHandler} />
        <div className="nav-search">
          <input type="search" placeholder="Search..." />
          <SearchIcon className="nav-search-icon" />
        </div>
      </div>

      <div className="nav-right">
        <div className="item">
          <DarkModeIcon />
          {/* <LightModeOutlinedIcon /> */}
        </div>
        {/* <div className="item">
          <NotificationsIcon />
          <span>2</span>
        </div>
        <div className="item">
          <DateRangeIcon />
          <span>1</span>
        </div> */}
        <div className="item">
          <img src="#" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
