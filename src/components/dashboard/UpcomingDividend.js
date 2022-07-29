import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import useAxios from "../../utils/useAxios";
import { setPublicElementWrapper } from "devextreme/core/element";

export const UpcomingDividend = () => {
  const [dividents, setDividents] = useState([]);

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

  const dividentsTemplate = (divident) => {
    return (
      <div className="upcoming-body" style={{ marginTop: "10px" }}>
        <div className="p-grid">
          <div className="p-col-4">
            <Button className="p-button-symbol" label={divident.symbol} />
          </div>
        </div>
        <div className="p-grid" style={{ marginLeft: "3%", opacity: "0.5" }}>
          {/* <div className="p-col-4">Tarih</div> */}
          <div
            className="p-col-6"
            title="Bitcoin gibi bir kripto para için piyasa değeri, madencilikle elde edilen tüm coin'lerin toplam değeridir. Bu, tek bir birimin dolaşımdaki coin sayısının bu birimin mevcut piyasa fiyatı ile çarpılmasıyla hesaplanır. Piyasa değeri, bir şirketin tüm hisselerinin toplam dolar değeridir."
          >
            Market Cap
          </div>
          <div className="p-col-6">Dominance</div>
        </div>
        <div className="p-grid" style={{ marginLeft: "5%" }}>
          {/* <div className="p-col-4">{divident.data}</div> */}
          <div className="p-col-6">{divident.marketCap}</div>
          <div className="p-col-6">{divident.dominance}</div>
        </div>
      </div>
    );
  };
  console.log("test_");

  return (
    <div>
      <Carousel
        value={dividents.dominance}
        numVisible={3}
        numScroll={1}
        style={{ marginTop: "10px" }}
        responsiveOptions={responsiveOptions}
        circular
        autoplayInterval={3000}
        itemTemplate={dividentsTemplate}
      />
    </div>
  );
};
