import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";

import FavoriteIcon from "@mui/icons-material/Favorite";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import KingBedIcon from "@mui/icons-material/KingBed";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

import { FaLungs } from "react-icons/fa";
import { IoIosBody } from "react-icons/io";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  overview: [
    {
      title: "Home",
      icons: (
        <GridViewSharpIcon
          className="icon"
          style={{
            color: "#5001E6",
          }}
        />
      ),
      color: "#5001E6",
      route: "/home",
    },
    {
      title: "Vitals",
      icons: (
        <MonitorHeartIcon
          className="icon"
          style={{
            color: "#d55",
          }}
        />
      ),
      color: "#d55",
      route: "/vitals",
    },
    // {
    //   title: "Symptoms",
    //   icons: (
    //     <AssignmentIcon
    //       className="icon"
    //       style={{
    //         color: "#7707b3",
    //       }}
    //     />
    //   ),
    //   route: "/symptoms",
    // },
  ],
  browse: [
    {
      title: "Body Measurements",
      icons: (
        <IoIosBody
          className="icon"
          style={{
            color: "#b050e0",
          }}
        />
      ),
      color: "#b050e0",
      route: "/body-measurements",
    },
    {
      title: "Heart",
      icons: (
        <FavoriteIcon
          className="icon"
          style={{
            color: "#fe375f",
          }}
        />
      ),
      color: "#fe375f",
      route: "/heart",
    },
    {
      title: "Respiratory",
      icons: (
        <FaLungs
          className="icon"
          style={{
            color: "#2a80e8",
          }}
        />
      ),
      color: "#2a80e8",
      route: "/respiratory",
    },
    // {
    //   title: "Sleep",
    //   icons: <KingBedIcon />,
    //   color: "#69b389",
    //   route: "/sleep",
    // },

    {
      title: "Other Data",
      icons: (
        <AddCircleIcon
          className="icon"
          style={{
            color: "#35c759",
          }}
        />
      ),
      color: "#35c759",
      route: "/other-data",
    },
    // {
    //   title: "Menstrual Cycle",
    //   icons: (
    //     <DataSaverOffIcon
    //       className="icon"
    //       style={{
    //         color: "#e60e9a",
    //       }}
    //     />
    //   ),
    //   color: "#e60e9a",
    //   route: "/menstrual-cycle",
    // },
    // {
    //   title: "Medications",
    //   icons: <MedicationIcon />,
    //   color: "#14b309",
    //   route: "/medications",
    // },
  ],

  user: [
    {
      title: "Profile",
      icons: (
        <PersonIcon
          className="icon"
          style={{
            color: "#1e74dc",
          }}
        />
      ),
      color: "#1e74dc",
      route: "/profile",
    },
    {
      title: "Settings",
      icons: (
        <SettingsIcon
          className="icon"
          style={{
            color: "#1e74dc",
          }}
        />
      ),
      color: "#1e74dc",
      route: "/settings",
    },
  ],
};

const sideBarSlice = createSlice({
  name: "Sidebar",
  initialState,
  reducers: {},
});

export const sidebarActions = sideBarSlice.actions;

export default sideBarSlice.reducer;
