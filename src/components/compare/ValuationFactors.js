import React, { useEffect, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import useAxios from '../../utils/useAxios';
import { getClassName } from '../../helpers/common';

const compNames = []

const horizontalOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    barPercentage: 0.8,
    plugins: {
        legend: {
            display: false
        },
        datalabels: {
            color: 'black',
            backgroundColor: 'white',
            borderRadius: 7,
            offset: 15,
            labels: {
                name: {
                    align: 'left',
                    font: { size: 16 },
                    formatter: function (value, ctx) {
                        return compNames[ctx.datasetIndex] + ":" + ctx.dataset.data[ctx.dataIndex];
                    }
                },
                display: true
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
                color: '#FCFCFC'
            },
            grid: {
                color: '#302F2F'
            }
        }
    }
};

const basicData = {
    labels: ['Şirket Değeri', 'Alt Sektör', 'Ana Sektör'],
    comp:['avod','test'],
    datasets: [
        {
            backgroundColor: ['#114BE0', '#00968D', '#554570'],
            datalabels: {
                align: 'start',
                anchor: 'end'
            },
            borderRadius: 10,
            data: [],
        },
        {
            backgroundColor: ['#114BE0', '#00968D', '#554570'],
            datalabels: {
                align: 'start',
                anchor: 'end'
            },
            borderRadius: 10,
            data: [],
        }
    ]
};

export const ValuationFactors = ({ code, code2 }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [detail, setDetail] = useState(null)
    const [detail2, setDetail2] = useState(null)
    const api = useAxios()

    useEffect(() => {
        if (code)
            api.get(`market/ratios/sectoral/${code}`).then(res => setDetail(res.data))
    }, [code]);

    useEffect(() => {
        if (code2)
            api.get(`market/ratios/sectoral/${code2}`).then(res => setDetail2(res.data))
    }, [code2]);

    if (!detail || !detail2)
        return null

    compNames[0] = code;
    compNames[1] = code2;

    const mapData = (self, sub, main, self2, sub2, main2) => {
        let map = JSON.parse(JSON.stringify(basicData))
        map.datasets[0].data = [self, sub, main]
        map.datasets[1].data = [self2, sub2, main2]
        return map
    }

    const fk = mapData(detail.fk.self, detail.fk.sub, detail.fk.main, detail2.fk.self, detail2.fk.sub, detail2.fk.main)
    const pddd = mapData(detail.pddd.self, detail.pddd.sub, detail.pddd.main, detail2.pddd.self, detail2.pddd.sub, detail2.pddd.main)
    const peg = mapData(detail.peg.self, detail.peg.sub, detail.peg.main, detail2.peg.self, detail2.peg.sub, detail2.peg.main)
    const fdSellings = mapData(detail.fdSellings.self, detail.fdSellings.sub, detail.fdSellings.main, detail2.fdSellings.self, detail2.fdSellings.sub, detail2.fdSellings.main)
    const fdfavok = mapData(detail.fdfavok.self, detail.fdfavok.sub, detail.fdfavok.main, detail2.fdfavok.self, detail2.fdfavok.sub, detail2.fdfavok.main)

    return (<>
        {
            detail && <div style={{ marginTop: '1%' }}>
                <h2>Değerleme Çarpanları</h2>
                <div className="tab-table-card">
                    <div className="tab-card" style={{ marginTop: '1%', width: '94%', marginLeft: '2%' }}>
                        <Button onClick={() => setActiveIndex(0)} className={getClassName("p-button-text mr-1",activeIndex === 0)} label="F/K" />
                        <Button onClick={() => setActiveIndex(1)} className={getClassName("p-button-text mr-1",activeIndex === 1)} label="PD/DD" />
                        <Button onClick={() => setActiveIndex(2)} className={getClassName("p-button-text mr-1",activeIndex === 2)} label="PEG" />
                        <Button onClick={() => setActiveIndex(3)} className={getClassName("p-button-text mr-1",activeIndex === 3)} label="FD/Satışlar" />
                        <Button onClick={() => setActiveIndex(4)} className={getClassName("p-button-text mr-1",activeIndex === 4)} label="FD/FAVÖK" />
                    </div>
                    <TabView id={uuidv4()} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                        <TabPanel>
                            <FactorChart data={fk} />
                        </TabPanel>
                        <TabPanel>
                            <FactorChart data={pddd} />
                        </TabPanel>
                        <TabPanel>
                            <FactorChart data={peg} />
                        </TabPanel>
                        <TabPanel>
                            <FactorChart data={fdSellings} />
                        </TabPanel>
                        <TabPanel>
                            <FactorChart data={fdfavok} />
                        </TabPanel>
                    </TabView>
                </div>

            </div>
        }</>

    )
}

const FactorChart = ({ data }) => {
    return (
        <Chart id={uuidv4()} type="bar" plugins={[ChartDataLabels]} style={{ width: '80%', marginLeft: '5%', marginTop: '1%' }} data={data} options={horizontalOptions} />
    )
}