import React, { useEffect, useState } from 'react';
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import useAxios from '../../utils/useAxios';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import rasyos from "./Ratios/rasyo.json";
import { Tooltip } from 'primereact/tooltip';
import { CircularGauge, Scale, RangeContainer, Range } from "devextreme-react/circular-gauge";
import { getClassName } from '../../helpers/common';

const basicOptions = {
    maintainAspectRatio: true,
    aspectRatio: 5,
    plugins: {
        legend: {
            position: 'bottom',
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

const horizontalOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 1.3,
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
            display: function (context) {
                return context.dataset.data[context.dataIndex] > 0;
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

export const Ratios = ({ code }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [longTerm, setLongTerm] = useState([])
    const [gauge, setGauge] = useState([])
    const api = useAxios();

    useEffect(() => {
        if (code) {
            api.get(`/company/${code}/ratios/longTerm`).then(res => {
                if (res.data.length > 0) {
                    setLongTerm(res.data)
                }
            })
            api.get(`/market/valuation/${code}`).then(res => {
                if (res.data.length > 0) {
                    setGauge(res.data)
                }
            })
        }
    }, [code]);

    return (
        <div style={{ marginTop: '10px' }}>
            {longTerm.length > 0 && <>
                <h2>Finansal Oran</h2>
                <div className="tab-card" style={{ marginTop: '1%', width: '94%', marginLeft: '2%' }}>
                    {
                        longTerm?.map((item, index) => {
                            return (
                                <Button id={uuidv4()} onClick={() => setActiveIndex(index)} className={getClassName("p-button-text mr-1",activeIndex === index)} label={item.title} />
                            )
                        })
                    }
                </div>
                <div className="tab-table-card">
                    <div className="p-col-12">
                        <TabView id={uuidv4()} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                            {
                                longTerm?.map((item) => {
                                    return (
                                        <TabPanel key={uuidv4()}>
                                            <RatiosPanel data={item.datas} code={code} />
                                        </TabPanel>
                                    )
                                })
                            }
                        </TabView>
                    </div>
                </div></>
            }
            {gauge.length > 0 &&
                <>
                    <h2>Değerleme</h2>
                    <div className="p-grid custom-card">
                        {gauge?.map((data) => {
                            return (
                                <div className="p-col-3" key={uuidv4()}>
                                    <CircularGauge id="gauge" value={(data.value * 100).toFixed(2)}>
                                        <Scale startValue={0} endValue={100} tickInterval={10} />
                                        <RangeContainer>
                                            <Range startValue={0} endValue={100} color="#42AE7F" />
                                        </RangeContainer>
                                    </CircularGauge>
                                    <label style={{ marginLeft: '40%' }}>{`${data.title}:%${(data.value * 100).toFixed(2)}`}
                                        <i
                                            id={uuidv4()}
                                            className="pi pi-info-circle"
                                            data-pr-tooltip={rasyos.map((x) => (x.datas.find(x => x.name == data.title)?.value))}
                                            data-pr-position="right"
                                            data-pr-at="right+5 top"
                                            data-pr-my="left center-2"
                                            style={{ fontSize: '1rem', padding: '1%', cursor: 'pointer' }}
                                        />
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </div>
    )
}

export const RatiosPanel = ({ data, code }) => {
    const [index, setIndex] = useState(data[0])
    const [barData, setBarData] = useState([])
    const api = useAxios();
    const basicData = {
        labels: index.values.map((item) => { return item.period }),
        datasets: [
            {
                data: index.values.map((item) => { return item.value }),
                borderColor: '#42AE7F',
            }
        ]
    };

    const barDatas = {
        labels: [],
        datasets: [
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

    useEffect(() => {
        api.get(`/category/${code}/${index.name.replace("/", ":")}`).then(res => {
            const typeValue = res.data
            var currentMainCategoryAverage = parseFloat(typeValue.currentMainCategoryAverage).toFixed(2);
            var currentSubCategoryAverage = parseFloat(typeValue.currentSubCategoryAverage).toFixed(2);
            var currentTitleValue = parseFloat(typeValue.currentTitleValue).toFixed(2);
            var main_sektorName = typeValue.mainCategory + "(Ana) Sektör Ort";
            var sub_sektorName = typeValue.subCategory + "(Alt) Sektör Ort";
            var ratioValue = "Şirket rasyo değeri";
            barDatas.labels = [main_sektorName, sub_sektorName, ratioValue];
            barDatas.datasets[0].data = [currentMainCategoryAverage, currentSubCategoryAverage, currentTitleValue,];
            setBarData(barDatas)
        })
    }, [index])

    return (
        <div className="custom-card">
            <div className="p-grid" style={{ marginTop: '10px' }}>
                <div className="p-col-8">
                    <Dropdown options={data} value={index} onChange={(e) => setIndex(e.value)} optionLabel="name" style={{ marginLeft: '5%', marginTop: '1%' }}></Dropdown>
                </div>
                <div className="p-col-4">
                    {rasyos.map((x, y) => (
                        <p>
                            {x.datas.map((t, v) => (
                                <p>
                                    {t.name == index.name && (<>
                                        <Tooltip target=".pi" />
                                        <label>{index.name}
                                            <i
                                                id={uuidv4()}
                                                className="pi pi-info-circle"
                                                data-pr-tooltip={t.value}
                                                data-pr-position="right"
                                                data-pr-at="right+5 top"
                                                data-pr-my="left center-2"
                                                style={{ fontSize: '1rem', padding: '1%', cursor: 'pointer' }}
                                            />
                                        </label>
                                    </>
                                    )}
                                </p>
                            ))}
                        </p>
                    ))}
                </div>
            </div>
            <Chart id={uuidv4()} type="bar" plugins={[ChartDataLabels]} style={{ width: '80%', marginLeft: '5%', marginTop: '1%' }} data={barData} options={horizontalOptions} />
            <Chart type="line" style={{ width: '90%', marginLeft: '5%', marginTop: '3%' }} data={basicData} options={basicOptions} />
        </div>
    )
}