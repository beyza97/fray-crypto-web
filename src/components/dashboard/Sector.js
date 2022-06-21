import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { v4 as uuidv4 } from 'uuid';
import { getClassName } from '../../helpers/common';

export const Sector = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const mockSector = [
        { code: "İmalat", value: "-0.41" },
        { code: "Bankacılık", value: "5.41" },
        { code: "Deniz taşımacılığı", value: "7.41" },
        { code: "Telekominikasyon", value: "-5.41" },
        { code: "Otomotiv", value: "-8.41" },
    ]

    return (<>
        <h2>Sektörler</h2>
        <div className="tab-card">
            <Button onClick={() => setActiveIndex(0)} className={getClassName("p-button-text mr-1",activeIndex === 0)} label="En çok kazandıranlar" />
            <Button onClick={() => setActiveIndex(1)} className={getClassName("p-button-text mr-1",activeIndex === 1)} label="En çok kaybettirenler" />
        </div>
        <div className="tab-table-card">
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                <TabPanel>
                    <SectorTabPanel data={mockSector} />
                </TabPanel>
                <TabPanel>
                    <SectorTabPanel data={mockSector} />
                </TabPanel>
            </TabView>
        </div>
    </>);
}

const SectorTabPanel = (prop) => {
    const { data } = prop
    const [activeDayIndex, setActiveDayIndex] = useState(0);

    return (<>
        <div key={uuidv4()}>
            <div className="tab-card" style={{ width: '55%', marginLeft: '20%' }}>
                <Button onClick={() => setActiveDayIndex(0)} className={getClassName("p-button-text mr-1",activeDayIndex === 0)} label="7 gün" />
                <Button onClick={() => setActiveDayIndex(1)} className={getClassName("p-button-text mr-1",activeDayIndex === 1)} label="1 ay" />
                <Button onClick={() => setActiveDayIndex(2)} className={getClassName("p-button-text mr-1",activeDayIndex === 2)} label="3 ay" />
                <Button onClick={() => setActiveDayIndex(3)} className={getClassName("p-button-text mr-1",activeDayIndex === 3)} label="1 yıl" />
                <Button onClick={() => setActiveDayIndex(4)} className={getClassName("p-button-text mr-1",activeDayIndex === 4)} label="3 yıl" />
                <Button onClick={() => setActiveDayIndex(5)} className={getClassName("p-button-text mr-1",activeDayIndex === 5)} label="5 yıl" />
            </div>
            <TabView id={uuidv4()} activeIndex={activeDayIndex} onTabChange={(e) => setActiveDayIndex(e.index)} style={{ border: 'inline' }}>
                <TabPanel>
                    <SectorTablePanel data={data} />
                </TabPanel>
                <TabPanel>
                    <SectorTablePanel data={data} />
                </TabPanel>
                <TabPanel>
                    <SectorTablePanel data={data} />
                </TabPanel>
                <TabPanel>
                    <SectorTablePanel data={data} />
                </TabPanel>
                <TabPanel>
                    <SectorTablePanel data={data} />
                </TabPanel>
                <TabPanel>
                    <SectorTablePanel data={data} />
                </TabPanel>
            </TabView>
        </div>

    </>);
}

const SectorTablePanel = (prop) => {
    const { data } = prop

    const gunlukyuzdeBodyTemplate = (data) => {
        const isNegative = data.value < "0"
        return (
            <div className={isNegative ? "persent-negative" : "persent-positive"}>
                <i className={isNegative ? "pi pi-angle-down" : "pi pi-angle-up"}></i>{data.value}%
            </div>
        );
    }
    return (<>
        <div key={uuidv4()}>
            <DataTable id={uuidv4()} value={data}>
                <Column field="code" header="Hisse Kodu"></Column>
                <Column field="value" header="Günlük Değişim" body={gunlukyuzdeBodyTemplate}></Column>
            </DataTable>
        </div>
    </>);
}