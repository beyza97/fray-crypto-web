import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from 'primereact/datatable';
import { Chart } from 'primereact/chart';
import { MultiSelect } from 'primereact/multiselect';
import { Column } from 'primereact/column';
import useAxios from '../../../utils/useAxios';
import { numberFormat } from '../../../helpers/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getClassName } from '../../../helpers/common';

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

const lightOptions = {
    plugins: {
        legend: {
            position: 'bottom',
            display: true
        },
        datalabels: {
            color: '#FCFCFC',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 7,
            offset: 1,
            display: true,
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
};

const chartInputs = [
    { name: 'TOPLAM DÖNEN VARLIKLAR', code: 'A Dönen Varlıklar', borderColor: '#00968D', chartData: [] },
    { name: 'TOPLAM DURAN VARLIKLAR', code: 'A Duran Varlıklar', borderColor: '#114BE0', chartData: [] },
    { name: 'TOPLAM VARLIKLAR', code: 'A Toplam Varlıklar', borderColor: '#554570', chartData: [] },
    { name: 'Nakit ve Nakit Benzerleri', code: 'B Nakit ve Nakit Benzerleri', borderColor: '#685ABC', chartData: [] },
    { name: 'Ticari Alacaklar', code: 'B Ticari Alacaklar', borderColor: '#E4CB44', chartData: [] },
    { name: 'Stoklar', code: 'B Stoklar', borderColor: '#FCFCFC;', chartData: [] },
    { name: 'Maddi Duran Varlıklar', code: 'C Maddi Duran Varlıklar', borderColor: '#FCFCFC;', chartData: [] },
    { name: 'Maddi Olmayan Duran Varlıklar', code: 'C Maddi Olmayan Duran Varlıklar', borderColor: '#FCFCFC;', chartData: [] }
];

const chartSourceInputs = [
    { name: 'Toplam Kısa Vadeli Yükümlülükler', code: 'D Kısa Vadeli Yükümlülükler', borderColor: '#00968D', chartData: [] },
    { name: 'Toplam Uzun Vadeli Yükümlülükler', code: 'D Uzun Vadeli Yükümlülükler', borderColor: '#114BE0', chartData: [] },
    { name: 'TOPLAM YÜKÜMLÜLÜKLER', code: 'D Toplam Yükümlülükler', borderColor: '#554570', chartData: [] },
    { name: 'Kısa Vadeli Borçlanmalar', code: 'E Finansal Borçlar', borderColor: '#685ABC', chartData: [] },
    { name: 'Ticari Borçlar', code: 'E Ticari Borçlar', borderColor: '#E4CB44', chartData: [] },
    { name: 'Kısa Vadeli Karşılıklar', code: 'E Borç Karşılıkları', borderColor: '#FCFCFC;', chartData: [] },
    { name: 'Uzun Vadeli Borçlanmalar', code: 'F Finansal Borçlar', borderColor: '#685ABC', chartData: [] },
    { name: 'Ticari Borçlar', code: 'F Ticari Borçlar', borderColor: '#E4CB44', chartData: [] },
    { name: 'Uzun Vadeli Karşılıklar', code: 'F Uzun Vadeli Karşılıklar', borderColor: '#FCFCFC;', chartData: [] }
];

export const BalanceIncomeStatement = () => {
    const { code } = useParams();
    const [activeMainIndex, setActiveMainIndex] = useState(0);
    const [tableDataTl, setTableDataTl] = useState([]);
    const [tableDataEur, setTableDataEur] = useState([]);
    const [tableDataUsd, setTableDataUsd] = useState([]);
    const [tableSourceDataTl, setSourceTableDataTl] = useState([]);
    const [tableSourceDataEur, setSourceTableDataEur] = useState([]);
    const [tableSourceDataUsd, setSourceTableDataUsd] = useState([]);
    const [chartAssetsData, setChartAssetsData] = useState(null);
    const [chartOldAssetsData, setChartOldAssetsData] = useState(null);
    const [chartSourceData, setChartSourceData] = useState(null);
    const [chartOldSourceData, setChartOldSourceData] = useState(null);
    const [labels, setLabels] = useState([])
    const [pieLabels, setPieLabels] = useState([])

    const api = useAxios();


    useEffect(async () => {
        if (code) {
            const donen = await api.get(`/company/${code}/sub/Dönen Varlıklar`)
            const duran = await api.get(`/company/${code}/sub/Duran Varlıklar`)
            const resdonen = donen.data
            let labels = resdonen.periods.map((x) => { return `${x.year}/${x.month}` })
            setLabels(labels)
            let tlData = []
            let usdData = []
            let eurData = []
            let duranHeader = {
                label: "Dönen Varlıklar",
            }
            tlData.push(duranHeader);
            usdData.push(duranHeader);
            eurData.push(duranHeader);
            resdonen.rows.map((item) => {
                let tlRow = {
                    label: item.label,
                }
                let usdRow = {
                    label: item.label,
                }
                let eurRow = {
                    label: item.label,
                }
                labels.map((lab, index) => {
                    tlRow[lab] = item.values ? numberFormat(item.values[index]) : '-'
                    usdRow[lab] = item.usdValues ? numberFormat(item.usdValues[index]) : '-'
                    eurRow[lab] = item.eurValues ? numberFormat(item.eurValues[index]) : '-'
                })
                tlData.push(tlRow);
                usdData.push(usdRow);
                eurData.push(eurRow);
            })
            let header = {
                label: "Duran Varlıklar",
            }
            tlData.push(header);
            usdData.push(header);
            eurData.push(header);
            duran.data.rows.map((item) => {
                let tlRow = {
                    label: item.label,
                }
                let usdRow = {
                    label: item.label,
                }
                let eurRow = {
                    label: item.label,
                }
                labels.map((lab, index) => {
                    tlRow[lab] = item.values ? numberFormat(item.values[index]) : '-'
                    usdRow[lab] = item.usdValues ? numberFormat(item.usdValues[index]) : '-'
                    eurRow[lab] = item.eurValues ? numberFormat(item.eurValues[index]) : '-'
                })
                tlData.push(tlRow);
                usdData.push(usdRow);
                eurData.push(eurRow);
            })
            setTableDataTl(tlData);
            setTableDataUsd(usdData);
            setTableDataEur(eurData)
        }
    }, [code]);

    useEffect(async () => {
        if (code) {
            const kısa = await api.get(`/company/${code}/sub/Kısa Vadeli Yükümlülükler`)
            const uzun = await api.get(`/company/${code}/sub/Uzun Vadeli Yükümlülükler`)
            const ozkaynak = await api.get(`/company/${code}/sub/Özkaynaklar`)
            const reskısa = kısa.data
            const resuzun = uzun.data
            const resozkaynak = ozkaynak.data
            let labels = reskısa.periods.map((x) => { return `${x.year}/${x.month}` })
            setLabels(labels)
            let tlData = []
            let usdData = []
            let eurData = []
            let kısaHeader = {
                label: "Kısa Vadeli Yükümlülükler",
            }
            tlData.push(kısaHeader);
            usdData.push(kısaHeader);
            eurData.push(kısaHeader);
            reskısa.rows.map((item) => {
                let tlRow = {
                    label: item.label,
                }
                let usdRow = {
                    label: item.label,
                }
                let eurRow = {
                    label: item.label,
                }
                labels.map((lab, index) => {
                    tlRow[lab] = item.values ? numberFormat(item.values[index]) : '-'
                    usdRow[lab] = item.usdValues ? numberFormat(item.usdValues[index]) : '-'
                    eurRow[lab] = item.eurValues ? numberFormat(item.eurValues[index]) : '-'
                })
                tlData.push(tlRow);
                usdData.push(usdRow);
                eurData.push(eurRow);
            })
            let uzunHeader = {
                label: "Uzun Vadeli Yükümlülükler",
            }
            tlData.push(uzunHeader);
            usdData.push(uzunHeader);
            eurData.push(uzunHeader);
            resuzun.rows.map((item) => {
                let tlRow = {
                    label: item.label,
                }
                let usdRow = {
                    label: item.label,
                }
                let eurRow = {
                    label: item.label,
                }
                labels.map((lab, index) => {
                    tlRow[lab] = item.values ? numberFormat(item.values[index]) : '-'
                    usdRow[lab] = item.usdValues ? numberFormat(item.usdValues[index]) : '-'
                    eurRow[lab] = item.eurValues ? numberFormat(item.eurValues[index]) : '-'
                })
                tlData.push(tlRow);
                usdData.push(usdRow);
                eurData.push(eurRow);
            })

            let ozkaynakHeader = {
                label: "Özkaynaklar",
            }
            tlData.push(ozkaynakHeader);
            usdData.push(ozkaynakHeader);
            eurData.push(ozkaynakHeader);
            resozkaynak.rows.map((item) => {
                let tlRow = {
                    label: item.label,
                }
                let usdRow = {
                    label: item.label,
                }
                let eurRow = {
                    label: item.label,
                }
                labels.map((lab, index) => {
                    tlRow[lab] = item.values ? numberFormat(item.values[index]) : '-'
                    usdRow[lab] = item.usdValues ? numberFormat(item.usdValues[index]) : '-'
                    eurRow[lab] = item.eurValues ? numberFormat(item.eurValues[index]) : '-'
                })
                tlData.push(tlRow);
                usdData.push(usdRow);
                eurData.push(eurRow);
            })
            setSourceTableDataTl(tlData);
            setSourceTableDataUsd(usdData);
            setSourceTableDataEur(eurData)
        }
    }, [code]);

    useEffect(() => {
        api.get(`/company/${code}/periodCompare`).then(res => {
            setPieLabels(res.data.map(item => { return item.value }))
        })
        api.get(`/company/${code}/Donut`).then(res => {
            const pieData = res.data
            setChartAssetsData({
                labels: [pieData[0].title, pieData[1].title],
                datasets: [{ data: [pieData[0].value1.toFixed(4), pieData[1].value1.toFixed(4)], backgroundColor: ["#114BE0", "#00968D"] }]
            })
            setChartOldAssetsData({
                labels: [pieData[0].title, pieData[1].title],
                datasets: [{ data: [pieData[0].value2.toFixed(4), pieData[1].value2.toFixed(4)], backgroundColor: ["#114BE0", "#00968D"] }]
            })
            setChartSourceData({
                labels: [pieData[2].title, pieData[3].title, pieData[4].title],
                datasets: [{ data: [pieData[2].value1.toFixed(4), pieData[3].value1.toFixed(4), pieData[4].value1.toFixed(4)], backgroundColor: ["#114BE0", "#00968D", "#554570"] }]
            })
            setChartOldSourceData({
                labels: [pieData[2].title, pieData[3].title, pieData[4].title],
                datasets: [{ data: [pieData[2].value2.toFixed(4), pieData[3].value2.toFixed(4), pieData[4].value2.toFixed(4)], backgroundColor: ["#114BE0", "#00968D", "#554570"] }]
            })
        })
    }, [code])

    return (
        <div style={{ marginTop: '1%' }}>
            <div className="p-col-12">
                <Link style={{ color: '#ffffff', opacity: '0.5', textDecoration: 'none' }} to='/'>Hisseler {'>'} </Link>
                <Link style={{ color: '#ffffff', marginLeft: '0.5%', textDecoration: 'none' }} to={`/company/${code}`}>{code}</Link>
                <a style={{ color: '#ffffff', marginLeft: '0.5%' }}>{'>'} &nbsp; Finansallar</a>
            </div>
            <div className="p-grid" style={{ marginTop: '1%' }}>
                <div className="p-col-12" >
                    <h2>Bilanço Detayı</h2>
                </div>
                <div className="p-col-12" style={{ marginTop: '1%' }}>
                    <div className="tab-card">
                        <Button onClick={() => setActiveMainIndex(0)} className={getClassName("p-button-text mr-1",activeMainIndex === 0)} label="Varlıklar" />
                        <Button onClick={() => setActiveMainIndex(1)} className={getClassName("p-button-text mr-1",activeMainIndex === 1)} label="Kaynaklar" />
                    </div>
                    <div className="p-col-12">
                        <TabView id={uuidv4()} activeIndex={activeMainIndex} onTabChange={(e) => setActiveMainIndex(e.index)} style={{ border: 'inline' }}>
                            <TabPanel>
                                <IncomeDataTab
                                    code={code}
                                    labels={labels}
                                    tableDataTl={tableDataTl}
                                    tableDataUsd={tableDataUsd}
                                    tableDataEur={tableDataEur}
                                    chartPieData={chartAssetsData}
                                    chartOldPieData={chartOldAssetsData}
                                    pieLabel={pieLabels[0]}
                                    pieOldLabel={pieLabels[1]}
                                    chartDataInputs={chartInputs} />
                            </TabPanel>
                            <TabPanel>
                                <IncomeDataTab
                                    code={code}
                                    labels={labels}
                                    tableDataTl={tableSourceDataTl}
                                    tableDataUsd={tableSourceDataUsd}
                                    tableDataEur={tableSourceDataEur}
                                    chartPieData={chartSourceData}
                                    chartOldPieData={chartOldSourceData}
                                    pieLabel={pieLabels[0]}
                                    pieOldLabel={pieLabels[1]}
                                    chartDataInputs={chartSourceInputs} />
                            </TabPanel>
                        </TabView>
                    </div>

                </div>
            </div>
        </div>
    )
}

export const IncomeDataTab = ({ code, labels, tableDataTl, tableDataUsd, tableDataEur, chartPieData, chartOldPieData, pieLabel, pieOldLabel, chartDataInputs }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedGraphic, setSelectedGraphic] = useState([chartDataInputs[0]]);
    const [activeAssetsIndex, setActiveAssetsIndex] = useState(0);
    const [chartLabels, setChartLabels] = useState([])
    const [chartData, setChartData] = useState(null);
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
                        let findIndex = chartDataInputs.findIndex(x => x.name == resData.rows[0].label)
                        var tempDataSet = {
                            label: resData.rows[0].label,
                            data: resData.rows[0].values,
                            borderColor: chartDataInputs[findIndex].borderColor,
                        }
                        if (chartLabels.length == 0) {
                            let labels = resData.periods.map((x) => { return `${x.year}/${x.month}` })
                            grap.labels = labels;
                            setChartLabels(labels);
                        }
                        grap.datasets[index] = tempDataSet;
                        chartDataInputs[findIndex].chartData = tempDataSet
                    }
                })
            })
            setChartData(grap);
        }
    }, [selectedGraphic])

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            var data = activeIndex === 0 ? tableDataTl : activeIndex === 1 ? tableDataUsd : tableDataEur
            let worksheet = xlsx.utils.json_to_sheet(data);
            worksheet.A1.v = "Kalem"
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer);
        });
    }

    const saveAsExcelFile = (buffer) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, code + ' Bilanço Detayı');
            }
        });
    }

    return (
        <>
            <div className="p-grid">
                <div className="p-col-4" >
                    <h4>Varlık Dağılımı</h4>
                    <div className="tab-table-card">
                        <div className="tab-card" style={{ marginTop: '1%', width: '94%', marginLeft: '2%' }}>
                            <Button onClick={() => setActiveAssetsIndex(0)} className={getClassName("p-button-text mr-1",activeAssetsIndex === 0)} label={pieLabel} />
                            <Button onClick={() => setActiveAssetsIndex(1)} className={getClassName("p-button-text mr-1",activeAssetsIndex === 1)} label={pieOldLabel} />
                        </div>
                        <div className="p-col-12">
                            <TabView id={uuidv4()} activeIndex={activeAssetsIndex} onTabChange={(e) => setActiveAssetsIndex(e.index)} style={{ border: 'inline' }}>
                                <TabPanel>
                                    <Chart type="pie" data={chartPieData} plugins={[ChartDataLabels]} options={lightOptions} style={{ position: 'relative', width: '70%' }} />
                                </TabPanel>
                                <TabPanel>
                                    <Chart type="pie" data={chartOldPieData} plugins={[ChartDataLabels]} options={lightOptions} style={{ position: 'relative', width: '70%' }} />
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>
                </div>
                <div className="p-col-8" >
                    <h4>Varlık Grafikleri</h4>
                    <div className="p-col-12 custom-card">
                        <MultiSelect value={selectedGraphic} options={chartDataInputs} onChange={(e) => setSelectedGraphic(e.value)} optionLabel="name" maxSelectedLabels={4} />
                        <Chart type="line" style={{ width: '80%', marginLeft: '10%', marginTop: '1%' }} data={chartData} options={basicOptions} />
                    </div>
                </div>

                <div className="p-col-10" style={{ marginTop: '1%' }}>
                    <h4>Detaylı Bilanço Tablosu</h4>
                </div>
                <div className="p-col-2" style={{ marginTop: '1%' }}>
                    <Button onClick={() => setActiveIndex(0)} className={getClassName("p-button-text mr-1",activeIndex === 0)} label="₺" />
                    <Button onClick={() => setActiveIndex(1)} className={getClassName("p-button-text mr-1",activeIndex === 1)} label="$" />
                    <Button onClick={() => setActiveIndex(2)} className={getClassName("p-button-text mr-1",activeIndex === 2)} label="€" />
                    <Button label="Varlıkları İndir (.xls)" style={{ marginTop: '1%' }} onClick={() => exportExcel()} />
                </div>
                <div className="p-col-12">
                    <TabView id={uuidv4()} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} style={{ border: 'inline' }}>
                        <TabPanel>
                            <IncomeDataTable labels={labels} data={tableDataTl} />
                        </TabPanel>
                        <TabPanel>
                            <IncomeDataTable labels={labels} data={tableDataUsd} />
                        </TabPanel>
                        <TabPanel>
                            <IncomeDataTable labels={labels} data={tableDataEur} />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </>
    )
}

export const IncomeDataTable = ({ labels, data }) => {

    const dynamicColumns = labels.map((col, i) => {
        return <Column key={i} field={col} header={col} style={{ flexGrow: 1, flexBasis: '160px', background: '#171717' }} />;
    });

    const labelBody = (data) => {
        return (
            <>
                <span style={{
                    color: data.label == "Dönen Varlıklar" ||
                        data.label == "Duran Varlıklar" ||
                        data.label == "Kısa Vadeli Yükümlülükler" ||
                        data.label == "Uzun Vadeli Yükümlülükler" ||
                        data.label == "Özkaynaklar" ? 'red' : ''
                }}>{data.label}</span>
            </>
        );
    };

    return (
        <>
            <DataTable value={data} scrollable scrollDirection="both" className="mt-3" style={{ backgroundColor: 'transparent' }}>
                <Column field="label" header="Kalem" style={{ flexGrow: 1, flexBasis: '160px', background: '#171717' }} body={labelBody} frozen></Column>
                {dynamicColumns}
            </DataTable>
        </>
    )
}