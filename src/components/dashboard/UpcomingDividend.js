import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import useAxios from '../../utils/useAxios';

export const UpcomingDividend = () => {
    const [dividents, setDividents] = useState([]);

    let api = useAxios()

    let mockDividents = [
        { sembol: "BTC", data: "--haziran", pay: "-.-", yüzde: "% " },
        { sembol: "ETH", data: "--haziran", pay: "-.-", yüzde: "% " },
        { sembol: "XPR", data: "--haziran", pay: "-.-", yüzde: "% " },
        { sembol: "SOLANA", data: "--haziran", pay: "-.-", yüzde: "% " },
        { sembol: "SHIB", data: "--haziran", pay: "-.-", yüzde: "% " },
        { sembol: "ADA", data: "--haziran", pay: "-.-", yüzde: "% " },
    ]
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        //api.get('/dashboard/divident/disclosure').then(res => setDividents(res.data))
        setDividents(mockDividents)
    }, []);


    const dividentsTemplate = (divident) => {
        return (
            <div className="upcoming-body" style={{marginTop:"50px"}}>
                <div className="p-grid">
                    <div className="p-col-4">
                        <Button className="p-button-symbol" label={divident.sembol} />
                    </div>
                </div>
                <div className="p-grid" style={{marginLeft:'1%', opacity: '0.5'}}>
                    <div className="p-col-4">Tarih</div>
                    <div className="p-col-4">Pay Başı</div>
                    <div className="p-col-4">Yüzde</div>
                </div>
                <div className="p-grid" style={{marginLeft:'1%'}}>
                    <div className="p-col-4">{divident.data}</div>
                    <div className="p-col-4">{divident.pay}</div>
                    <div className="p-col-4">{divident.yüzde}</div>
                </div>
            </div>
        );
    }

    return (
        <Carousel value={dividents} numVisible={4} numScroll={1} style={{ marginTop: '10px' }} responsiveOptions={responsiveOptions} circular
            autoplayInterval={3000} itemTemplate={dividentsTemplate} />
    );
}