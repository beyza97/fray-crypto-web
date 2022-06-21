import React, { useEffect, useState } from 'react';
import { IncomeTable } from './IncomeTable';
import useAxios from '../../utils/useAxios';


export const IncomeStatement = ({ code, code2 }) => {
    const api = useAxios();
    const [financials, setFinancials] = useState(null);
    const [debt, setDebt] = useState(null);
    const [wc, setWc] = useState(null);
    const [balance, setBalance] = useState(null);
    const [comp, setComp] = useState(null);

    const [financials2, setFinancials2] = useState(null);
    const [debt2, setDebt2] = useState(null);
    const [wc2, setWc2] = useState(null);
    const [balance2, setBalance2] = useState(null);

    useEffect(() => {
        if (code) {
            api.get(`/company/${code}/Gelir Tablosu`).then(res => setFinancials(res.data))
            api.get(`/company/${code}/sub/Net Borç`).then(res => setDebt(res.data))
            api.get(`/company/${code}/sub/İşletme Sermayesi (Working Capital)`).then(res => setWc(res.data))
            api.get(`/company/${code}/sub/Özkaynaklar`).then(res => setBalance(res.data))
            api.get(`/company/${code}/periodCompare`).then(res => setComp(res.data))

            api.get(`/company/${code2}/Gelir Tablosu`).then(res => setFinancials2(res.data))
            api.get(`/company/${code2}/sub/Net Borç`).then(res => setDebt2(res.data))
            api.get(`/company/${code2}/sub/İşletme Sermayesi (Working Capital)`).then(res => setWc2(res.data))
            api.get(`/company/${code2}/sub/Özkaynaklar`).then(res => setBalance2(res.data))
        }
    }, [code]);

    if (!financials || !debt || !wc || !balance || !comp)
        return null

    if (!financials2 || !debt2 || !wc2 || !balance2)
        return null

    const baseProp = {
        set: 1,
        comp,
        financials,
        debt,
        wc,
        balance,
        financials2,
        debt2,
        wc2,
        balance2,
        code,
        code2
    }
    const salingProp = {
        ...baseProp,
        arr_number: 0,

    }
    const coreOperatingProfitProp = {
        ...baseProp,
        arr_number: 13,
    }
    const netProfitProp = {
        ...baseProp,
        arr_number: 28,
    }

    const baseProp2 = {
        comp,
        financials,
        debt,
        wc,
        balance,
        financials2,
        debt2,
        wc2,
        balance2,
        code,
        code2,
        arr_number: 0,
    }

    const equitiesProp = {
        ...baseProp2,
        set: 2,
    }

    const netWorkingCapitalProp = {
        ...baseProp2,
        set: 3,
    }

    const netDebtProp = {
        ...baseProp2,
        set: 4,
    }

    return (
        <div className="p-grid" style={{ marginTop: '1%' }}>
            <div className="p-col-4">
                <h4>Satışlar</h4>
                <IncomeTable {...salingProp} />
            </div>
            <div className="p-col-4">
                <h4>Esas Faaliyet Karı</h4>
                <IncomeTable {...coreOperatingProfitProp} />
            </div>
            <div className="p-col-4">
                <h4>Net Kar</h4>
                <IncomeTable {...netProfitProp} />
            </div>
            <div className="p-col-4">
                <h4>Özkaynaklar</h4>
                <IncomeTable {...equitiesProp} />
            </div>
            <div className="p-col-4">
                <h4>Net İşletme Sermayesi</h4>
                <IncomeTable {...netWorkingCapitalProp} />
            </div>
            <div className="p-col-4">
                <h4>Net Borç</h4>
                <IncomeTable {...netDebtProp} />
            </div>
        </div>
    )
}