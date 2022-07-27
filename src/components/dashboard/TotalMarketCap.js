import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import useAxios from "../../utils/useAxios";
import { setPublicElementWrapper } from "devextreme/core/element";

export const TotalMarketCap = () => {
  const [dividents, setDividents] = useState([]);
  const [coinData, setCoinData]= useState([]);

  let api = useAxios();
  
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "600px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    // api.get('/dashboard/divident/disclosure').then(res => setDividents(res.data))
    api.get("/crypto/coin/dominance/USD").then((res) => setDividents(res.data));
    
  }, []);
  console.log(dividents);
  useEffect(() => {
    if(dividents) setCoinData(dividents.dominance)
    
  }, [dividents]);


  const dividentsTemplate = (divident) => {
    return (
      <div className="upcoming-body" style={{ marginTop: "50px" }}>
        <div className="p-grid">
        </div>
        <div className="p-grid" style={{ marginLeft: "3%", opacity: "0.5" }}>
          {/* <div className="p-col-4">Tarih</div> */}
          <div className="p-col-6">Total Market Cap</div>

        </div>
        <div className="p-grid" style={{ marginLeft: "3%" }}>
          {/* <div className="p-col-4">{divident.data}</div> */}
          <div className="p-col-6">{divident.TotalMarketCap}</div>
        </div>
      </div>
    );
  };

  return (
    <Carousel
      value={coinData}
      numVisible={1}
      numScroll={1}
      style={{ marginTop: "10px" }}
      responsiveOptions={responsiveOptions}
      itemTemplate={dividentsTemplate}
    />
  );
};
