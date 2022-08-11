
import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

export const PieChartCrypto = () => {
    const [chartData] = useState({
        labels: ["BTC/USD ( %73)", "Diğer (%17)", "BTC/USDT (%10)"],
        datasets: [
            {
                data: [73, 17, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    });

    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });

    return (
        <div className="card flex justify-content-center">
            <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
        </div>
    )
}
                 
// import React, { useState } from "react";
// import { Chart } from "primereact/chart";

// export const PolarAreaChartCrypto = () => {
//   const [chartData] = useState({
//     datasets: [
//       {
//         data: [10, 17, 73],
//         backgroundColor: [
//           "#139C94", // yeşil
//           "#554570", // mor
//           "#3C66D2", //  mavi
//         ],
//         label: "My dataset",
//       },
//     ],
//     labels: ["BTC/USD", "Diğer", "BTC/USDT"],
//   });

//   const [lightOptions] = useState({
//     plugins: {
//       legend: {
//         labels: {
//           color: "#495057",
//         },
//       },
//     },
//     scales: {
//       r: {
//         grid: {
//           color: "#ebedef",
//         },
//       },
//     },
//   });

//   return (
//     <div className="card flex justify-content-center">
//       <Chart
//         type="polarArea"
//         data={chartData}
//         options={lightOptions}
//         style={{ position: "relative", width: "40%" }}
//       />
//     </div>
//   );
// };
