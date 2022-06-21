import React from 'react';
import { Message } from 'primereact/message';
import { IncomeTable } from './IncomeTable';

export const Balance = (prop) => {
    const { periods, comp, trends, financials, debt, wc, balance, code } = prop
    const baseProp = {
        comp,
        periods,
        financials,
        trends,
        debt,
        wc,
        balance,
        arr_number: 0,
    }
    const equitiesProp = {
        ...baseProp,
        set: 2,
        year: 7,
        quarter: 6,
        category: 1
    }

    const netWorkingCapitalProp = {
        ...baseProp,
        set: 3,
        year: 8,
        quarter: 9,
        category: 0,
    }

    const netDebtProp = {
        ...baseProp,
        set: 4,
        year: 11,
        quarter: 10,
        category: 5
    }

    return (
        <div className="p-grid">
            <div className="p-col-12" >
                <Message style={{ width: '90%', marginLeft: '5%' }} severity="info" content={(
                    <React.Fragment>
                        <i className="pi pi-info-circle" />&nbsp;
                        <label>Detaylı Bilanço Tablosu’nu görmek için</label> &nbsp;
                        <a href={`/company/${code}/financial/balance`}>tıklayınız.</a>
                    </React.Fragment>
                )} />
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