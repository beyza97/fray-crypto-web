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
import "./BtcTabsTable.css";
import { CardBody, CardHeader, Col, Row } from "reactstrap";
import { ModuleTradingView } from "./Chart";
import { Chart } from "primereact/chart";
import useAxios from "../../utils/useAxios";
import { TemelAnalizTab } from "./TemelAnalizTab";
import { TeknikAnalizTab } from "./TeknikAnalizTab";
import { Template } from "devextreme-react";
import { TemelAnalizGraf } from "./TemelAnalizGraf";

export const BTCTabsTable = ({ news, tt, code  }) => {
  const [activeIndex1, setActiveIndex1] = useState(0); // tablar için
  const defaultChartData = {
    // radar grafiği için
    labels: [
      "Likidite",
      "Hacim",
      "Haber-Sosyal Medya",
      "Teknik Rapor",
      "İndikatör",
    ],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(174,254,255,1)",
        pointBorderColor: "#4FBDBA",
        pointHoverBackgroundColor: "#4FBDBA",
        pointHoverBorderColor: "rgba(174,254,255,1)",
        data: [65, 59, 90, 81, 56, 55, 40],
      },
      {
        label: "My Second dataset",
        backgroundColor: "rgba(61, 228, 176,0.2)",
        borderColor: "rgba(61, 228, 176,1)",
        pointBackgroundColor: "rgba(53, 133, 139,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,99,132,1)",
        data: [28, 48, 40, 19, 96, 27, 100],
      },
    ],
  };

  const lightOptions = {
    // radar grafiği için
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      r: {
        pointLabels: {
          color: "#495057",
        },
        grid: {
          color: "#256D85",
        },
        angleLines: {
          color: "#59CE8F",
        },
      },
    },
  };

  if (news) {
    news.map(
      (item) => (item.a = moment(item.publication_datetime).format("llll"))
    );
  }
  console.log("news", news);
  console.log("tt- 20 coin ", tt);
  let api = useAxios ();
  const[coinsummary, setCoinSumamry]=useState();
  useEffect(() => {
    api
      .get("/crypto/coin/dominance?ccy=USD")
      .then((res) => setCoinSumamry(res.data))
      .catch((err) => console.log("error", err));
  }, []);

  return news ? (
    <div className="tabview-demo">
      <div className="card-demo">
        <div className=" bw-tab">
          <Button
            onClick={() => setActiveIndex1(0)}
            className="five-header-tab mr-1"
            label=" Genel Bakış"
            style={{
              backgroundImage:
                " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
              marginRight: "3%",
              marginLeft:"5%",
              textDecorationColor:"A4C3A2",
            }}
          />
          <Button
            onClick={() => setActiveIndex1(1)}
            className="five-header-tab mr-1"
            label="Temel Analiz "
            style={{
              fontSize: "",
              backgroundImage:
                " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
              marginRight: "3%",
              marginLeft:"5%"
            }}
          />
          <Button
            onClick={() => setActiveIndex1(2)}
            className="five-header-tab mr-1"
            label="Teknik Analiz "
            style={{
              backgroundImage:
                " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
              marginRight: "3%",
              marginLeft:"5%"
            }}
          />
          <Button
            onClick={() => setActiveIndex1(3)}
            className="five-header-tab mr-1"
            label="Haber Analizi "
            style={{
              backgroundImage:
                " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
              marginRight: "3%",
              marginLeft:"5%"
            }}
          />
          <Button
            onClick={() => setActiveIndex1(4)}
            className="five-header-tab mr-1"
            label="Isı Haritası "
            style={{
              backgroundImage:
                " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
              marginRight: "3%",
              marginLeft:"5%"
            }}
          />
        </div>

        <TabView
          //   className=" table"
          activeIndex={activeIndex1}
          onTabChange={(e) => setActiveIndex1(e.index)}
        >
          <TabPanel header="1">
            <div className="p-grid">
              <div className="p-col-8">
                <div className="card">
                  <Card title="BTC ÖZET" style={{ marginBottom: "2em" }}>
                    <p className="m-0" style={{ lineHeight: "1.5" }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Inventore sed consequuntur error repudiandae numquam
                      deserunt quisquam repellat libero asperiores earum nam
                      nobis, culpa ratione quam perferendis esse, cupiditate
                      neque quas!Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Inventore sed consequuntur error
                      repudiandae numquam deserunt quisquam repellat libero
                      asperiores earum nam nobis, culpa ratione quam perferendis
                      esse, cupiditate neque quas!Lorem ipsum dolor sit amet,
                      consectetur adipisicing elit. Inventore sed consequuntur
                      error repudiandae numquam deserunt quisquam repellat
                      libero asperiores earum nam nobis, culpa ratione quam
                      perferendis esse, cupiditate neque quas!Lorem ipsum dolor
                      sit amet, consectetur adipisicing elit. Inventore sed
                      consequuntur error repudiandae numquam deserunt quisquam
                      repellat libero asperiores earum nam nobis, culpa ratione
                      quam perferendis esse, cupiditate neque quas!Lorem ipsum
                      dolor sit amet, consectetur adipisicing elit. Inventore
                      sed consequuntur error repudiandae numquam deserunt
                      quisquam repellat libero asperiores earum nam nobis, culpa
                      ratione quam perferendis esse, cupiditate neque quas!Lorem
                      ipsum dolor sit amet, consectetur adipisicing elit.
                      Inventore sed consequuntur error repudiandae numquam
                      deserunt quisquam repellat libero asperiores earum nam
                      nobis, culpa ratione quam perferendis esse, cupiditate
                      neque quas!Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit. Inventore sed consequuntur error
                      repudiandae numquam deserunt quisquam repellat libero
                      asperiores earum nam nobis, culpa ratione quam perferendis
                      esse, cupiditate neque quas!
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
            <div>
              <h3> Coin Fiyat Grafiği</h3>
              <TemelAnalizGraf/>
            </div>
            <div style={{ marginTop: "3%" }}>
              <Card>
                <h3> Radar Grafiği</h3>
                
                <div className="card flex justify-content-center p-grid">
                  <div className="p-col-8">
                    <Chart
                      type="radar"
                      data={defaultChartData}
                      options={lightOptions}
                      style={{ position: "relative", width: "40%" }}
                    />
                  </div>
                  <div className="p-col-2">
                    <Card>
                        <Row> Genel Skor </Row>
                        <Row>
                            <Col> Haber</Col>
                            <Col>Likidite</Col>
                            <Col>İndikatör</Col>
                            <Col>Teknik Rapor</Col>
                            <Col>Hacim</Col>
                        </Row>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>
            <div style={{ marginTop: "3%" }}>
              <Card>
                <h3> 1.000₺'nize Ne Oldu?</h3>
                <div className=" bw-tab">
                  <Button
                    onClick={() => setActiveIndex1(0)}
                    className="p-button-text mr-1"
                    label=" 7 Günlük"
                    style={{
                      backgroundImage:
                        " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
                      marginRight: "3%",
                    }}
                  />
                  <Button
                    onClick={() => setActiveIndex1(1)}
                    className="p-button-text mr-1"
                    label="30 Günlük "
                    style={{
                      fontSize: "",
                      backgroundImage:
                        " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
                      marginRight: "3%",
                    }}
                  />
                  <Button
                    onClick={() => setActiveIndex1(1)}
                    className="p-button-text mr-1"
                    label="3 Aylık "
                    style={{
                      backgroundImage:
                        " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
                      marginRight: "3%",
                    }}
                  />
                  <Button
                    onClick={() => setActiveIndex1(1)}
                    className="p-button-text mr-1"
                    label="6 Aylık "
                    style={{
                      backgroundImage:
                        " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
                      marginRight: "3%",
                    }}
                  />
                  <Button
                    onClick={() => setActiveIndex1(1)}
                    className="p-button-text mr-1"
                    label="1 Yıllık "
                    style={{
                      backgroundImage:
                        " linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)",
                      marginRight: "3%",
                    }}
                  />
                </div>
              </Card>
            </div>
            <div className="p-grid" style={{ marginTop: "%" }}>
              <div className="p-col-8">
                <div className="card">
                  <Card title ="Son Haberler">
                    <DataTable
                      value={news}
                      paginator
                      className="datatable-responsive"
                      resizableColumns
                      columnResizeMode="fit"
                      responsiveLayout="scroll"
                      rows={6}
                    >
                      <Row
                        field="publication_datetime"
                        /*sortable*/ header="Tarih/Saat"
                        style={{ width: "10%" }}
                      />
                      <Row
                        field="title"
                        sortable
                        header="Başlık"
                        style={{ width: "10%" }}
                      />
                      <Row
                        field="link"
                        header="Kaynak"
                        style={{ width: "10%" }}
                        body={
                          <Link to={news.link}>
                            Haberi Kaynağından<br></br>Okuyun
                          </Link>
                        }
                      />
                    </DataTable>
                  </Card>
                </div>
              </div>
              <div className="p-col-4">
                <div className="card">
                  <Card
                    title="En İyi 10 Benzer Varlık"
                    style={{ marginBottom: "2em" }}
                  >
                    <DataTable
                    //   value={news}

                      className="datatable-responsive"
                      resizableColumns
                      columnResizeMode="fit"
                      responsiveLayout="scroll"
                      rows={6}
                    >
                      <Row
                        field="publication_datetime"
                        /*sortable*/ header="İsim"
                        style={{ width: "5%" }}
                      />
                      <Row
                        field="title"
                        // sortable
                        header="Fiyat (ABD Doları)"
                        style={{ width: "5%" }}
                      />
                      <Row
                        field="link"
                        header="CHG (24saat)"
                        style={{ width: "5%" }}
                        body={
                          <Link to={news.link}>
                            Haberi Kaynağından<br></br>Okuyun
                          </Link>
                        }
                      />
                    </DataTable>
                  </Card>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel header="2">
            <TemelAnalizTab/>
          </TabPanel>

          <TabPanel header="3">
            <TeknikAnalizTab/>
          </TabPanel>

          <TabPanel header="4">
            <DataTable
              value={tt}
              paginator
              className="datatable-responsive"
              resizableColumns
              columnResizeMode="fit"
              responsiveLayout="scroll"
              rows={20}
            >
              <Column
                field="symbol"
                /*sortable*/ header="Kripto Para"
                style={{ width: "10%" }}
              ></Column>

              <Column
                field="name"
                sortable
                header="Fiyat"
                style={{ width: "10%" }}
              />
              <Column
                field=""
                body="_"
                header="Değişim"
                style={{ width: "20%" }}
              />
              <Column
                field="marketCap"
                header="Piyasa Değeri"
                style={{ width: "20%" }}
              />
              <Column
                field="dominance"
                header="Toplam Arz"
                style={{ width: "20%" }}
              />
              <Column field="_" header="Hacim" style={{ width: "20%" }} />
            </DataTable>
          </TabPanel>

          <TabPanel header="5">
            <DataTable
              value={tt}
              paginator
              className="datatable-responsive"
              resizableColumns
              columnResizeMode="fit"
              responsiveLayout="scroll"
              rows={20}
            >
              <Column
                field="symbol"
                /*sortable*/ header="Kripto Para"
                style={{ width: "10%" }}
              ></Column>

              <Column
                field="name"
                sortable
                header="Fiyat"
                style={{ width: "10%" }}
              />
              <Column
                field=""
                body="_"
                header="Değişim"
                style={{ width: "20%" }}
              />
              <Column
                field="marketCap"
                header="Piyasa Değeri"
                style={{ width: "20%" }}
              />
              <Column
                field="dominance"
                header="Toplam Arz"
                style={{ width: "20%" }}
              />
              <Column field="_" header="Hacim" style={{ width: "20%" }} />
            </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
  ) : (
    <></>
  );
};
