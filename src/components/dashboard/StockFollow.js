import React, { useState, useEffect } from 'react';
import { StockTable } from './StockTable';
import useAxios from '../../utils/useAxios';

export const StockFollow = () => {
    const [favorite, setFavorite] = useState([]);

    let mockFollow = [
        { sembol: "BTC", gunlukyuzde: "----", acilis: "...", son: "..." },
        { sembol: "ETH", gunlukyuzde: "----", acilis: "...", son: "..." },
    ]
    let api = useAxios()
    useEffect(() => {
        //api.get('/favorite').then(res => setFavorite(res.data))
        setFavorite(mockFollow)
    }, []);
    return (
        <>{favorite &&
            <>
                <h2>Takip Edilen Coinler</h2>
                <div className="tab-table-card">
                    <StockTable stocks={favorite} />
                </div>
            </>
        }
        </>
    );
}