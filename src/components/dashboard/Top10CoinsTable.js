import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import useAxios from "../../utils/useAxios";


export const Top10CoinsTable = () => {
  const [topcoins, setTopCoins] = useState([]);
  let api = useAxios();
  useEffect(() => {
    api.get("/crypto/coin/dominance/USD").then((res) => setTopCoins(res.data));
  }, []);
  console.log("top 10 için:", topcoins);

  //   const TopTenTemplate = (tt) => {

  return (
    <div
      className="upcoming-body"
      style={{ marginTop: "5%", marginLeft: "3%" }}
    >
      <div className="p-grid">
        <div className="p-col-4">
          <Button
            // className="p-button-symbol"
            style={{ marginLeft: "10%" }}
            title="İlgili Açıklama Eklenecek"
            label={topcoins.symbol}
          />
        </div>
      </div>
      <div className="p-col-4" style={{ color: "#fff", marginLeft: "3%" }}>
        {topcoins.name}
      </div>
    </div>
  );
};

/*
// MAPPING UYGULANAN KODLAR 
export const Top10CoinsTable = ({topCoins}) => {

  const history = useHistory();
  const newHeaderTemplate = (data) => {
    // haber title verilerini çekmek için
    return (
      <>
        <Button
          className="p-button-symbol"
          label={data.symbol}
          onClick={() => history.push(`/crypto/${data.symbol}`)}
        />
      </>
    );
  };
  const gunlukDegisimTemplate=(data)=>{
    const isNegative=data.gunlukdegisim < "0"
    return(
        <div className={isNegative ? "persent-negative":"persent-positive"}>,
            <i className={isNegative ? "pi pi-angle-down" : "pi pi-angle-up" }></i>
            {data.gunlukdegisim}%
        </div>
    )
  }
  console.log("topcoinssssssssssssssss", topCoins);
 
  const columns = [
    { field: 'symbol', header: 'Sembolü', body: newHeaderTemplate },
    { field: 'gunlukdegisim', header:'Günlük Değişim', body:gunlukDegisimTemplate}
  ];
  const dyColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} body={col.body}/>
    
  });
  return (
    <div key={uuidv4()}>
      <DataTable value={topCoins} id={uuidv4}>
        {dyColumns}
      </DataTable>
    </div>
  );

  // const [topcoin, setTopCoin]=useState([]);
  // let api= useAxios();
  // useEffect(()=>{
  //     api.get("crypto/news/all?languageCode=en").then((res)=>setTopCoin(res.data));
  // },[]);
  // console.log(topcoin);
  // return(
  //     <div className="upcoming-body" style={{marginTop:"5%", marginLeft:"5%"}}>
  //         <div className="p-grid">
  //             <div className="p-col-6">

  //             </div>

  //         </div>
  //     </div>

  // )
}; */

// export const Top10CoinsTable = (prop) => {
//     const { stocks } = prop
//     const history = useHistory();

//     const sembolBodyTemplate = (data) => {
//         return (
//             <>
//                 <Button className="p-button-symbol" label={data.sembol} onClick={() => history.push(`/crypto/${data.sembol}`)}/>
//             </>
//         );
//     }

//     const gunlukyuzdeBodyTemplate = (data) => {
//         const isNegative = data.gunlukyuzde < "0"
//         return (
//             <div className={isNegative ? "persent-negative" : "persent-positive"}>
//                 <i className={isNegative ? "pi pi-angle-down" : "pi pi-angle-up"}></i>{data.gunlukyuzde}%
//             </div>
//         );
//     }

//     const columns = [
//         { field: 'sembol', header: 'Hisse Kodu', body: sembolBodyTemplate },
//         { field: 'gunlukyuzde', header: 'Günlük Değişim', body: gunlukyuzdeBodyTemplate },
//         { field: 'acilis', header: 'Açılış' },
//         { field: 'son', header: 'Son Fiyat' }
//     ];

//     const dynamicColumns = columns.map((col, i) => {
//         return <Column key={col.field} field={col.field} header={col.header} body={col.body} />;
//     });
//     return (
//         <div key={uuidv4()}>
//             <DataTable value={stocks} id={uuidv4()} >
//                 {dynamicColumns}
//             </DataTable>
//         </div>
//     );
// }
