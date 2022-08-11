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
import { TechnicalAnalysis } from "../components/dashboard/TechnicalAnalysis";
import { TotalMarketCap } from "../components/dashboard/TotalMarketCap";
import { Top10Coins } from "../components/dashboard/Top10Coins";
import { Top10CoinsTable } from "../components/dashboard/Top10CoinsTable";
import { HaberAnaliz } from "./HaberAnaliz";
import { HaberTablo } from "../components/dashboard/HaberTablo";
import { GuncelHaberler } from "../components/dashboard/GuncelHaberler";
import { BestWorstCoin } from "../components/dashboard/BestWorstCoin";
import { BestWorstCoinTable } from "../components/dashboard/BestWorstCoinTable";
import { ThousandPanel } from "../components/compare/ThousandPanel";
import { ThousandPanell } from "../components/company/Summary/ThousandPanell";

export const Dashboard = (company) => {
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

{/* format number işlemi yapılacak , açılacak 
      <TotalMarketCap/>
       */}
 {/* carousel yapısı kapalı , incelenecek , açılacak  */}
      <UpcomingDividend style={{ marginTop: "50px", marginBottom: "50px" }} />

      

      <Topbar />
      <div className="p-grid" style={{ marginTop: "10px" }}>
        <div className="p-col-12" style={{ marginTop: "50px" }}>
          {/* <StockTrade {...dash} /> */}
{/* anasayfada grafik yok , ama yapı başka yerde kullanılabilir 
        
          <Col>
            <h3 htmlFor="text-input" style={{marginLeft:"5%"}}>Coin-Durum Tablosu</h3>{" "}
            <div style={{marginLeft:"5%"}}>
            <ModuleTradingView/>
            </div>
            
          </Col>
 */}
 <div className="p-col-12" style={{ marginTop: "40px" }}>
        <BestWorstCoin/>
        </div>
          {/* <Sector /> */}

        </div>
      </div>
      <div className="p-grid" style={{ marginTop: "10px" }}>
{/* veriseti gelince açılacak 
        <div className="p-col-5" style={{ marginTop: "50px",marginLeft:"5%"}}>
          <Top10Coins/>
        </div>
         */}
{/* bu başlık kalkacak  
        <div className="p-col-5" style={{ marginTop: "40px" }}>
          <StockRecently />
        </div>
         */}
        <div className="p-col-12" style={{ marginTop: "40px" }}>
        <GuncelHaberler /*style={{ marginTop: "5%",marginBottom:"5%" }}*/ />
        </div>
      </div>

      {/* <TechnicalAnalysis style={{ marginTop: "50px" }} /> */}
      <LastComment />
      {/* <ThousandPanel code={company.code}/> */}
    </body>
  );

};
