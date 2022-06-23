import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { StockTable } from './StockTable';
import { getClassName } from '../../helpers/common';


// export const StockTrade = ({ stockTradeD, stockTradeI, stockTradeM }) => {
//     const [activeIndex, setActiveIndex] = useState(0);


//     return (<>
//         {stockTradeD &&
//             <>
//                 <h2>BIST100</h2>
//                 <div className="tab-card">
//                     <Button onClick={() => setActiveIndex(0)} className={getClassName("p-button-text mr-1",activeIndex === 0)} label="En Çok İşlem Görenler" />
//                     <Button onClick={() => setActiveIndex(1)} className={getClassName("p-button-text mr-1",activeIndex === 1)} label="Artan" />
//                     <Button onClick={() => setActiveIndex(2)} className={getClassName("p-button-text mr-1",activeIndex === 2)} label="Azalan" />
//                 </div>
//                 <div className="tab-table-card">
//                     <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
//                         <TabPanel>
//                             <StockTable stocks={stockTradeM} />
//                         </TabPanel>
//                         <TabPanel>
//                             <StockTable stocks={stockTradeI} />
//                         </TabPanel>
//                         <TabPanel>
//                             <StockTable stocks={stockTradeD} />
//                         </TabPanel>
//                     </TabView>
//                 </div>
//             </>
//         }
//     </>);
// }