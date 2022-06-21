import React, { useEffect, useState } from 'react';
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useAxios from '../../utils/useAxios';
import { numberFormat, getClassName } from '../../helpers/common';

export const DividendAndCapital = ({ code }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const api = useAxios();
    const [capitalIncreases, setCapitalIncreases] = useState(null);
    const [dividens, setDividens] = useState(null);
    const [footnotes, setFootnotes] = useState(null);
    const [comp, setComp] = useState(null);

    useEffect(() => {
        if (code) {
            api.get(`/company/${code}/capitalIncreases`).then(res => setCapitalIncreases(res.data))
            api.get(`/company/${code}/dividens`).then(res => setDividens(res.data))
            api.get(`/company/${code}/footnotes`).then(res => setFootnotes(res.data))
            api.get(`/company/${code}/sub/Dönen Varlıklar`).then(res => setComp(res.data))
        }
    }, [code]);


    return (
        <div style={{ marginTop: '10px' }}>
            <h2>Temettü ve Sermaye</h2>
            <div className="tab-card" style={{ marginTop: '1%' }}>
                <Button onClick={() => setActiveIndex(0)} className={getClassName("p-button-text mr-1", activeIndex === 0)} label="Sermaye Artırımları" />
                <Button onClick={() => setActiveIndex(1)} className={getClassName("p-button-text mr-1", activeIndex === 1)} label="Temettüler" />
                <Button onClick={() => setActiveIndex(2)} className={getClassName("p-button-text mr-1", activeIndex === 2)} label="Yabancı Para Bilgileri" />
            </div>
            <TabView id={uuidv4()} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                <TabPanel>
                    {capitalIncreases &&
                        <DataTable value={capitalIncreases}>
                            <Column field="date" header="Sermaye Artırım Tarihi" style={{ backgroundColor: '#171717' }} body={(data) => data.date}></Column>
                            <Column field="postDivisionCapital" header="Artırım Sonrası Sermaye (TL)" style={{ backgroundColor: '#171717' }} body={(data) => numberFormat(data.postDivisionCapital)}></Column>
                        </DataTable>
                    }
                </TabPanel>
                <TabPanel>
                    {dividens &&
                        <DataTable value={dividens}>
                            <Column field="apportioningDate" header="Kar Payı Dağıtım Tarihi" style={{ backgroundColor: '#171717' }} body={(data) => data.apportioningDate}></Column>
                            <Column field="perStock" header="Hisse Başına Dağıtılan Kar Payı (TL)" style={{ backgroundColor: '#171717' }}></Column>
                            <Column field="totalAmount" header="Toplam Dağıtılan Kar Payı (TL)" style={{ backgroundColor: '#171717' }} body={(data) => numberFormat(data.totalAmount)}></Column>
                            <Column field="return" header="Temettü Verimi (%)" style={{ backgroundColor: '#171717' }}></Column>
                        </DataTable>
                    }
                </TabPanel>
                <TabPanel>
                    {footnotes && comp &&
                        <DataTable value={footnotes}>
                            <Column field="title" style={{ backgroundColor: '#171717' }}></Column>
                            <Column field="perStock" header={`${comp.periods[0].year}/${comp.periods[0].month}`} style={{ backgroundColor: '#171717' }} body={(data) => data.values[0] ?? ""}></Column>
                            <Column field="perStock" header={`${comp.periods[1].year}/${comp.periods[1].month}`} style={{ backgroundColor: '#171717' }} body={(data) => data.values[1] ?? ""}></Column>
                            <Column field="perStock" header={`${comp.periods[2].year}/${comp.periods[2].month}`} style={{ backgroundColor: '#171717' }} body={(data) => data.values[2] ?? ""}></Column>
                            <Column field="perStock" header={`${comp.periods[3].year}/${comp.periods[3].month}`} style={{ backgroundColor: '#171717' }} body={(data) => data.values[3] ?? ""}></Column>
                        </DataTable>
                    }
                </TabPanel>
            </TabView>
        </div>
    )
}