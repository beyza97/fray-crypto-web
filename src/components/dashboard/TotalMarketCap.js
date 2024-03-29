import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import useAxios from "../../utils/useAxios";
import { setPublicElementWrapper } from "devextreme/core/element";
import { Label } from "reactstrap";
import NumberFormat from 'react-number-format';
import "../dashboard/TotalMarketCap.css";


export const TotalMarketCap = () => {
  const [allcoinData, setAllCoinData] = useState([]);

  let api = useAxios();
  useEffect(() => {
    // api.get('/dashboard/divident/disclosure').then(res => setDividents(res.data))
    api
      .get("/crypto/coin/dominance?ccy=USD")
      .then((res) => setAllCoinData(res.data));
  }, []);



  return allcoinData ?(
    <div /*className="upcoming-body"*/ style={{ marginTop: "5%", marginLeft:"3%" }}>

        {/* <div className="p-col-4">
          <Button
            className="p-button-symbol"
            style={{marginLeft:"10%"}}
            title="İlgili Açıklama Eklenecek"
            
          />
        </div> */}

        
        <Label>
          Toplam Piyasa Değeri:

        </Label>
        <span>
        <NumberFormat
          value={allcoinData.total_market_cap}
          thousandSeparator={true} 
          className="totalMarket"       
        />
        </span>
      {/* <div className="p-col-4" style={{ color: "#fff",marginLeft:"3%" }}>
        {allcoinData.total_market_cap}
      </div> */}
    </div>
  ):(<></>);
};
