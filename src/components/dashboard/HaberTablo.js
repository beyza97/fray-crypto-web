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
import ReactTradingviewWidget, {colorTheme, width } from "react-tradingview-widget";
import useAxios from "../../utils/useAxios";

export const HaberTablo = ({ news }) => {
  const [activeIndex1, setActiveIndex1] = useState(1);

  // let datetr[]=moment(news.publication_datetime).format('llll');
  // console.log("datetr ", datetr);

  
  if (news) {
    news.map((item) =>
        (item.a = moment(item.publication_datetime).format("llll")));
  }
  console.log("news", news);
  
  return news ? (
    // <div>
    //   <DataTable
    //     value={news} /*paginator*/ className="datatable-responsive" resizableColumns columnResizeMode='fit' responsiveLayout='scroll' rows={10}>
    //     <Column field="publication_datetime" /*sortable*/ header="Tarih/Saat" style={{width:'10%'}}></Column>
    //     <Column field="link" header="Kaynak" style={{width:'40%'}} body={<Link to={news.link}>Haberi Kaynağından<br></br>Okuyun</Link>}/>
    //     <Column field="title" sortable header="Başlık" style={{width:'20%'}} />
    //     <Column field="sentiment.title" header="Tepki" style={{width:'20%'}} />
    //     {/*
    //       bu veri boş gelebiliyor kontrol et,

    //      */}
    //   </DataTable>
    // </div>
  
 
    <div className="tabview-demo">
      <div className="card-demo">
        {/* <h5>Programmatic</h5> */}

        <div className="aa">
          <Button
            onClick={() => setActiveIndex1(0)}
            className="p-button-text mr-1"
            label="Son Haberler "
          />
          <Button
            onClick={() => setActiveIndex1(1)}
            className="p-button-text mr-1"
            label="En İyi 10 Haber "
          />
          <Button
            onClick={() => setActiveIndex1(2)}
            className="p-button-text"
            label="En Kötü 10 Haber "
          />
          <Button
            onClick={() => setActiveIndex1(3)}
            className="p-button-text"
            label="Ekonomik Takvim "
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
                rows={6}
              >
                <Column
                  field="a"
                  /*sortable*/ header="Tarih/Saat"
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  field="link"
                  header="Kaynak"
                  style={{ width: "40%" }}
                  body={
                    <Link to={news.link}>
                      Haberi Kaynağından<br></br>Okuyun
                    </Link>
                  }
                />
                <Column
                  field="title"
                  sortable
                  header="Başlık"
                  style={{ width: "10%" }}
                />
                <Column
                  field="sentiment.title"
                  header="Tepki"
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
                value={news}
                paginator
                className="datatable-responsive"
                resizableColumns
                columnResizeMode="fit"
                responsiveLayout="scroll"
                rows={6}
              >
                <Column
                  field="a"
                  /*sortable*/ header="Tarih/Saat"
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  field="link"
                  header="Kaynak"
                  style={{ width: "40%" }}
                  body={
                    <Link to={news.link}>
                      Haberi Kaynağından<br></br>Okuyun
                    </Link>
                  }
                />
                <Column
                  field="title"
                  sortable
                  header="Başlık"
                  style={{ width: "10%" }}
                />
                <Column
                  field="=)"
                  header="Tepki"
                  style={{ width: "20%" }}
                />
              </DataTable>
          </TabPanel>
          <TabPanel header="3">
          <DataTable
                value={news}
                paginator
                className="datatable-responsive"
                resizableColumns
                columnResizeMode="fit"
                responsiveLayout="scroll"
                rows={6}
              >
                <Column
                  field="a"
                  /*sortable*/ header="Tarih/Saat"
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  field="link"
                  header="Kaynak"
                  style={{ width: "40%" }}
                  body={
                    <Link to={news.link}>
                      Haberi Kaynağından<br></br>Okuyun
                    </Link>
                  }
                />
                <Column
                  field=""
                  sortable
                  header="Başlık"
                  style={{ width: "10%" }}
                />
                <Column
                  field="sentiment.title"
                  header="Tepki"
                  style={{ width: "20%" }}
                />
              </DataTable>
          </TabPanel>
          <TabPanel header="4">
          <div class="tradingview-widget-container">
          <div class="tradingview-widget-container__widget"></div>
          <div class="tradingview-widget-copyright"><a href="https://tr.tradingview.com/markets/currencies/economic-calendar/" rel="noopener" target="_blank"><span class="blue-text">Ekonomik Takvim</span></a> TradingView'den</div>
          {/* <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js" async> */}
            <ReactTradingviewWidget
            
            width= "100%"
            heigh= "100%"
            colorTheme= "dark"
            isTransparent= {false}
            locale= "tr"
            importanceFilter= "-1,0,1"
    />

</div>
          </TabPanel>
        </TabView>
      </div>
    </div>
    
  ) : (
    <></>
  );
};

// import React, { useEffect, useState } from "react";
// import { Button } from "primereact/button";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { v4 as uuidv4 } from "uuid";
// import { Link, useHistory } from "react-router-dom";
// import useAxios from "../../utils/useAxios";
// import { TabPanel } from "primereact/tabview";
// import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
// import moment from "moment";
// import 'moment/locale/tr' // haber tarih ve saatini tr formatında ayarlıyor
// export const HaberTablo = ({ news }) => {
//   console.log("habertablo ", news);
//   return news ? (
//     news.slice(0, 6).map((a) => (

//       <div
//         className="upcoming-body"
//         style={{ marginLeft: "2%", marginRight: "2%", marginBottom: "2%" }}
//       >
//         <div
//           className="p-grid"
//           style={{ marginLeft: "5%", paddingRight: "3%" }}
//         >
//           <div className="p-col-11">
//             <div style={{ marginLeft: "5%", color: "#fff", marginTop: "2%" }}>
//                 {moment(a.publication_datetime).format('llll')}
//             </div>

//             <div style={{ marginLeft: "5%", color: "#fff", marginTop: "2%" }}> Kaynak :
//                 {a.link}
//             </div>
//             <span></span>

//             <div style={{ marginLeft: "5%",color: "#fff", marginTop: "2%" , textAlign:"justify"}}> {a.title} </div>
//             {/* <DataTable
//               field="name"
//               header={a.publication_datetime}
//               label={a.title}
//               style={{ backgroundColor: "#171717" }}
//             >
//               {/* <Column body={(a) => a.title[0] ?? ""}></Column>
//               <Col>{a.title}</Col> }
//             </DataTable> */}
//           </div>
//         </div>
//       </div>
//     ))
//   ) : (
//     <></>
//   );
// };
