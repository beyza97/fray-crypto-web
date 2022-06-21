import React, { useEffect, useState } from 'react';
import { Message } from 'primereact/message';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { MultiSelect } from 'primereact/multiselect';
import useAxios from '../../../utils/useAxios';

const basicOptions = {
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'bottom',
            display: true
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
    maintainAspectRatio: false,
    aspectRatio: 1.3,
    barPercentage: 0.5,
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
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

const chartInputs = [
    { name: 'DÖNEM SONU NAKİT VE NAKİT BENZERLERİ', code: 'G DÖNEM SONU NAKİT VE NAKİT BENZERLERİ', borderColor: '#00968D', chartData: [] },
    { name: 'İŞLETME FAALİYETLERİNDEN NAKİT AKIŞLARI', code: 'G İŞLETME FAALİYETLERİNDEN NAKİT AKIŞLARI', borderColor: '#114BE0', chartData: [] },
    { name: 'YATIRIM FAALİYETLERİNDEN KAYNAKLANAN NAKİT AKIŞLARI', code: 'G YATIRIM FAALİYETLERİNDEN KAYNAKLANAN NAKİT AKIŞLARI', borderColor: '#554570', chartData: [] },
    { name: 'FİNANSMAN FAALİYETLERİNDEN NAKİT AKIŞLARI', code: 'G FİNANSMAN FAALİYETLERİNDEN NAKİT AKIŞLARI', borderColor: '#685ABC', chartData: [] }
];

export const CashFlow = (prop) => {
    const { code } = prop
    const [selectedGraphic, setSelectedGraphic] = useState([chartInputs[0]]);
    const [chartWaterfallInputs, setChartWaterfallInputs] = useState([]);
    const [WaterfallIndex, setWaterfallIndex] = useState(null);
    const [chartLabels, setChartLabels] = useState([])
    const [chartData, setChartData] = useState(null);
    const [chartWaterfallData, setChartWaterfallData] = useState(null);
    const api = useAxios();


    useEffect(async () => {
        if (code) {
            let grap = {
                labels: chartLabels,
                datasets: []
            };
            let promiseArr = []
            selectedGraphic?.map((item) => {
                if (item.chartData.length === 0) {
                    var promise = api.get(`/company/${code}/sub/${item.code}/?years=4`)
                    promiseArr.push(promise);
                }
                else {
                    var promise = Promise.resolve(item.chartData);
                    promiseArr.push(promise);
                }

            })
            await Promise.all(promiseArr).then((value) => {
                value?.map((item, index) => {
                    if (item.label)
                        grap.datasets[index] = item;
                    else {
                        const resData = item.data
                        let findIndex = chartInputs.findIndex(x => x.name == resData.rows[0].label)
                        var tempDataSet = {
                            label: resData.rows[0].label,
                            data: resData.rows[0].values,
                            borderColor: chartInputs[findIndex].borderColor,
                        }
                        if (chartLabels.length == 0) {
                            let labels = resData.periods.map((x) => { return `${x.year}/${x.month}` })
                            grap.labels = labels;
                            setChartLabels(labels);
                        }
                        grap.datasets[index] = tempDataSet;
                        chartInputs[findIndex].chartData = tempDataSet
                    }
                })
            })
            setChartData(grap);
        }
    }, [code, selectedGraphic])

    useEffect(() => {
        var chartWaterfallInput = chartLabels?.map((item, index) => {
            return {
                name: item,
                code: index,
                chartData: []
            }
        })
        setChartWaterfallInputs(chartWaterfallInput);
    }, [chartLabels])

    useEffect(() => {
        if (WaterfallIndex) {
            let findIndex = WaterfallIndex != null ? chartLabels.findIndex(x => x == WaterfallIndex) : 0;
            if (chartWaterfallInputs[findIndex].chartData.labels)
                setChartWaterfallData(chartWaterfallInputs[findIndex].chartData)
            else {
                api.get(`/company/${code}/waterfall?colIndexOffset=${findIndex}`).then((res) => {
                    chartWaterfallInputs[findIndex].chartData.labels = res.data.map(x => { return x.title })
                    let tempData = []
                    res.data.map((x, index) => {
                        if (index == 0 || index == res.data.length - 1)
                            tempData.push([0, x.value1])
                        else
                            tempData.push([tempData[index - 1][1], tempData[index - 1][1] + x.value1])
                    })
                    chartWaterfallInputs[findIndex].chartData.datasets = [{
                        data: tempData,
                        backgroundColor: res.data.map(x => { return x.value1 > 0 ? '#42AE7F' : '#C33738' }),
                    }]
                    setChartWaterfallData(chartWaterfallInputs[findIndex].chartData)
                })
            }
        }

    }, [WaterfallIndex, chartLabels])

    useEffect(() => {
        if (chartData && chartLabels && WaterfallIndex == null) {
            setWaterfallIndex(chartLabels[0])
        }
    }, [chartData])

    const selectedItemTemplate = (option) => {
        if (option) {
            return (
                <div className="country-item country-item-value">                    
                    <div>{option.name}</div>
                </div>
            );
        }
        return "Seçim Yapınız";
    }

    return (
        <div className="p-grid">
            <div className="p-col-12" >
                <Message style={{ width: '90%', marginLeft: '5%' }} severity="info" content={(
                    <React.Fragment>
                        <i className="pi pi-info-circle" />&nbsp;
                        <label>Detaylı Nakit Akış Tablosu’nu görmek için </label> &nbsp;
                        <a href={`/company/${code}/financial/cashflow`}>tıklayınız.</a>
                    </React.Fragment>
                )} />
            </div>
            <div className="p-col-8">
                <h4>Nakit Akış Tablosu Grafikleri</h4>
                <div className="custom-card">
                    <MultiSelect value={selectedGraphic} options={chartInputs} onChange={(e) => setSelectedGraphic(e.value)} selectedItemTemplate={selectedItemTemplate} optionLabel="name" maxSelectedLabels={5} />
                    <Chart type="line" style={{ width: '80%', marginLeft: '10%', marginTop: '1%' }} data={chartData} options={basicOptions} />
                </div>
            </div>
            <div className="p-col-4">
                <h4>Waterfall Diyagramı</h4>
                <div className="custom-card">
                    <Dropdown options={chartLabels} value={WaterfallIndex} onChange={(e) => setWaterfallIndex(e.value)}></Dropdown>
                    <Chart type="bar" style={{ width: '80%', marginLeft: '10%', marginTop: '1%' }} data={chartWaterfallData} options={horizontalOptions} />
                </div>
            </div>
        </div>
    )
}