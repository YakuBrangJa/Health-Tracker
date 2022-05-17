import React, { useEffect, useState } from "react";

import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
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
import CycleTracker from "./components/Main/CycleTracker/CycleTracker";
import OtherData from "./components/Main/OtherData/OtherData";

import { formStateActions } from "./store/form-state";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(formStateActions.setSidebarState(location.pathname));
  }, [location]);

  return (
    <div className="app">
      <Sidebar />
      <main className="app-container">
        <NavBar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="vitals" element={<Vitals />} />
            <Route path="symptoms" element={<Symptoms />} />
            <Route path="medications" element={<Medications />} />
            <Route
              path="body-measurements"
              element={<BodyMeasurements isLoading={isLoading} />}
            />
            <Route path="heart" element={<Heart />} />
            <Route path="respiratory" element={<Respiratory />} />
            <Route path="sleep" element={<Sleep />} />
            <Route path="cycle-tracker" element={<CycleTracker />} />
            <Route path="other-data" element={<OtherData />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
