import React, { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Avatar } from "primereact/avatar";
import "./Haber_tab.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import ProductService from "../../service/ProductService";
import moment from "moment";
import "moment/locale/tr"; // haber tarih ve saatini tr formatında ayarlıyor
import { Link } from "react-router-dom";
import { BtcGenelBakis } from "./BtcGenelBakis";
import "./TeknikAnalizTab.css";
import { CardBody, CardHeader, Col, Row } from "reactstrap";
import { ModuleTradingView } from "./Chart";
import { Chart } from "primereact/chart";
import useAxios from "../../utils/useAxios";
import { LastComment } from "../LastComment";
import { TechnicalAnalysis, TradingViewWidget } from "./TechnicalAnalysis";
import { TemelAnalizGraf } from "./TemelAnalizGraf";
import { PieChartCrypto } from "./PieChartCrypto";

export const TeknikAnalizTab = () => {
  const [activeIndex1, setActiveIndex1] = useState(0); // tablar için
  return (
    <div className="tabview-demo">
      <div className="card-demo">
        <div className="bw-tab">
          <div className="card">
            <Card>
              <Button
                onClick={() => setActiveIndex1(0)}
                className="button-technical mr-1"
                label="Teknik Raporlama"
                style={{}}
              />
              <Button
                onClick={() => setActiveIndex1(1)}
                className="button-technical mr-1"
                label="Hacim Analizi "
              />
              <Button
                onClick={() => setActiveIndex1(2)}
                className="button-technical mr-1"
                label="İndikatör Durumları "
              />
              <Button
                onClick={() => setActiveIndex1(3)}
                className="button-technical mr-1"
                label="Piyasa Karşılaştırmaları "
              />
            </Card>
          </div>
        </div>
        <TabView
          activeIndex={activeIndex1}
          onTabChange={(e) => setActiveIndex1(e.index)}
        >
          <TabPanel header="teknik">
            <div className="p-grid">
              <div className="p-col-12">
                <div className="graph-tech">
                  <TemelAnalizGraf />
                </div>
                <Card
                  title="Teknik Analiz Raporu"
                  style={{ marginBottom: "2em" }}
                >
                  <p className="m-0" style={{ lineHeight: "1.5" }}>
                    22.07.2022 tarihi itibariyle günlük periyotta BTC grafiğine
                    baktığımızda haftayı pozitif kapanışla kapattığını
                    görebilmekteyiz. Geçen hafta da yaşanan düşüş dalgasıyla
                    beraber Fibonacci 2362.36 seviyesinden bulduğu destek ile
                    birlikte bu hafta güçlü kapanışlar izlemiş olduk. Bugün ki
                    kapanışa baktığımızda ise Fibonacci 2545.76 seviyesinden
                    satış baskısıyla karşı karşıya kaldığını görebilmekteyiz.
                    Yukarı yönlü hareketlerde takip edebileceğimiz 245.76
                    seviyesiyle beraber 2598.58 noktasını takip edebiliriz.
                    Destek noktası olarak ise Fibonacci 2475.72 seviyesiyle
                    beraber 2362.36 noktasını takip edebiliriz.
                  </p>
                </Card>
                <Card
                  title="Göreli Güç Endeksi (Relative Strength Index - RSI) Raporu"
                  style={{ marginBottom: "2em" }}
                >
                  <p className="m-0" style={{ lineHeight: "1.5" }}>
                    RSI anlık olarak 55.69 seviyesiyle beraber aşırı alım ya da
                    aşırı satım bölgesinde bulunmamakta.
                  </p>
                </Card>
                <Card
                  title="Hareketli Ortalamaların Mesafesi (Moving Average Convergence Divergence - MACD) Raporu"
                  style={{ marginBottom: "2em" }}
                >
                  <p className="m-0" style={{ lineHeight: "1.5" }}>
                    MACD indikatörümüzde en son 19 Temmuz tarihinde pozitif
                    kesişim meydana gelmişti. Son işlem gününe baktığımızda ise
                    histogram hareketlerin pozitif konumda olduğunu
                    görebilmekteyiz.
                  </p>
                </Card>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="hecim">
          <div className="p-grid">
              <div className="p-col-8">
                <div className="card">
                  <Card title="Kripto Paralara Göre Hacim" style={{ marginBottom: "2em" }}>
                    <p className="m-0" style={{ lineHeight: "1.5" }}>
                      <PieChartCrypto/>
                    </p>
                  </Card>
                </div>
              </div>
              <div className="p-col-4">
                <div className="card">
                  <Card title="BTC ÖZET" style={{ marginBottom: "2em" }}>
                    <header>Sektör : </header>
                    <br></br>
                    <header>Kriptografik Hash Algoritması:</header>
                    <br></br>
                    <header>Anonimlik:</header>
                  </Card>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
      <div className="grid">
        <span></span>
        <LastComment />
      </div>
    </div>
  );
};
