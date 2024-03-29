import React, { useEffect } from "react";

import "./App.css";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/SideBar/Sidebar";

// MAIN COMPNENTS
import Home from "./components/Main/Home/Home";
import Vitals from "./components/Main/Vitals/Vitals";
import Symptoms from "./components/Main/Symptoms/Symptoms";
import Medications from "./components/Main/Medications/Medications";
import BodyMeasurements from "./components/Main/BodyMeasurements/BodyMeasurements";
import Heart from "./components/Main/Heart/Heart";
import Respiratory from "./components/Main/Respiratory/Respiratory";
import Sleep from "./components/Main/Sleep/Sleep";
import MenstrualCycle from "./components/Main/MenstrualCycle/MenstrualCycle";
import OtherData from "./components/Main/OtherData/OtherData";

// LAZY LOADINGS

import useDataRequest2 from "./hooks/useDataReuquest2";
import useLocalStorageData from "./hooks/useLocalStorageData";
import { formStateActions } from "./store/form-state";
import { uiStateActions } from "./store/ui-state";

import { heartActions } from "./store/heart";
import { respiratoryActions } from "./store/respiratory";
import { bodyMeasurementsActions } from "./store/body-measurements";
import { otherDataActions } from "./store/other-data";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const firstRun = useSelector((state) => state.uiState.firstRun);

  // READING ACTIVE SIDEBAR
  useEffect(() => {
    dispatch(formStateActions.setSidebarState(location.pathname));
  }, [location]);

  // GETTING DATA FROM LOCALSTORAGE
  useLocalStorageData("body-measurements", bodyMeasurementsActions, {});
  useLocalStorageData("heart", heartActions, {});
  useLocalStorageData("respiratory", respiratoryActions, {});
  useLocalStorageData("other-data", otherDataActions, {});

  // FETCHING DATA
  // const { isLoading, error, fetchData } = useDataRequest2();

  // useEffect(() => {
  //   if (!firstRun) return;
  //   fetchData("body-measurements", bodyMeasurementsActions);
  //   fetchData("heart", heartActions);
  //   fetchData("respiratory", respiratoryActions);
  //   fetchData("other-data", otherDataActions);
  // }, [fetchData, firstRun]);

  // useEffect(() => {
  //   dispatch(uiStateActions.updateLoadingDataState(isLoading));
  // }, [isLoading]);

  // END OF FETCHING DATA

  return (
    <div className={`app `}>
      <Sidebar />
      <main className="app-container">
        <NavBar />
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="vitals" element={<Vitals />} />
          <Route path="body-measurements" element={<BodyMeasurements />} />
          <Route path="heart" element={<Heart />} />
          <Route path="respiratory" element={<Respiratory />} />
          <Route path="other-data" element={<OtherData />} />
          <Route path="menstrual-cycle" element={<MenstrualCycle />} />
          {/* <Route path="symptoms" element={<Symptoms />} /> */}
          {/* <Route path="medications" element={<Medications />} /> */}
          {/* <Route path="sleep" element={<Sleep />} /> */}

          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
