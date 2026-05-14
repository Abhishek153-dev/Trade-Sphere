import React from "react";
import { Route, Routes } from "react-router-dom";

import Funds from "./Funds";
import Holdings from "./Holdings";
import Apps from "./App";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>

      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Summary />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/holdings" element={<Holdings />} />
          <Route path="/dashboard/positions" element={<Positions />} />
          <Route path="/dashboard/funds" element={<Funds />} />
          <Route path="/dashboard/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;