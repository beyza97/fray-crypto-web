import React, { useState, useEffect } from 'react';
import { BistPanel } from '../components/dashboard/BistPanel';
import { CarouselPanel } from '../components/dashboard/CarouselPanel';
import { Topbar } from '../components/dashboard/Topbar';
import useAxios from '../utils/useAxios';
import { StockTrade } from '../components/dashboard/StockTrade';
import { StockFollow } from '../components/dashboard/StockFollow';
import { StockRecently } from '../components/dashboard/StockRecently';
import { LatestReports } from '../components/dashboard/LatestReports';
import { Sector } from '../components/dashboard/Sector';
import { UpcomingDividend } from '../components/dashboard/UpcomingDividend';
import { LastComment } from '../components/LastComment';

export const Dashboard = () => {
    const [dash, setDash] = useState([]);
    let api = useAxios();

    useEffect(() => {
        api.get('/market/dash').then(res => setDash(res.data))
    }, []);


    return (
        //bu body div olacak
        <body className='dashboard-body'>
            {/* <CarouselPanel/> */}
            <BistPanel {...dash} />
            <Topbar />
            <div className="p-grid" style={{ marginTop: '10px' }}>
                <div className="p-col-6">
                    <StockTrade {...dash} />
                    <Sector />
                </div>
                <div className="p-col-6">
                    <StockFollow />
                    <StockRecently />
                    <LatestReports />
                </div>
            </div>
            <UpcomingDividend />
            <LastComment />
        </body>
    );
}