import React, { useEffect, useState } from 'react';
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import useAxios from '../../utils/useAxios';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import rasyos from "../company/Ratios/rasyo.json";
import { Tooltip } from 'primereact/tooltip';
import { CircularGauge, Scale, RangeContainer, Range, ValueIndicator, SubvalueIndicator } from "devextreme-react/circular-gauge";
import { getClassName } from '../../helpers/common';

const compNames = []

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

export const Ratios = ({ code, code2 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [longTerm, setLongTerm] = useState([])
    const [gauge, setGauge] = useState([])
    const [longTerm2, setLongTerm2] = useState([])
    const [gauge2, setGauge2] = useState([])
    const api = useAxios();


    compNames[0] = code;
    compNames[1] = code2;

    useEffect(() => {
        if (code) {
            api.get(`/company/${code}/ratios/longTerm`).then(res => {
                setLongTerm(res.data)
            })
            api.get(`/market/valuation/${code}`).then(res => {
                setGauge(res.data)
            })
            api.get(`/company/${code2}/ratios/longTerm`).then(res => {
                setLongTerm2(res.data)
            })
            api.get(`/market/valuation/${code2}`).then(res => {
                setGauge2(res.data)
            })
        }
    }, [code]);

    return (
        <div style={{ marginTop: '10px' }}>
            <h2>Finansal Oran</h2>
            <div className="tab-card" style={{ marginTop: '1%', width: '94%', marginLeft: '2%' }}>
                {longTerm.length > 0 && longTerm2.length > 0 &&
                    longTerm.map((item, index) => {
                        return (
                            <Button id={uuidv4()} onClick={() => setActiveIndex(index)} className={getClassName("p-button-text mr-1",activeIndex === index)} label={item.title} />
                        )
                    })
                }
            </div>
            <div className="tab-table-card">
                <div className="p-col-12">
                    <TabView id={uuidv4()} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                        {longTerm.length > 0 && longTerm2.length > 0 &&
                            longTerm.map((item, index) => {
                                return (
                                    <TabPanel key={index}>
                                        <RatiosPanel data={item.datas} code={code} data2={longTerm2[index].datas} code2={code2} />
                                    </TabPanel>
                                )
                            })
                        }
                    </TabView>
                </div>
            </div>
            <h2>Değerleme</h2>
            <div className="p-grid custom-card">
                {gauge.length > 0 && gauge2.length > 0 && gauge.map((data, index) => {
                    return (
                        <div className="p-col-3">
                            <CircularGauge id="gauge" value={(data.value * 100).toFixed(2)} subvalues={(gauge2[index].value * 100).toFixed(2)}>
                                <Scale startValue={0} endValue={100} tickInterval={10} />
                                <RangeContainer>
                                    <Range startValue={0} endValue={100} color="#42AE7F" />
                                </RangeContainer>
                                <ValueIndicator
                                    type="rectangleNeedle"
                                    color="#B3B1FF"
                                ></ValueIndicator>
                                <SubvalueIndicator
                                    type="twoColorNeedle"
                                    color="#E4CB44"
                                    secondColor="#1F1E1E"
                                ></SubvalueIndicator>
                            </CircularGauge>
                            <label style={{ marginLeft: '40%',color:'#B3B1FF' }}>{`${data.title}:%${(data.value * 100).toFixed(2)}`}
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
                            <label style={{ marginLeft: '40%',color:'#E4CB44' }}>{`${data.title}:%${(gauge2[index].value * 100).toFixed(2)}`}
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
        </div>
    )
}

export const RatiosPanel = ({ data, code, data2, code2 }) => {
    const [index, setIndex] = useState(data[0])
    const [barData, setBarData] = useState([])
    const api = useAxios();

    const basicData = {
        labels: index.values.map((item) => { return item.period }),
        datasets: [
            {
                data: index.values.map((item) => { return item.value }),
                borderColor: '#114BE0',
            },
            {
                data: data2.find(x => x.name === index.name).values.map((item) => { return item.value }),
                borderColor: '#554570',
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

    useEffect(async () => {
        const res = await api.get(`/category/${code}/${index.name.replace("/", ":")}`)
        const typeValue = res.data
        var currentMainCategoryAverage = parseFloat(typeValue.currentMainCategoryAverage).toFixed(2);
        var currentSubCategoryAverage = parseFloat(typeValue.currentSubCategoryAverage).toFixed(2);
        var currentTitleValue = parseFloat(typeValue.currentTitleValue).toFixed(2);
        var main_sektorName = typeValue.mainCategory + "(Ana) Sektör Ort";
        var sub_sektorName = typeValue.subCategory + "(Alt) Sektör Ort";
        var ratioValue = "Şirket rasyo değeri";
        barDatas.labels = [main_sektorName, sub_sektorName, ratioValue];
        barDatas.datasets[0].data = [currentMainCategoryAverage, currentSubCategoryAverage, currentTitleValue];

        const res2 = await api.get(`/category/${code2}/${index.name.replace("/", ":")}`)
        const typeValue2 = res2.data
        var currentMainCategoryAverage2 = parseFloat(typeValue2.currentMainCategoryAverage).toFixed(2);
        var currentSubCategoryAverage2 = parseFloat(typeValue2.currentSubCategoryAverage).toFixed(2);
        var currentTitleValue2 = parseFloat(typeValue2.currentTitleValue).toFixed(2);
        barDatas.datasets[1].data = [currentMainCategoryAverage2, currentSubCategoryAverage2, currentTitleValue2];

        setBarData(barDatas)
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