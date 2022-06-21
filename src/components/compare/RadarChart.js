import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import useAxios from '../../utils/useAxios';

const defaultChartData = {
    labels: [],
    datasets: [
        {
            backgroundColor: 'rgba(179, 177, 255, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            data: []
        },
        {
            backgroundColor: 'rgba(228, 203, 68, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
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

export const RadarChart = ({ code, code2 }) => {
    const [data, setData] = useState(null)
    const [data2, setData2] = useState(null)
    const [detail, setDetail] = useState(null)
    const [detail2, setDetail2] = useState(null)
    const [chartData, setChartData] = useState(null)
    const api = useAxios()

    useEffect(async () => {
        if (code) {
            var comp1 = await api.get(`/company/${code}/radar`)
            setData(comp1.data)
            defaultChartData.labels = comp1.data.map((item) => item.title)
            defaultChartData.datasets[0].data = comp1.data.map((item) => item.value1)
            var comp2 = await api.get(`/company/${code2}/radar`)
            setData2(comp2.data)
            defaultChartData.datasets[1].data = comp2.data.map((item) => item.value1)
            setChartData(defaultChartData)
            api.get(`/company/${code}/assessment`).then(res => setDetail(res.data.list))
            api.get(`/company/${code2}/assessment`).then(res => setDetail2(res.data.list))
        }
    }, [code]);

    if (!data || !detail)
        return null

    const star = (data.map(item => item.value1).reduce((prev, curr) => prev + curr, 0) / 5);
    const star2 = (data2.map(item => item.value1).reduce((prev, curr) => prev + curr, 0) / 5);

    return (
        <div style={{ marginTop: '1%' }}>
            <h2>Radar Grafiği</h2>
            <div className="tab-table-card">
                <div className="p-grid">
                    <div className="p-col-7">
                        <Chart type="radar" data={chartData} options={lightOptions} style={{ width: '45%', marginLeft: '25%' }} />
                    </div>
                    <div className="p-col-5">
                        <div style={{ border: '1px solid #262525', background: '#262525', borderRadius: '10px', height: '45%', width: '70%', marginTop: '2%', color: '#FCFCFC' }}>
                            <div className="p-grid">
                                <div className="p-col-4" style={{ marginLeft: '20%', marginTop: '3%' }}>
                                    <h4 style={{ color: '#B3B1FF' }}>Genel Skor</h4>
                                    <label style={{ marginLeft: '15%', color: '#B3B1FF' }}>{star.toFixed(2)}/5</label>
                                </div>
                                <div className="p-col-4" style={{ marginTop: '5%' }}>
                                    <Rating value={star} readOnly stars={5} cancel={false} />
                                </div>
                            </div>
                            <div className="p-grid" style={{ marginLeft: '15%', opacity: '0.5', marginTop: '5%' }}>
                                {
                                    data.map((item) => {
                                        return (
                                            <div key={uuidv4()} className="p-col-2" style={{ textAlign: 'center' }}>{item.title}</div>
                                        )
                                    })
                                }
                            </div>
                            <div className="p-grid" style={{ marginLeft: '15%' }}>
                                {
                                    data.map((item) => {
                                        return (
                                            <div key={uuidv4()} className="p-col-2" style={{ textAlign: 'center' }}>{item.value1}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div style={{ border: '1px solid #262525', background: '#262525', borderRadius: '10px', height: '45%', width: '70%', marginTop: '2%', color: '#FCFCFC' }}>
                            <div className="p-grid">
                                <div className="p-col-4" style={{ marginLeft: '20%', marginTop: '3%' }}>
                                    <h4 style={{ color: '#E4CB44' }}>Genel Skor</h4>
                                    <label style={{ marginLeft: '15%', color: '#E4CB44' }}>{star2.toFixed(2)}/5</label>
                                </div>
                                <div className="p-col-4" style={{ marginTop: '5%' }}>
                                    <Rating value={star2} readOnly stars={5} cancel={false} />
                                </div>
                            </div>
                            <div className="p-grid" style={{ marginLeft: '15%', opacity: '0.5', marginTop: '5%' }}>
                                {
                                    data2.map((item) => {
                                        return (
                                            <div key={uuidv4()} className="p-col-2" style={{ textAlign: 'center' }}>{item.title}</div>
                                        )
                                    })
                                }
                            </div>
                            <div className="p-grid" style={{ marginLeft: '15%' }}>
                                {
                                    data2.map((item) => {
                                        return (
                                            <div key={uuidv4()} className="p-col-2" style={{ textAlign: 'center' }}>{item.value1}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}