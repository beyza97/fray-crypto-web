import React from 'react';
import { CompanyDetail } from './CompanyDetail';
import { DividendInformation } from './DividendInformation';
import { IncomeStatement } from './IncomeStatement';
import { RadarChart } from './RadarChart';
import { Ratios } from './Ratios';
import { StockPriceChart } from './StockPriceChart';
import { ThousandPanel } from './ThousandPanel';
import { ValuationFactors } from './ValuationFactors';



export const Summary = ({ company, company2 }) => {

    return (
        <div>
            <div className="p-grid" style={{ marginTop: '10px' }}>
                <div className="p-col-8">
                    <StockPriceChart code={company.code} />
                    <ValuationFactors code={company.code} code2={company2.code}/>
                </div>
                <div className="p-col-4">
                    <CompanyDetail code={company.code} code2={company2.code} />
                    <DividendInformation /> 
                </div>
            </div>
            <ThousandPanel code={company.code} code2={company2.code}/>
            <RadarChart code={company.code} code2={company2.code}/>
            <Ratios code={company.code} code2={company2.code}/>
            <IncomeStatement code={company.code} code2={company2.code}/>
        </div>
    )
}