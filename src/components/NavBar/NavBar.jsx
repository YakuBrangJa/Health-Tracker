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

function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
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
        <div className="item">
          <NotificationsIcon />
          <span>2</span>
        </div>
        <div className="item">
          <DateRangeIcon />
          <span>1</span>
        </div>
        <div className="item">
          <img src="#" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
