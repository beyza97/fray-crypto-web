import React, { useState, useEffect } from 'react';
import { StockTable } from './StockTable';
import useAxios from '../../utils/useAxios';

export const StockRecently = () => {
    const [recently, setRecently] = useState([]);
    let mockRecently = [
        { sembol: "AKBNK", gunlukyuzde: "-0.41", acilis: "11,48", son: "11,75" },
        { sembol: "GARAN", gunlukyuzde: "0.41", acilis: "11,48", son: "11,75" },
    ]
    let api = useAxios()

    useEffect(() => {
        api.get('/visits/last/5').then(res => setRecently(res.data))
        //setRecently(mockRecently)
    }, []);
    return (
        <>{recently &&
            <>
                <h2>Son Gezilen Hisseler</h2>
                <div className="tab-table-card">
                    <StockTable stocks={recently} />
                </div>
            </>
        }
        </>
    );
}