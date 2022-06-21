import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'primereact/chart';
import useAxios from '../../../utils/useAxios';
import { getClassName } from '../../../helpers/common';


export const StockPriceChart = ({ code }) => {
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const [day, setDay] = useState(1);
    const [stockPrice, setStockPrice] = useState(null)

    const api = useAxios()

    useEffect(() => {
        if (code)
            api.get(`/market/stock/${code}/${day}`).then(res => setStockPrice(res.data))
    }, [code]);

    const basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: '#42AE7F',
            }
        ]
    };

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: true,
                    },
                    grid: {
                        display: false,
                    }
                },
                y: {
                    ticks: {
                        display: true,
                    },
                    grid: {
                        color: '#302F2F'
                    }
                }
            }
        };

        return {
            basicOptions
        }
    }
    const { basicOptions } = getLightTheme();

    return (
        <div>
            <h2>Hisse Fiyat Grafiği</h2>
            <div className="tab-table-card">
                <div className="tab-card" style={{ marginTop: '1%', width: '94%', marginLeft: '2%' }}>
                    <Button onClick={() => setActiveDayIndex(0)} className={getClassName("p-button-text mr-1",activeDayIndex === 0)} label="Günlük" />
                    <Button onClick={() => setActiveDayIndex(1)} className={getClassName("p-button-text mr-1",activeDayIndex === 1)} label="Haftalık" />
                    <Button onClick={() => setActiveDayIndex(2)} className={getClassName("p-button-text mr-1",activeDayIndex === 2)} label="Aylık" />
                    <Button onClick={() => setActiveDayIndex(3)} className={getClassName("p-button-text mr-1",activeDayIndex === 3)} label="Yıllık" />
                </div>
                <TabView id={uuidv4()} activeIndex={activeDayIndex} onTabChange={(e) => setActiveDayIndex(e.index)} style={{ border: 'inline' }}>
                    <TabPanel>
                        <Chart type="line" style={{ width: '80%', marginLeft: '10%', marginTop: '1%' }} data={basicData} options={basicOptions} />
                    </TabPanel>
                    <TabPanel>
                        <h2>test</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>test</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>test</h2>
                    </TabPanel>
                </TabView>
            </div>

        </div>
    )
}