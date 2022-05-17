//  ICONS

import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import KingBedIcon from "@mui/icons-material/KingBed";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import { FaLungs } from "react-icons/fa";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const selectedList = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#eee" : "",
      // color: isActive ? "#fff" : "",
    };
  };

  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">LOGO</div>
        <ArrowBackIosNewOutlinedIcon className="sidebar-btn" />
      </div>
      <ul>
        <p className="title">SUMMARY</p>
        <li>
          <NavLink to="/" style={selectedList}>
            <GridViewSharpIcon
              className="icon"
              style={{
                color: "#5001E6",
              }}
            />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/vitals" style={selectedList}>
            <MonitorHeartIcon
              className="icon"
              style={{
                color: "#d55",
              }}
            />
            <span>Vitals</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/symptoms" style={selectedList}>
            <AssignmentIcon
              className="icon"
              style={{
                color: "#7707B3",
              }}
            />
            <span>Symptoms</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/medications" style={selectedList}>
            <MedicationIcon
              className="icon"
              style={{
                color: "#14B309",
              }}
            />
            <span>Medications</span>
          </NavLink>
        </li> */}

        <p className="title">BROWSE</p>
        <li>
          <NavLink to="/body-measurements" style={selectedList}>
            <AccessibilityIcon
              className="icon"
              style={{
                color: "#bf5af2",
              }}
            />
            <span>Body Measurements</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/heart" style={selectedList}>
            <FavoriteIcon
              className="icon"
              style={{
                color: "#fe375f",
              }}
            />
            <span>Heart</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/respiratory" style={selectedList}>
            <FaLungs
              className="icon"
              style={{
                color: "#54a1ff",
              }}
            />
            <span>Respiratory</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/sleep" style={selectedList}>
            <KingBedIcon
              className="icon"
              style={{
                color: "#69B389",
              }}
            />
            <span>Sleep</span>
          </NavLink>
        </li> */}

        <li>
          <NavLink to="/cycle-tracker" style={selectedList}>
            <DataSaverOffIcon
              className="icon"
              style={{
                color: "#E60E9A",
              }}
            />
            <span>Cycle Tracker</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/other-data" style={selectedList}>
            <AddCircleIcon
              className="icon"
              style={{
                color: "#1e74dc",
              }}
            />
            <span>Other Data</span>
          </NavLink>
        </li>
        <p className="title">USER</p>
        <li>
          <NavLink to="/profile" style={selectedList}>
            <PersonIcon className="icon" />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/setting" style={selectedList}>
            <SettingsIcon className="icon" />
            <span>Setting</span>
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;
