import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import useAxios from '../../../utils/useAxios';
import { getClassName } from '../../../helpers/common';

const defaultChartData = {
    labels: [],
    datasets: [
        {
            backgroundColor: 'rgba(66, 174, 127, 0.2)',
            borderColor: 'rgba(179,181,198,1)',
            data: []
        }
    ]
};

const lightOptions = {
    plugins: {
        legend: {
            display: false
        },
    },
    scales: {
        r: {
            pointLabels: {
                color: '#FCFCFC',
            },
            grid: {
                color: '#ebedef',
            },
            angleLines: {
                color: '#ebedef'
            }
        }
    }
};

export const RadarChart = ({ code }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState(null)
    const [detail, setDetail] = useState(null)
    const [chartData, setChartData] = useState(null)
    const api = useAxios()

    useEffect(() => {
        if (code){
            api.get(`/company/${code}/radar`).then(res => {
                if(res.data.length > 0){
                    defaultChartData.labels = res.data.map((item) => item.title)
                    defaultChartData.datasets[0].data = res.data.map((item) => item.value1)
                    setChartData(defaultChartData)
                    setData(res.data)
                }
            })
            api.get(`/company/${code}/assessment`).then(res => setDetail(res.data.list))
        }
    }, [code]);

    if (!data || !detail)
        return null

    const star = (data.map(item => item.value1).reduce((prev, curr) => prev + curr, 0) / 5);

    return (
        <div style={{ marginTop: '1%' }}>
            <h2>Radar Grafiği</h2>
            <div className="tab-table-card">
                <div className="p-grid">
                    <div className="p-col-6">
                        <Chart type="radar" data={chartData} options={lightOptions} style={{ width: '45%', marginLeft: '25%' }} />
                    </div>
                    <div className="p-col-6" style={{ border: '1px solid #262525', background: '#262525', borderRadius: '10px', height: '50%', width: '40%', marginTop: '5%', color: '#FCFCFC' }}>
                        <div className="p-grid">
                            <div className="p-col-4" style={{ marginLeft: '20%', marginTop: '3%' }}>
                                <h4>Genel Skor</h4>
                                <label style={{ marginLeft: '15%' }}>{star.toFixed(2)}/5</label>
                            </div>
                            <div className="p-col-4" style={{ marginTop: '5%' }}>
                                <Rating value={star} readOnly stars={5} cancel={false} />
                            </div>
                        </div>
                        <div className="p-grid" style={{ marginLeft: '15%', opacity: '0.5', marginTop: '5%' }}>
                            {
                                data.map((item) => {
                                    return (
                                        <div key={uuidv4()} className="p-col-2" style={{textAlign:'center'}}>{item.title}</div>
                                    )
                                })
                            }
                        </div>
                        <div className="p-grid" style={{ marginLeft: '15%' }}>
                            {
                                data.map((item) => {
                                    return (
                                        <div key={uuidv4()} className="p-col-2" style={{textAlign:'center'}}>{item.value1}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="tab-card" style={{ marginTop: '1%', width: '94%', marginLeft: '2%' }}>
                    {
                        detail.map((item, index) => {
                            return (
                                <Button id={uuidv4()} onClick={() => setActiveIndex(index)} className={getClassName("p-button-text mr-1",activeIndex === index)} label={item.title} />
                            )
                        })
                    }
                </div>
                <TabView id={uuidv4()} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                    {
                        detail.map((item) => {
                            return (
                                <TabPanel key={uuidv4()}>
                                    <div key={uuidv4()} style={{ marginLeft: '3%', marginTop: '1%' }}>
                                        {
                                            item.dataList.map((value) => {
                                                return (
                                                    <>
                                                        {value.isPositive ? (
                                                            <i className="pi pi-check-circle" style={{ color: 'green' }}></i>
                                                        ) : (
                                                            <i className="pi pi-angle-double-down" style={{ color: 'red' }}></i>
                                                        )}
                                                        <label style={{marginLeft:'3px'}}>{value.textS}</label>
                                                        <p style={{opacity:'0.6',padding:'1%'}}>{value.text}</p>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </TabPanel>
                            )
                        })
                    }
                </TabView>
            </div>
        </div>
    )
}