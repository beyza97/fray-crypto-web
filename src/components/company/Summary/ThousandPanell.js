import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useAxios from '../../../utils/useAxios';
import { getClassName } from '../../../helpers/common';

const basicData = {
    labels: ['Hisse', 'BIST 100', 'Dolar', 'Mevduat', 'Bitcoin'],
    datasets: [
        {
            backgroundColor: ['#114BE0', '#00968D', '#554570', '#685ABC', '#A2A0A9'],
            datalabels: {
                align: 'end',
                anchor: 'end'
            },
            borderRadius: 10,
            data: [],
        }
    ]
};

const horizontalOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1.3,
    barPercentage: 0.5,
    plugins: {
        legend: {
            display: false
        },
        datalabels: {
            color: '#FCFCFC',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 7,
            offset: 1,
            display: function (context) {
                return context.dataset.data[context.dataIndex] > 15;
            },
            font: {
                weight: 'bold',
                size: 12
            },
            padding: {
                top: 5,
                left: 5,
                right: 5,
                bottom: 5
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#FCFCFC'
            },
            grid: {
                display: false,
            }
        },
        y: {
            ticks: {
                display: false,
            },
            grid: {
                display: false,
            }
        }
    }
};

const dayValue = [
    { key: '0', label: '7 gün', value: '7', data: null },
    { key: '1', label: '1 ay', value: '30', data: null },
    { key: '2', label: '3 ay', value: '90', data: null },
    { key: '3', label: '1 yıl', value: '360', data: null },
];

export const ThousandPanell = ({ code }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [, ForceUpdate] = useState(0)
    const api = useAxios()

    useEffect(() => {
        if (code && dayValue[activeIndex].data == null)
            api.get(`/market/stock/income/${code}/${dayValue[activeIndex].value}/1000`).then(res => {
                const resData = res.data
                let map = JSON.parse(JSON.stringify(basicData))
                map.datasets[0].data = [resData.stockPrice, resData.bistPrice, resData.usdtry, resData.deposit, resData.bitcoin]
                dayValue[activeIndex].data = map;
                ForceUpdate(n => !n)
            })
    }, [code, activeIndex]);


    return (<>
        {dayValue[activeIndex].data &&
            <div>
                <h2>1,000 TL’nize ne oldu?</h2>
                <div className="tab-table-card">
                    <div className="tab-card" style={{ marginTop: '1%', width: '94%', marginLeft: '2%' }}>
                        {
                            dayValue.map((item, index) => {
                                return (
                                    <Button id={uuidv4()} onClick={() => setActiveIndex(index)} className={getClassName("p-button-text mr-1",activeIndex === index)} label={item.label} />
                                )
                            })
                        }
                    </div>
                    <TabView id={uuidv4()} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                        {
                            dayValue.map((item) => {
                                return (
                                    <TabPanel key={uuidv4()}>
                                        <Chart id={uuidv4()} type="bar" plugins={[ChartDataLabels]} style={{ width: '80%', marginLeft: '5%', marginTop: '1%' }} data={item.data} options={horizontalOptions} />
                                    </TabPanel>
                                )
                            })
                        }
                    </TabView>
                </div>
            </div>
        }
    </>
    )
}
