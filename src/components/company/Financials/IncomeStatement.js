import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Message } from 'primereact/message';
import { IncomeTable } from './IncomeTable';
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

const chartInputs = [
    { name: 'Satış Gelirleri', code: 'H Satış Gelirleri',borderColor:'#00968D', chartData: [] },
    { name: 'BRÜT KAR (ZARAR)', code: 'H Brüt Kar (Zarar)',borderColor:'#114BE0', chartData: [] },
    { name: 'ESAS FAALİYET KARI (ZARARI)', code: 'H Esas Faaliyet Karı (Zararı)',borderColor:'#554570', chartData: [] },
    { name: 'FİNANSMAN GELİRİ (GİDERİ) ÖNCESİ FAALİYET KARI (ZARARI)', code: 'H Finansman Geliri (Gideri) Öncesi Faaliyet Karı (Zararı)',borderColor:'#685ABC', chartData: [] },
    { name: 'Ana Ortaklık Payları', code: 'H Dönem Net Karı (Zararı) (Ana Ort. Payları)',borderColor:'#E4CB44', chartData: [] },
    { name: 'FAVÖK (Çeyreklik)', code: 'H FAVÖK (Çeyreklik)',borderColor:'#FCFCFC;', chartData: [] }
];

export const IncomeStatement = (prop) => {
    const { periods, comp, trends, financials, debt, wc, balance, code } = prop
    const [selectedGraphic, setSelectedGraphic] = useState([chartInputs[0]]);
    const [chartLabels, setChartLabels] = useState([])
    const history = useHistory();
    const [chartData, setChartData] = useState(null);
    const api = useAxios();

    const baseProp = {
        set: 1,
        comp,
        periods,
        financials,
        trends,
        debt,
        wc,
        balance,
    }
    const salingProp = {
        ...baseProp,
        year: 1,
        quarter: 0,
        category: 2,
        arr_number: 0,

    }
    const coreOperatingProfitProp = {
        ...baseProp,
        year: 3,
        quarter: 2,
        category: 3,
        arr_number: 13,
    }
    const netProfitProp = {
        ...baseProp,
        year: 5,
        quarter: 4,
        category: 4,
        arr_number: 28,
    }

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
                        if(chartLabels.length == 0){
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


    return (
        <div className="p-grid">
            <div className="p-col-6" >
                <Message style={{ width: '90%', marginLeft: '5%' }} severity="info" content={(
                    <React.Fragment>
                        <i className="pi pi-info-circle" />&nbsp;
                        <label>Detaylı Gelir Tablosu’nu görmek için</label> &nbsp;
                        <a href={`/company/${code}/financial/income`}>tıklayınız.</a>
                    </React.Fragment>
                )} />
            </div>
            <div className="p-col-6">
                <Message style={{ width: '90%', marginLeft: '5%' }} severity="info" content={(
                    <React.Fragment>
                        <i className="pi pi-info-circle" />&nbsp;
                        <label>Çeyreklik Gelir Tablosu’nu görmek için</label> &nbsp;
                        <a href={`/company/${code}/financial/quarter`}>tıklayınız.</a>
                    </React.Fragment>
                )} />
            </div>
            <div className="p-col-4">
                <h4>Satışlar</h4>
                <IncomeTable {...salingProp} />
            </div>
            <div className="p-col-4">
                <h4>Esas Faaliyet Karı</h4>
                <IncomeTable {...coreOperatingProfitProp} />
            </div>
            <div className="p-col-4">
                <h4>Net Kar</h4>
                <IncomeTable {...netProfitProp} />
            </div>
            <h4>Gelir Tablosu (Çeyreklik)</h4>
            <div className="p-col-12 custom-card">
                <MultiSelect value={selectedGraphic} options={chartInputs} onChange={(e) => setSelectedGraphic(e.value)} optionLabel="name" maxSelectedLabels={30} />
                <Chart type="line" style={{ width: '80%', marginLeft: '10%', marginTop: '1%' }} data={chartData} options={basicOptions} />
            </div>

        </div>
    )
}