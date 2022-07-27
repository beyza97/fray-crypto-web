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
import { ModuleTradingView } from "../components/dashboard/Chart";
import { TechnicalAnalysis } from "../components/dashboard/TechnicalAnalysisChart";
import { TotalMarketCap } from "../components/dashboard/TotalMarketCap";
import { BTChaber } from "../components/dashboard/BTChaber";
import { GuncelHaberler } from "../components/dashboard/GuncelHaberler";

export const HaberAnaliz = () => {
  const [dash, setDash] = useState([]);
  let api = useAxios();

  useEffect(() => {
    api.get("/crypto/news/all").then((res) => setDash(res.data));
  }, []);

  return (
    //bu body div olacak
    <body className="dashboard-body">
      {/* <CarouselPanel/> */}
      {/* <BistPanel {...dash} /> */}
      <TotalMarketCap/>
      <UpcomingDividend style={{ marginTop: "50px", marginBottom: "50px" }} />

      <div className="p-grid" style={{ marginTop: "10px" }}>
        <div className="p-col-12" style={{ marginTop: "50px" }}>
          {/* <StockTrade {...dash} /> */}

          <Col>
            <h3 htmlFor="text-input">BTC Haberler 'API hakkında sorulacak'</h3>{" "}
            <BTChaber/>
          </Col>
          <span></span>
          <Col>
            <h3 htmlFor="text-input">Guncel Piyasa Haberleri 'API hakkında sorulacak</h3>{" "}
            <GuncelHaberler/>
          </Col>
          {/* <Sector /> */}
        </div>
      </div>

    </body>
  );
};
