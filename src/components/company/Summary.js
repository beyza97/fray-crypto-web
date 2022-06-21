import React from 'react';
import { StockPriceChart } from './Summary/StockPriceChart';
import { CompanyDetail } from './Summary/CompanyDetail';
import { ValuationFactors } from './Summary/ValuationFactors';
import { DividendInformation } from './Summary/DividendInformation';
import { ThousandPanel } from './Summary/ThousandPanel';
import { LastComment } from '../LastComment';
import { RadarChart } from './Summary/RadarChart';
import { SimilarCompany } from './Summary/SimilarCompany';
import { CompanyProfil } from './Summary/CompanyProfil';


export const Summary = (company) => {

    return (
        <div>
            <div className="p-grid" style={{ marginTop: '10px' }}>
                <div className="p-col-8">
                    <StockPriceChart code={company.code} />
                    <ValuationFactors code={company.code} />
                </div>
                <div className="p-col-4">
                    <CompanyDetail code={company.code} />
                    <DividendInformation />
                </div>
            </div>
            <ThousandPanel code={company.code} />
            <RadarChart code={company.code} />
            <SimilarCompany code={company.code} />
            <LastComment />
            <CompanyProfil {...company} />
        </div>
    )
}