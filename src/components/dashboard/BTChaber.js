import React, { useState, useEffect } from "react";
import { HaberTablo } from "./HaberTablo";
import useAxios from "../../utils/useAxios";
import { Margin } from "devextreme-react/circular-gauge";
import { Table } from "reactstrap";
import { DataTable } from "primereact/datatable";

export const BTChaber = () => {
  const [btcnews, setBtcNews] = useState([]);

  let mockFollow = [
    // { sembol: "BTC", gunlukyuzde: "----", acilis: "...", son: "..." },
    // { sembol: "ETH", gunlukyuzde: "----", acilis: "...", son: "..." },
  ];
  let api = useAxios();
  useEffect(() => {
    //api.get('/favorite').then(res => setFavorite(res.data))
    api.get("/crypto/news/all");
    setBtcNews(mockFollow);
  }, []);
  const newsTemplate = (news) => {
    return (
      <>
        {btcnews && (
          <>
            <h2 style={{ marginLeft: "10px" }}>En Güncel Kripto Piyasa Başlıkları </h2>
            <div className="tab-table-card">
              <HaberTablo /*label={" "}*/ />
            </div>
          </>
        )}
      </>
    );
  };
  return(
    <DataTable>
         itemTamplate={newsTemplate}
    </DataTable>
   
  )
};
