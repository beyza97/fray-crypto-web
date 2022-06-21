import React, { useState, useEffect } from 'react';
import { StockTable } from './StockTable';
import useAxios from '../../utils/useAxios';

export const StockFollow = () => {
    const [favorite, setFavorite] = useState([]);

    let mockFollow = [
        { sembol: "AKBNK", gunlukyuzde: "-0.41", acilis: "11,48", son: "11,75" },
        { sembol: "GARAN", gunlukyuzde: "0.41", acilis: "11,48", son: "11,75" },
    ]
    let api = useAxios()
    useEffect(() => {
        //api.get('/favorite').then(res => setFavorite(res.data))
        setFavorite(mockFollow)
    }, []);
    return (
        <>{favorite &&
            <>
                <h2>Takip Edilen Hisseler</h2>
                <div className="tab-table-card">
                    <StockTable stocks={favorite} />
                </div>
            </>
        }
        </>
    );
}