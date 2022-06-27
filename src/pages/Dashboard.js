import React, { useState, useEffect } from "react";
// import { BistPanel } from '../components/dashboard/BistPanel';
import { CarouselPanel } from "../components/dashboard/CarouselPanel";
import { Topbar } from "../components/dashboard/Topbar";
import useAxios from "../utils/useAxios";
// import { StockTrade } from '../components/dashboard/StockTrade';
import { StockFollow } from "../components/dashboard/StockFollow";
import { StockRecently } from "../components/dashboard/StockRecently";
// import { LatestReports } from "../components/dashboard/LatestReports";
// import { Sector } from "../components/dashboard/Sector";
import { UpcomingDividend } from "../components/dashboard/UpcomingDividend";
import { LastComment } from "../components/LastComment";
import ModuleTooltip from "../components/dashboard/ModuleTooltip";
import { Tooltip, Col, Label } from "reactstrap";
import { Card } from "reactstrap";
import TradingViewWidget from "react-tradingview-widget";
import {ModuleTradingView} from "../components/dashboard/Chart";
import { TechnicalAnalysis } from "../components/dashboard/TechnicalAnalysisChart";


export const Dashboard = () => {
  const [dash, setDash] = useState([]);
  let api = useAxios();

  useEffect(() => {
    api.get("/market/dash").then((res) => setDash(res.data));
  }, []);

  return (
    //bu body div olacak
    <body className="dashboard-body">
      {/* <CarouselPanel/> */}
      {/* <BistPanel {...dash} /> */}
      
      <Topbar />
      <div className="p-grid" style={{ marginTop: "10px" }}>
      <UpcomingDividend style={{marginTop:"50px", marginBottom:"50px"}}/>
      
        <div className="p-col-6" style={{marginTop:"50px"}}>
          {/* <StockTrade {...dash} /> */}
          
          <Col >
            <h3 htmlFor="text-input">Coin-Durum Tablosu</h3>{" "}
            <ModuleTradingView/>
          </Col>
          {/* <Sector /> */}
        </div>
        <div className="p-col-6" style={{marginTop:"50px"}} >
          <StockFollow />
          <StockRecently style={{marginTop:"50px"}}/>
          {/* <LatestReports /> */}
        </div>
      </div>
      <TechnicalAnalysis style={{marginTop:"50px"}}/>
      <LastComment />
    </body>
  );
};
