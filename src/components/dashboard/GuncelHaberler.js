import React, { useState, useEffect } from 'react';
import { HaberTablo } from './HaberTablo';
import useAxios from '../../utils/useAxios';


export const GuncelHaberler = () => {
    const [favorite, setFavorite] = useState([]);

    let mockFollow = [
        { sembol: "BTC", gunlukyuzde: "----", acilis: "...", son: "..." },
        { sembol: "ETH", gunlukyuzde: "----", acilis: "...", son: "..." },
    ]
    let api = useAxios()
    useEffect(() => {
        //api.get('/favorite').then(res => setFavorite(res.data))
        api.get('https://api.test.f-rayscoring.com/crypto/coin/dominance/USD')
        setFavorite(mockFollow)
    }, []);
    return (
        <>{favorite &&
            <>
                <h2>En Güncel  Piyasa Başlıkları </h2>
                <div className="tab-table-card">
                    <HaberTablo/>
                    
                </div>
            </>
        }
        </>
    );
}