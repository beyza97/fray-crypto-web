import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "primereact/button";
import { ProgressBar } from 'primereact/progressbar';
import { Dropdown } from 'primereact/dropdown';
import useAxios from '../../../utils/useAxios';

const timeSelect = [
    { name: '1 Gün', code: '1' },
    { name: '3 Gün', code: '3' },
    { name: '1 Hafta', code: '7' },
    { name: '1 Ay', code: '30' }
];

export const Topbar = (company) => {
    const [stock, setStock] = useState(null)
    const [stockTime, setStockTime] = useState(timeSelect[0])
    let api = useAxios()

    useEffect(() => {
        if (company.code)
            api.get(`/market/stock/${company.code}/${stockTime.code}`).then(res => setStock(res.data))
    }, [company,stockTime]);

    return (<>
        <div className='p-grid' style={{ marginTop: '1%' }}>
            <div className="p-col-12">
                <Link style={{ color: '#ffffff', opacity: '0.5', textDecoration: 'none' }} to='/'>Hisseler {'>'} </Link>
                <a style={{ color: '#ffffff', marginLeft: '0.5%' }}>{company?.code}</a>
            </div>
            <div className="p-col-12">
                <div className="p-grid p-formgrid">
                    <div className="p-col-4 p-md-4">
                        <h1 >{company?.name}</h1>
                        <Button className="p-button-symbol" icon="pi pi-info-circle" label='Şirket profili' />
                    </div>
                    {stock &&
                        <div className="p-col-6">
                            <div className="p-col-6 p-md-6" >
                                <label style={{ opacity: '0.5' }}>Hisse Fiyatı</label>
                            </div>
                            <div className="p-col-6 p-md-6" style={{ padding: '1%' }}>
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
                            <div className="p-col-10 p-md-10">
                                <div className="p-grid p-formgrid">
                                    <div className="p-col-2 p-md-2">
                                        <label style={{ opacity: '0.5' }}>En Az:</label>
                                        <label style={{ marginLeft: '10px' }}>{stock.min}</label>
                                    </div>
                                    <div className="p-col-4 p-md-4" style={{ padding: '0.5%' }}>
                                        <ProgressBar value={(100*stock.current)/stock.max} showValue={false}></ProgressBar>
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
                </div>
            </div>
        </div>
    </>

    );
}