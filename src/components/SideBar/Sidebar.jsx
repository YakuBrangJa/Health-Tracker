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
            <span>Summary</span>
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
        <li>
          <NavLink to="/medications" style={selectedList}>
            <MedicationIcon
              className="icon"
              style={{
                color: "#14B309",
              }}
            />
            <span>Medications</span>
          </NavLink>
        </li>

        <p className="title">BROWSE</p>
        <li>
          <NavLink to="/body-measurements" style={selectedList}>
            <AccessibilityIcon
              className="icon"
              style={{
                color: "#DC34E6",
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
                color: "#E63600",
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
                color: "#3F88FC",
              }}
            />
            <span>Respiratory</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/sleep" style={selectedList}>
            <KingBedIcon
              className="icon"
              style={{
                color: "#29B389",
              }}
            />
            <span>Sleep</span>
          </NavLink>
        </li>

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
            <AddCircleIcon className="icon" />
            <span>Other Data</span>
          </NavLink>
        </li>
        <p className="title">USER</p>
        <li>
          <NavLink to="/other-data" style={selectedList}>
            <PersonIcon className="icon" />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/other-data" style={selectedList}>
            <SettingsIcon className="icon" />
            <span>Setting</span>
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;

// const text = {
//   color: "#888",
//   fontSize: 14,
//   fontWeight: 550,
// };

// const subHeaderStyle = {
//   height: 32,
//   display: "flex",
//   alignItems: "center",
//   marginTop: 1,
//   color: "#777",
//   fontSize: 14,
//   fontWeight: 500,
// };

// const listItemButton = {
//   padding: 0.5,
//   pl: 2.5,
//   gap: 1,
//   backgroundColor: "#444",
// };

// const listItemButtonChild = {
//   padding: 0.5,
//   pl: 4,
//   gap: 1.5,
// };

// const listItemIcon = {
//   minWidth: "auto",
//   color: "#888",
// };

// <List
// sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
// component="nav"
// aria-labelledby="nested-list-subheader"
// subheader={
//   <ListSubheader
//     component="div"
//     id="nested-list-subheader"
//     sx={subHeaderStyle}
//   >
//     SUMMARY
//   </ListSubheader>
// }
// >
// <ListItemButton
//   component={Link}
//   to="/"
//   selected={selectedIndex === 0}
//   selectedItemStyle={{ backgroundColor: "red" }}
//   sx={listItemButton}
//   onClick={(event) => handleSelected(event, 0)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <GridViewSharpIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Summary"
//   />
// </ListItemButton>
// <hr />
// <ListItemButton
//   component={Link}
//   to="/vitals"
//   sx={listItemButton}
//   selected={selectedIndex === 1}
//   onClick={(event) => handleSelected(event, 1)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <MonitorHeartIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Vitals"
//   />
// </ListItemButton>
// <hr />

// <ListItemButton
//   component={Link}
//   to="/body-measurements"
//   sx={listItemButton}
//   selected={selectedIndex === 2}
//   onClick={(event) => handleSelected(event, 2)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <AccessibilityIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Body measurments"
//   />
// </ListItemButton>
// <hr />

// <ListItemButton
//   component={Link}
//   to="/medications"
//   sx={listItemButton}
//   selected={selectedIndex === 3}
//   onClick={(event) => handleSelected(event, 3)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <MedicationIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Medications"
//   />
// </ListItemButton>
// <hr />
// </List>

// <List
// sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
// component="nav"
// aria-labelledby="nested-list-subheader"
// subheader={
//   <ListSubheader
//     component="div"
//     id="nested-list-subheader"
//     sx={subHeaderStyle}
//   >
//     BROWSE
//   </ListSubheader>
// }
// >
// <ListItemButton
//   selected={selectedIndex === 4}
//   sx={listItemButton}
//   onClick={(event) => handleSelected(event, 4)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <FavoriteIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Heart"
//   />
// </ListItemButton>
// <hr />
// <ListItemButton
//   sx={listItemButton}
//   selected={selectedIndex === 5}
//   onClick={(event) => handleSelected(event, 5)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <AccessibilityIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Respiratory"
//   />
// </ListItemButton>
// <hr />

// <ListItemButton
//   sx={listItemButton}
//   selected={selectedIndex === 6}
//   onClick={(event) => handleSelected(event, 6)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <KingBedIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Sleep"
//   />
// </ListItemButton>
// <hr />

// <ListItemButton
//   sx={listItemButton}
//   selected={selectedIndex === 7}
//   onClick={(event) => handleSelected(event, 7)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <AssignmentIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Symptoms"
//   />
// </ListItemButton>
// <hr />

// <ListItemButton
//   sx={listItemButton}
//   selected={selectedIndex === 8}
//   onClick={(event) => handleSelected(event, 8)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <DataSaverOffIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Cycle tracker"
//   />
// </ListItemButton>
// <hr />

// <ListItemButton
//   sx={listItemButton}
//   selected={selectedIndex === 9}
//   onClick={(event) => handleSelected(event, 9)}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <AddCircleIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Other data"
//   />
// </ListItemButton>
// <hr />

// <ListItemButton
//   sx={listItemButton}
//   selected={selectedIndex === 10}
//   onClick={(event) => {
//     handleClick();
//     handleSelected(event, 10);
//   }}
// >
//   <ListItemIcon sx={listItemIcon}>
//     <InboxIcon className="sidebar-icon" />
//   </ListItemIcon>
//   <ListItemText
//     primaryTypographyProps={{ style: text }}
//     primary="Inbox"
//   />
//   {open ? <ExpandLess /> : <ExpandMore />}
// </ListItemButton>
// <hr />

// <Collapse in={open} timeout="auto" unmountOnExit>
//   <List component="div" disablePadding>
//     <ListItemButton sx={listItemButtonChild}>
//       <ListItemIcon sx={listItemIcon}>
//         <StarBorder className="sidebar-icon" />
//       </ListItemIcon>
//       <ListItemText primary="Starred" />
//     </ListItemButton>
//   </List>
// </Collapse>
// </List>
