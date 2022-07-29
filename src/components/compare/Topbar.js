import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "primereact/button";
import { ProgressBar } from 'primereact/progressbar';
import { Dropdown } from 'primereact/dropdown';
import useAxios from '../../utils/useAxios';

const timeSelect = [
    { name: '1 Gün', code: '1' },
    { name: '3 Gün', code: '3' },
    { name: '1 Hafta', code: '7' },
    { name: '1 Ay', code: '30' }
];

export const Topbar = ({ company, company2 }) => {
    const [stock, setStock] = useState(null)
    const [stock2, setStock2] = useState(null)
    const [stockTime, setStockTime] = useState(timeSelect[0])
    const [stockTime2, setStockTime2] = useState(timeSelect[0])
    let api = useAxios()

    useEffect(() => {
        if (company.code)
            api.get(`/market/stock/${company.code}/${stockTime.code}`).then(res => setStock(res.data))
    }, [company, stockTime]);

    useEffect(() => {
        if (company2.code)
            api.get(`/market/stock/${company2.code}/${stockTime2.code}`).then(res => setStock2(res.data))
    }, [company2, stockTime2]);

    return (<div className='compare' >
        <div className='p-grid' style={{ marginTop: '1%' }}>
            <div className="p-col-12">
                <Link style={{ color: '#ffffff', opacity: '0.5', textDecoration: 'none' }} to='/compare'>Kıyaslama {'>'} </Link>
                <a style={{ color: '#ffffff', marginLeft: '0.5%' }}>{company.code} vs {company2.code}</a>
            </div>
            <h2>{company.code} - {company2.code} Kıyaslama</h2>
            <hr />
            <div className="p-col-12">
                <div className="p-grid p-formgrid">
                    {stock &&
                        <div className="p-col-5">
                            <div className="p-col-12">
                                <h4 style={{ color: '#B3B1FF' }}>{company.name}</h4>
                            </div>
                            <div className="p-col-5 p-md-5" >
                                <label style={{ opacity: '0.5' }}>Hisse Fiyatı</label>
                            </div>
                            <div className="p-col-5 p-md-5" style={{ padding: '1%' }}>
                                <div className="p-grid p-formgrid">
                                    <div className="p-col-4 p-md-4">
                                        <h2 >{stock.price}</h2>
                                    </div>
                                    <div className="p-col-4 p-md-4" >
                                        <div className={stock.rate < 0 ? "persent-negative" : "persent-positive"}>
                                            <i className={stock.rate < 0 ? "pi pi-angle-down" : "pi pi-angle-up"}></i>{stock.rate}%
                                        </div>
                                    </div>
                                    <div className="p-col-4 p-md-4" style={{ padding: '1%' }}>
                                        <label>{stock.rate}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-col-12 p-md-12">
                                <div className="p-grid p-formgrid">
                                    <div className="p-col-2 p-md-2">
                                        <label style={{ opacity: '0.5' }}>En Az:</label>
                                        <label style={{ marginLeft: '10px' }}>{stock.min}</label>
                                    </div>
                                    <div className="p-col-4 p-md-4" style={{ padding: '0.5%' }}>
                                        <ProgressBar value={(100 * stock.current) / stock.max} showValue={false}></ProgressBar>
                                    </div>
                                    <div className="p-col-2 p-md-2" >
                                        <label style={{ opacity: '0.5' }}>En Çok:</label>
                                        <label style={{ marginLeft: '10px' }}>{stock.max}</label>
                                    </div>
                                    <div>
                                        <Dropdown style={{ height: '30px', marginTop: '-5px' }} value={stockTime} onChange={(e) => setStockTime(e.value)} options={timeSelect} optionLabel="name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="p-col-1 vertical-line" style={{marginLeft:'5%'}}></div>
                    {stock2 &&
                        <div className="p-col-5">
                            <div className="p-col-12">
                                <h4 style={{ color: '#E4CB44' }}>{company2.name}</h4>
                            </div>
                            <div className="p-col-5 p-md-5" >
                                <label style={{ opacity: '0.5' }}>Hisse Fiyatı</label>
                            </div>
                            <div className="p-col-5 p-md-5" style={{ padding: '1%' }}>
                                <div className="p-grid p-formgrid">
                                    <div className="p-col-4 p-md-4">
                                        <h2 >{stock2.price}</h2>
                                    </div>
                                    <div className="p-col-4 p-md-4" >
                                        <div className={stock2.rate < 0 ? "persent-negative" : "persent-positive"}>
                                            <i className={stock2.rate < 0 ? "pi pi-angle-down" : "pi pi-angle-up"}></i>{stock2.rate}%
                                        </div>
                                    </div>
                                    <div className="p-col-4 p-md-4" style={{ padding: '1%' }}>
                                        <label>{stock2.rate}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-col-12 p-md-12">
                                <div className="p-grid p-formgrid">
                                    <div className="p-col-2 p-md-2">
                                        <label style={{ opacity: '0.5' }}>En Az:</label>
                                        <label style={{ marginLeft: '10px' }}>{stock2.min}</label>
                                    </div>
                                    <div className="p-col-4 p-md-4" style={{ padding: '0.5%' }}>
                                        <ProgressBar value={(100 * stock2.current) / stock2.max} showValue={false}></ProgressBar>
                                    </div>
                                    <div className="p-col-2 p-md-2" >
                                        <label style={{ opacity: '0.5' }}>En Çok:</label>
                                        <label style={{ marginLeft: '10px' }}>{stock2.max}</label>
                                    </div>
                                    <div>
                                        <Dropdown style={{ height: '30px', marginTop: '-5px' }} value={stockTime2} onChange={(e) => setStockTime2(e.value)} options={timeSelect} optionLabel="name" />
                                    </div>
                                </div>
                            </div>
                        </div >
                    }
                </div>
            </div>
        </div>
    </div>

    );
}