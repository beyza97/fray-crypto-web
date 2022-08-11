import React, { useState, useEffect } from "react";
import useAxios from "../../utils/useAxios";
import { Column } from "primereact/column";
import { Button } from "reactstrap";
import { BestWorstCoinTable } from "./BestWorstCoinTable";
import {Sil} from "./Sil";
import { BTCTabsTable } from "./BtcTabsTable";


export const BTCtabs = () => {
  const [coinstate, setCoinState] = useState([]);
  const [tt20, setTt20]=useState([]);
  let api = useAxios();
  // GEREKLİ UÇ YERLEŞTİRİLECEK
  useEffect(() => {
    api.get("/crypto/news/NewsSearch").then((res) => setCoinState(res.data))
    .catch((err)=>console.log("error", err));
    
    api.get("https://api.test.f-rayscoring.com/crypto/coin/dominance?ccy=USD")
    .then((res) => setTt20(res.data))
    .catch((err) => console.log("error", err));

  
}, []);


  console.log("coinstate" , coinstate);
  console.log("tt20=" , tt20);

  // col ile kullanım örneklerini araştır 
  return coinstate ? (
        <>
          <div className="tab-table-card p-col-14" >
            <h4 style={{color:"#fff", marginBottom:'3%',marginLeft:'5%'}}> </h4>
            <BTCTabsTable news={coinstate.data} tt={tt20.dominance}/>
          
           </div>
        </>
  ):(<> </>);
};
