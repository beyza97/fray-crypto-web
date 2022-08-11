import React, { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Avatar } from "primereact/avatar";
import "./Haber_tab.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductService from "../../service/ProductService";
import moment from "moment";
import "moment/locale/tr"; // haber tarih ve saatini tr formatında ayarlıyor
import { Link } from "react-router-dom";

export const BestWorstCoinTable = ({ news,tt }) => {
  const [activeIndex1, setActiveIndex1] = useState(1);
  // let datetr[]=moment(news.publication_datetime).format('llll');
  // console.log("datetr ", datetr);
  
  if (news) {
    news.map((item) =>
        (item.a = moment(item.publication_datetime).format("llll")));
  }
  console.log("news", news);
  console.log("tt- 20 coin ", tt)
  
  return news ? (
 
    <div className="tabview-demo">
      <div className="card-demo">
        {/* <h5>Programmatic</h5> */}

        <div className=" bw-tab">
          <Button
            onClick={() => setActiveIndex1(0)}
            className="p-button-text mr-1"
            label=" En Çok Kazanan 20 Coin"
            style={{backgroundImage:" linear-gradient(to right, #4BA722  0%, #70D143 51%, #90EA66 100%)", marginRight:"3%"}}
          />
          <Button
            onClick={() => setActiveIndex1(1)}
            className="p-button-text mr-1"
            label="En Çok Kaybeden 20 Coin "
            style={{backgroundImage:" linear-gradient(to right, #8A1306 0%, #AD1616 51%, #D83D3D 100%)"}}
          />
        </div>

        <TabView
          className=" table"
          activeIndex={activeIndex1}
          onTabChange={(e) => setActiveIndex1(e.index)}
        >
          <TabPanel header="1">

            <DataTable 
                value={news}
                paginator
                className="datatable-responsive"
                resizableColumns
                columnResizeMode="fit"
                responsiveLayout="scroll"
                rows={20}
            >
                <Column
                  field="a"
                  /*sortable*/ header="Kripto Para"
                  style={{ width: "10%" }}
                ></Column>

                <Column
                  field=""
                  sortable
                  header="Fiyat"
                  style={{ width: "10%" }}
                />
                <Column
                  field="sentiment.title"
                  header="Değişim"
                  style={{ width: "20%" }}
                />
                <Column
                  field="sentiment.title"
                  header="Piyasa Değeri"
                  style={{ width: "20%" }}
                />
                <Column
                  field="sentiment.title"
                  header="Toplam Arz"
                  style={{ width: "20%" }}
                />
                <Column
                  field="sentiment.title"
                  header="Hacim"
                  style={{ width: "20%" }}
                />
              </DataTable>


            {/* {news.slice(0,6).map((a)=>( */}
            {/* <DataTable value={news} resizableColumns columnResizeMode='fit' responsiveLayout='scroll' rows={6}>
                    <Column field="date" header="Tarih/Saat" style={{width:'10%'}} body={moment(news.publication_datetime).format('llll')}></Column>
                    <Column field="source" header="Kaynak" style={{width:'40%'}} body={<Link to={news.link}>Haberi Kaynağından<br></br>Okuyun</Link>}/>
                    <Column field="header" header="Başlık" style={{width:'20%'}} body={news.title}/>
                    <Column field="sentiment" header="Tepki" style={{width:'20%'}} body={news.sentiment.title}/>
                  </DataTable> */}
            {/* ))} */}
          </TabPanel>

          <TabPanel header="2">
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
                <Column
                  field="_"
                  header="Hacim"
                  style={{ width: "20%" }}
                />
              </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
    
  ) : (
    <></>
  );
};

