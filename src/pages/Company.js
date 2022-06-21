import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Topbar } from '../components/company/Summary/Topbar';
import { Summary } from '../components/company/Summary';
import { Financials } from '../components/company/Financials';
import { Ratios } from '../components/company/Ratios';
import { DividendAndCapital } from '../components/company/DividendAndCapital';
import { Analyzes } from '../components/company/Analyzes';
import { KapNotifications } from '../components/company/KapNotifications';
import { TecnicalAnalyzes } from '../components/company/TecnicalAnalyzes';
import { getClassName } from '../helpers/common';


export const Company = () => {
    const { code } = useParams();
    const toast = useRef(null);
    const [company, setCompany] = useState(null)

    const [activeIndex, setActiveIndex] = useState(0);
    let api = useAxios();

    useEffect(() => {
        api.get(`/company/${code}`).then(res => setCompany(res.data))
    }, [code]);

    return (
        <div>
            <Toast ref={toast}></Toast>
            <Topbar {...company} />
            <div className="tab-card" style={{ marginTop: '1%' }}>
                <Button onClick={() => setActiveIndex(0)} className={getClassName("p-button-text mr-1",activeIndex === 0)} label="Özet" />
                <Button onClick={() => setActiveIndex(1)} className={getClassName("p-button-text mr-1",activeIndex === 1)} label="Finansallar" />
                <Button onClick={() => setActiveIndex(2)} className={getClassName("p-button-text mr-1",activeIndex === 2)} label="Rasyolar" />
                <Button onClick={() => setActiveIndex(3)} className={getClassName("p-button-text mr-1",activeIndex === 3)} label="Temettü ve Sermaye" />
                <Button onClick={() => setActiveIndex(4)} className={getClassName("p-button-text mr-1",activeIndex === 4)} label="Analizler" />
                <Button onClick={() => setActiveIndex(5)} className={getClassName("p-button-text mr-1",activeIndex === 5)} label="Teknik Analizler" />
                <Button onClick={() => setActiveIndex(6)} className={getClassName("p-button-text mr-1",activeIndex === 6)} label="KAP Bildirimleri" />
            </div>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                <TabPanel>
                    <Summary  {...company} />
                </TabPanel>
                <TabPanel>
                    <Financials code={code} />
                </TabPanel>
                <TabPanel>
                    <Ratios code={code} />
                </TabPanel>
                <TabPanel>
                    <DividendAndCapital code={code} />
                </TabPanel>
                <TabPanel>
                    <Analyzes code={code} />
                </TabPanel>
                <TabPanel>
                    <TecnicalAnalyzes code={code} />
                </TabPanel>
                <TabPanel>
                    <KapNotifications code={code} />
                </TabPanel>
            </TabView>
        </div>
    )

}