import React, { useEffect, useState, useRef } from 'react';
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import { v4 as uuidv4 } from 'uuid';
import { IncomeStatement } from './Financials/IncomeStatement';
import useAxios from '../../utils/useAxios';
import { Balance } from './Financials/Balance';
import { CashFlow } from './Financials/CashFlow';
import { getClassName } from '../../helpers/common';

export const Financials = ({ code }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const api = useAxios();
    const [periods, setPeriods] = useState(null);
    const [financials, setFinancials] = useState(null);
    const [trends, setTrends] = useState(null);
    const [debt, setDebt] = useState(null);
    const [wc, setWc] = useState(null);
    const [balance, setBalance] = useState(null);
    const [comp, setComp] = useState(null);

    useEffect(() => {
        if (code) {
            api.get(`/company/${code}/periods`).then(res => setPeriods(res.data))
            api.get(`/company/${code}/Gelir Tablosu`).then(res => setFinancials(res.data))
            api.get(`/company/${code}/trends`).then(res => setTrends(res.data))
            api.get(`/company/${code}/sub/Net Borç`).then(res => setDebt(res.data))
            api.get(`/company/${code}/sub/İşletme Sermayesi (Working Capital)`).then(res => setWc(res.data))
            api.get(`/company/${code}/sub/Özkaynaklar`).then(res => setBalance(res.data))
            api.get(`/company/${code}/periodCompare`).then(res => setComp(res.data))
        }
    }, [code]);

    if (!periods || !financials || !trends || !debt || !wc || !balance || !comp)
        return null

    const props = {
        periods,
        financials,
        trends,
        debt,
        wc,
        balance,
        comp,
        code
    }

    return (
        <div style={{ marginTop: '10px' }}>
            <h2>Finansallar</h2>
            <div className="tab-card" style={{ marginTop: '1%' }}>
                <Button onClick={() => setActiveIndex(0)} className={getClassName("p-button-text mr-1",activeIndex === 0)} label="Gelir Tablosu" />
                <Button onClick={() => setActiveIndex(1)} className={getClassName("p-button-text mr-1",activeIndex === 1)} label="Bilanço" />
                <Button onClick={() => setActiveIndex(2)} className={getClassName("p-button-text mr-1",activeIndex === 2)} label="Nakit Akışı" />
            </div>
            <TabView id={uuidv4()} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                <TabPanel>
                    <IncomeStatement {...props} />
                </TabPanel>
                <TabPanel>
                    <Balance {...props} />
                </TabPanel>
                <TabPanel>
                    <CashFlow {...props} />
                </TabPanel>

            </TabView>
        </div>
    )
}