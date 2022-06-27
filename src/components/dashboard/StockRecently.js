import React, { useState, useEffect } from 'react';
import { StockTable } from './StockTable';
import useAxios from '../../utils/useAxios';

export const StockRecently = () => {
    const [recently, setRecently] = useState([]);
    let mockRecently = [
        { sembol: "XPR", gunlukyuzde: "---", acilis: "...", son: "..." },
        { sembol: "DOGE", gunlukyuzde: "---", acilis: "...", son: "..." },
    ]
    let api = useAxios()

    useEffect(() => {
        api.get('/visits/last/5').then(res => setRecently(res.data))
        //setRecently(mockRecently)
    }, []);
    return (
        <>{recently &&
            <>
                <h2 style={{marginTop:"50px"}}>Son Gezilen Coinler</h2>
                <div className="tab-table-card">
                    <StockTable stocks={recently} />
                </div>
            </>
        }
        </>
    );
}