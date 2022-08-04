import React, { useState,useEffect  } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Avatar } from 'primereact/avatar';
import './Haber_tab.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ProductService from '../../service/ProductService';
import moment from "moment";
import 'moment/locale/tr' // haber tarih ve saatini tr formatında ayarlıyor
import { Link } from 'react-router-dom';

export const HaberTablo = ({ news }) => {
    const [activeIndex1, setActiveIndex1] = useState(1);
    // let datetr=moment(news.publication_datetime).format('llll');
    // console.log();

  console.log("news", news);
    return news ? (
      <div>
        <DataTable 
          value={news} paginator className='datatable-responsive' resizableColumns columnResizeMode='fit' responsiveLayout='scroll' rows={6}>
          {/* <Column field="datetr" sortable header="Tarih/Saat" style={{width:'10%'}}></Column> */}
          <Column field="link" header="Kaynak" style={{width:'40%'}} body={<Link to={news.link}>Haberi Kaynağından<br></br>Okuyun</Link>}/>
          <Column field="title" sortable header="Başlık" style={{width:'20%'}} />
          <Column field="sentiment.title" header="Tepki" style={{width:'20%'}} /> 
          {/*
            bu veri boş gelebiliyor kontrol et,

           */}
        </DataTable>
      </div>



    
        // <div className="tabview-demo">
        //     <div className="card">
        //         <h5>Programmatic</h5>

        //         <div className="pt-2 pb-4">
        //             <Button onClick={() => setActiveIndex1(0)} className="p-button-text mr-1" label="Son Haberler "/>
        //             <Button onClick={() => setActiveIndex1(1)} className="p-button-text mr-1" label="En İyi 10 Haber " />
        //             <Button onClick={() => setActiveIndex1(2)} className="p-button-text" label="En Kötü 10 Haber " />
        //             <Button onClick={() => setActiveIndex1(3)} className="p-button-text" label="Ekonomik Takvim " />
        //         </div>
                
        //         <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>

        //         <TabPanel header="1">
        //         {/* {news.slice(0,6).map((a)=>( */}
        //           {/* <DataTable value={news} resizableColumns columnResizeMode='fit' responsiveLayout='scroll' rows={6}>
        //             <Column field="date" header="Tarih/Saat" style={{width:'10%'}} body={moment(news.publication_datetime).format('llll')}></Column>
        //             <Column field="source" header="Kaynak" style={{width:'40%'}} body={<Link to={news.link}>Haberi Kaynağından<br></br>Okuyun</Link>}/>
        //             <Column field="header" header="Başlık" style={{width:'20%'}} body={news.title}/>
        //             <Column field="sentiment" header="Tepki" style={{width:'20%'}} body={news.sentiment.title}/>
        //           </DataTable> */}
        //           {/* ))} */}
        //         </TabPanel>

        //             <TabPanel header="2">
        //                 <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        //                 architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        //                     voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
        //             </TabPanel>
        //             <TabPanel header="3">
        //                 <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
        //                 cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
        //                     Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
        //             </TabPanel>
        //             <TabPanel header="4">
        //                 <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        //                 architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        //                     voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
        //             </TabPanel>         
        //         </TabView>

        //   </div>

        // </div>

    ):(<></>);
}
                


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
