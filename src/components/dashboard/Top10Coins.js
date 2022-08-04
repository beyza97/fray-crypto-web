import React, { useState, useEffect } from "react";
import { Top10CoinsTable } from "./Top10CoinsTable";
import useAxios from "../../utils/useAxios";

export const Top10Coins = () => {
  const [topten, settopTen] = useState([]);

  let api = useAxios();
  useEffect(() => {
    api
      .get("/crypto/coin/dominance?ccy=USD")
      .then((res) => settopTen(res.data))
      .catch((err) => console.log("error", err));
  }, []);
  console.log(topten, "top 10 coins");
  return (
    <>
      <h2 style={{ /*marginLeft: "10%"*/ }}>Top 10 Coin Listesi</h2>
      <div className="tab-table-card" style={{ marginLeft: "10%" }}>
        <Top10CoinsTable topCoins={topten.dominance} />
      </div>
    </>
  ); /* dominance içerisindeki 
  veriler kullanılacağı için dominance içerisine girildi*/
};
