import React, { useState, useEffect } from "react";
import { HaberTablo } from "./HaberTablo";
import useAxios from "../../utils/useAxios";
import { Column } from "primereact/column";
import { Button } from "reactstrap";
import "./Haber_tab.css";

export const GuncelHaberler = () => {
  const [dailynews, setDailNews] = useState([]);
  let api = useAxios();
  useEffect(() => {
    api.get("/crypto/news/NewsSearch").then((res) => setDailNews(res.data))
    .catch((err)=>console.log("error", err));
}, []);
  console.log("daily news data: " , dailynews);


  // col ile kullanım örneklerini araştır 
  return dailynews ? (
        <>
          <h2> Son Haberler </h2>
          <div className="tab-table-card " >
            <h4 style={{color:"#fff", marginLeft:'5%',marginBottom:'3%'}}> </h4>
            <HaberTablo news={dailynews.data}/>

          </div>
        </>
  ):(<> </>);
};
