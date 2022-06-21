import React, { useEffect, useState } from 'react';
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { Message } from 'primereact/message';
import useAxios from '../../utils/useAxios';
import { numberFormat,getClassName } from '../../helpers/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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

const basicOptions = {
    maintainAspectRatio: true,
    aspectRatio: 6,
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

export const Analyzes = ({ code }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeAnalysisIndex, setActiveAnalysisIndex] = useState(0);
    const [analysis, setAnalysis] = useState([]);
    const [period1, setPeriod1] = useState(null)
    const [period2, setPeriod2] = useState(null)
    const [periods, setPeriods] = useState([])
    const [startPeriods, setStartPeriods] = useState([])
    const [endPeriods, setEndPeriods] = useState([])
    const api = useAxios();
    const [periodCompare, setPeriodCompare] = useState(null);
    const [barData, setBarData] = useState([])
    const [barPreData, setPreBarData] = useState([])
    const [equity, setEquity] = useState([])
    const [netProfit, setNetProfit] = useState([])
    const [active, setActive] = useState([])
    const [asset, setAsset] = useState([])

    useEffect(() => {
        if (code) {
            api.get(`/company/${code}/periodCompare`).then(res => setPeriodCompare(res.data))
            api.get(`/company/${code}/ratios/longTerm`).then(res => {
                const longTerm = res.data
                if (longTerm.length > 0) {
                    const equity = {
                        labels: longTerm[5].datas[0].values.map((item) => { return item.period }),
                        datasets: [
                            {
                                data: longTerm[5].datas[0].values.map((item) => { return item.value }),
                                borderColor: '#42AE7F',
                            }
                        ]
                    };
                    setEquity(equity)
                    const netProfit = {
                        labels: longTerm[3].datas[4].values.map((item) => { return item.period }),
                        datasets: [
                            {
                                data: longTerm[3].datas[4].values.map((item) => { return item.value }),
                                borderColor: '#42AE7F',
                            }
                        ]
                    };
                    setNetProfit(netProfit)
                    const active = {
                        labels: longTerm[0].datas[0].values.map((item) => { return item.period }),
                        datasets: [
                            {
                                data: longTerm[0].datas[0].values.map((item) => { return item.value }),
                                borderColor: '#42AE7F',
                            }
                        ]
                    };
                    setActive(active)
                    const asset = {
                        labels: longTerm[2].datas[7].values.map((item) => { return item.period }),
                        datasets: [
                            {
                                data: longTerm[2].datas[7].values.map((item) => { return item.value }),
                                borderColor: '#42AE7F',
                            }
                        ]
                    };
                    setAsset(asset)
                }
            })
            api.get(`/category/${code}/Özkaynak Getirisi`).then(res => {
                const typeValue = res.data
                var currentMainCategoryAverage = parseFloat(typeValue.currentMainCategoryAverage).toFixed(2);
                var currentSubCategoryAverage = parseFloat(typeValue.currentSubCategoryAverage).toFixed(2);
                var currentTitleValue = parseFloat(typeValue.currentTitleValue).toFixed(2);
                var main_sektorName = typeValue.mainCategory + "(Ana) Sektör Ort";
                var sub_sektorName = typeValue.subCategory + "(Alt) Sektör Ort";
                var ratioValue = "Şirket rasyo değeri";
                barDatas.labels = [main_sektorName, sub_sektorName, ratioValue];
                barDatas.datasets[0].data = [currentMainCategoryAverage, currentSubCategoryAverage, currentTitleValue];
                setBarData(barDatas)
                var previousMainCategoryAverage = parseFloat(typeValue.previousMainCategoryAverage).toFixed(2);
                var previousSubCategoryAverage = parseFloat(typeValue.previousSubCategoryAverage).toFixed(2);
                var previousTitleValue = parseFloat(typeValue.previousTitleValue).toFixed(2);
                barDatas.datasets[0].data = [previousMainCategoryAverage, previousSubCategoryAverage, previousTitleValue];
                setPreBarData(barDatas)
            })
        }
    }, [code]);

    useEffect(() => {
        if (code) {
            api.get(`/company/${code}/periods`).then(res => {
                const resPeriods = res.data.periods.map((x) => { return `${x.year}/${x.month}` })
                setPeriods(resPeriods)
                setStartPeriods(resPeriods.slice(0,-1))
                setPeriod1(resPeriods[0])
                setPeriod2(resPeriods[2])
                getAnalysis()
            })
        }
    }, [code])

    useEffect(() => {
        getAnalysis()
    }, [period1, period2])

    useEffect(() => {
        var index = periods.findIndex(x => x == period1)
        var endPeriods = periods.slice(index + 1)
        setEndPeriods(endPeriods)
        var endIndex = periods.findIndex(x => x == period2)
        if (index >= endIndex)
            setPeriod2(endPeriods[0])
    }, [period1])

    const getAnalysis = () => {
        if (!period1 || !period2)
            return
        api.get(`/company/${code}/trend/analysis?period1=${period1.replace('/', '.')}&period2=${period2.replace('/', '.')}`).then(res => {
            setAnalysis(res.data.list)
        })
    }


    return (
        <div style={{ marginTop: '10px' }}>
            <h2>Analizler</h2>
            <div className="tab-card" style={{ marginTop: '1%' }}>
                <Button onClick={() => setActiveIndex(0)} className={getClassName("p-button-text mr-1",activeIndex === 0)} label="Trend  Dikey Analizi" />
                <Button onClick={() => setActiveIndex(1)} className={getClassName("p-button-text mr-1",activeIndex === 1)} label="DuPont Analizi" />
            </div>
            <TabView id={uuidv4()} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                <TabPanel>
                    <div className="tab-table-card">
                        <div className="p-grid" style={{ marginTop: '1%', marginLeft: '1%' }}>
                            <div className="p-col-2">
                                <label>1. Dönem:</label>
                                <Dropdown options={startPeriods} value={period1} onChange={(e) => setPeriod1(e.value)} style={{ marginLeft: '4%' }}></Dropdown>
                            </div>
                            <div className="p-col-2">
                                <label>2. Dönem:</label>
                                <Dropdown options={endPeriods} value={period2} onChange={(e) => setPeriod2(e.value)} style={{ marginLeft: '4%' }}></Dropdown>
                            </div>
                        </div>
                        <div className="tab-card" style={{ marginTop: '1%', width: '94%', marginLeft: '2%' }}>
                            {analysis && analysis.map((item, index) => {
                                return (<Button id={uuidv4()} onClick={() => setActiveAnalysisIndex(index)} className={getClassName("p-button-text mr-1",activeIndex === index)} label={item.title} />)
                            })}
                        </div>
                        <TabView id={uuidv4()} activeIndex={activeAnalysisIndex} onTabChange={(e) => setActiveAnalysisIndex(e.index)} style={{ border: 'inline' }}>
                            {analysis && analysis.map((item) => {
                                return (
                                    <TabPanel key={uuidv4()}>
                                        <DataTable value={item.dataList} id={uuidv4()}>
                                            <Column field="name" header="Bilanço"></Column>
                                            <Column field="value1" header={period1} body={(data) => numberFormat(data.value1)}></Column>
                                            <Column field="value2" header={period2} body={(data) => numberFormat(data.value2)}></Column>
                                            <Column field="value3" header={`Trend Analizi (${period1} vs ${period2})`}
                                                body={(data) =>
                                                    Math.round(data.value3 * 100).toLocaleString() !==
                                                        "-0"
                                                        ? Math.round(
                                                            data.value3 * 100
                                                        ).toLocaleString() + " (%)"
                                                        : "0 (%)"
                                                }></Column>
                                            <Column field="value4" header={`Dikey Analiz (${period1})`}
                                                body={(data) =>
                                                    Math.round(data.value4 * 100).toLocaleString() + " (%)"
                                                }></Column>
                                            <Column field="value5" header={`Dikey Analiz (${period2})`}
                                                body={(data) =>
                                                    Math.round(data.value5 * 100).toLocaleString() + " (%)"
                                                }></Column>
                                        </DataTable>
                                    </TabPanel>
                                )
                            })}
                        </TabView>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="p-grid" style={{ marginTop: '1%' }}>
                        <Message severity="info" content={(
                            <div className="p-grid">
                                <i className="pi pi-info-circle" style={{ marginTop: '1%', position: 'absolute', marginLeft: '0.5%' }} />
                                <p style={{ marginLeft: '2%', marginTop: '1%' }}>Özkaynak karlılığı, bir şirketin özkaynakları üzerinden elde ettiği getiriyi ölçer. Başka bir deyişle, şirketin hissedarları yaptıkları her 1 TL’ lik özkaynak katkısı karşılığında, kaç TL net kar elde ettiler sorusunu cevaplar. Özkaynak karlılığını neyin etkilediğini anlamak için yararlı bir teknik, onu bileşenlerine ayırmaktır. Bu analize DuPont Analizi de denilmektedir. Özkaynak karlılığı formülü (Net Kar/Özkaynak) matematiksel olarak şu hale getirilebilir.</p>
                                <p style={{ marginLeft: '2%' }}>Net Kar/Özkaynak = (Net Kar/Satışlar) x (Satışlar/Toplam Varlıklar) x (Toplam Varlıklar/Özkaynak)</p>
                                <p style={{ marginLeft: '2%' }}>Bu durumda özkaynak karlılığını; Karlılık (Net Kar/Satışlar), Verimlilik (Satışlar/Toplam Varlıklar) ve Kaldıraç (Toplam Varlıklar/Özkaynak) bileşenlerine ayırmış oluruz. Bu sayede özkaynak karlılığındaki değişimlerin de hangi bileşenden kaynaklandığını kolaylıkla görebiliriz.</p>
                            </div>
                        )} />
                        <div className="p-col-6" style={{ marginTop: '1%' }}>
                            <div className="custom-card">
                                <h4 style={{ marginTop: '1%', marginLeft: '5%' }}>{periodCompare && periodCompare[1].value}</h4>
                                <Chart id={uuidv4()} type="bar" plugins={[ChartDataLabels]} style={{ width: '80%', marginLeft: '5%', marginTop: '1%' }} data={barPreData} options={horizontalOptions} />
                            </div>
                        </div>
                        <div className="p-col-6" style={{ marginTop: '1%' }}>
                            <div className="custom-card">
                                <h4 style={{ marginTop: '1%', marginLeft: '5%' }}>{periodCompare && periodCompare[0].value}</h4>
                                <Chart id={uuidv4()} type="bar" plugins={[ChartDataLabels]} style={{ width: '80%', marginLeft: '5%', marginTop: '1%' }} data={barData} options={horizontalOptions} />
                            </div>
                        </div>
                        <h4>Özkaynak Getirisi</h4>
                        <div className="p-col-12" style={{ marginTop: '1%' }}>
                            <div className="custom-card">
                                <Chart type="line" style={{ width: '90%', marginLeft: '5%', marginTop: '1%' }} data={equity} options={basicOptions} />
                            </div>
                        </div>
                        <h4>Net Kar Marjı</h4>
                        <div className="p-col-12" style={{ marginTop: '1%' }}>
                            <div className="custom-card">
                                <Chart type="line" style={{ width: '90%', marginLeft: '5%', marginTop: '1%' }} data={netProfit} options={basicOptions} />
                            </div>
                        </div>
                        <h4>Aktif Devir Hızı</h4>
                        <div className="p-col-12" style={{ marginTop: '1%' }}>
                            <div className="custom-card">
                                <Chart type="line" style={{ width: '90%', marginLeft: '5%', marginTop: '1%' }} data={active} options={basicOptions} />
                            </div>
                        </div>
                        <h4>Varlığın Özkaynağa Oranı</h4>
                        <div className="p-col-12" style={{ marginTop: '1%' }}>
                            <div className="custom-card">
                                <Chart type="line" style={{ width: '90%', marginLeft: '5%', marginTop: '1%' }} data={asset} options={basicOptions} />
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    )
}