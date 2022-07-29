import React, { useState, useEffect } from 'react';
import { Top10CoinsTable } from './Top10CoinsTable';
import useAxios from '../../utils/useAxios';

export const Top10Coins = () => {
    const [topten, settopTen] = useState([]);
    console.log(topten,"dfsdfdsfdsfdsfsdfdsfdsfdsfds")
    let api = useAxios()
    useEffect(() => {
        //api.get('/favorite').then(res => setFavorite(res.data))
        api.get('https://api.test.f-rayscoring.com/crypto/coin/dominance/USD').then((res)=>settopTen(res.data));
    }, []);
    return (

            <>
                <h2 style={{marginLeft:"10%"}}>Top 10 Coin Listesi</h2>
                <div className="tab-table-card" style={{marginLeft:"10%"}}>
                    <Top10CoinsTable
                        topCoins={topten}
                    />
                </div>
            </>

    );
}