import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import useAxios from '../../../utils/useAxios';
import { useHistory } from 'react-router-dom';

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

export const SimilarCompany = ({ code }) => {
    const [dividents, setDividents] = useState([]);
    const history = useHistory();
    const api = useAxios()

    useEffect(() => {
        if (code)
            api.get(`/company/${code}/similar`).then(res => setDividents(res.data.data))
    }, [code]);


    const dividentsTemplate = (divident) => {
        return (
            <div className="upcoming-body" style={{ padding: '15px', height: '175px' }}>
                <div className="p-grid">
                    <div className="p-col-9">
                        <h5>{divident.companyName}</h5>
                        {/* <div className="p-grid">
                            <div className="p-col-4">
                                <h4>22,80</h4>
                            </div>
                            <div className="p-col-4">
                                <div className={true ? "persent-negative" : "persent-positive"}>
                                    <i className={true ? "pi pi-angle-down" : "pi pi-angle-up"}></i>5%
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="p-col-2">
                        <Button className="p-button-symbol" label={divident.companyCode} onClick={() => history.push(`/company/${divident.companyCode}`)} style={{ marginTop: '1%' }} />
                    </div>
                </div>
                <div className="p-grid" style={{ opacity: '0.5' }}>
                    <div className="p-col-6">Kategori</div>
                    <div className="p-col-6">Alt Kategori</div>
                </div>
                <div className="p-grid" >
                    <div className="p-col-6">{divident.category}</div>
                    <div className="p-col-6">{divident.subCategory}</div>
                </div>
            </div>
        );
    }

    return (<>
        {dividents.length > 0 &&
            <div style={{ marginTop: '1%' }}>
                <h2>Benzer Firmalar</h2>
                <Carousel value={dividents} numVisible={4} numScroll={1} responsiveOptions={responsiveOptions} circular
                    autoplayInterval={3000} itemTemplate={dividentsTemplate} />
            </div>
        }
    </>
    );
}