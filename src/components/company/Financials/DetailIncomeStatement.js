import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useAxios from '../../../utils/useAxios';
import { numberFormat } from '../../../helpers/common';
import { getClassName } from '../../../helpers/common';

export const DetailIncomeStatement = () => {
    const { code } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const [tableDataTl, setTableDataTl] = useState([]);
    const [tableDataEur, setTableDataEur] = useState([]);
    const [tableDataUsd, setTableDataUsd] = useState([]);
    const [labels, setLabels] = useState([])

    const api = useAxios();


    useEffect(() => {
        if (code)
            api.get(`/company/${code}/Gelir Tablosu`).then(res => {
                const resData = res.data
                let labels = resData.periods.map((x) => { return `${x.year}/${x.month}` })
                setLabels(labels)
                let tlData = []
                let usdData = []
                let eurData = []                
                resData.rows.map((item) => {
                    let tlRow = {
                        label: item.label,
                    }
                    let usdRow = {
                        label: item.label,
                    }
                    let eurRow = {
                        label: item.label,
                    }
                    labels.map((lab,index)=>{
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
            })
    }, [code]);
    
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

                module.default.saveAs(data, code + ' Gelir Detayı');
            }
        });
    }

    return (
        <div style={{ marginTop: '1%' }}>
            <div className="p-col-12">
                <Link style={{ color: '#ffffff', opacity: '0.5', textDecoration: 'none' }} to='/'>Hisseler {'>'} </Link>
                <Link style={{ color: '#ffffff', marginLeft: '0.5%', textDecoration: 'none' }} to={`/company/${code}`}>{code}</Link>
                <a style={{ color: '#ffffff', marginLeft: '0.5%' }}>{'>'} &nbsp; Finansallar</a>
            </div>
            <div className="p-grid" style={{ marginTop: '1%' }}>
                <div className="p-col-10" >
                    <h2>Detaylı Gelir Tablosu</h2>
                </div>
                <div className="p-col-2" >
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
        </div>
    )
}

export const IncomeDataTable = ({ labels, data }) => {

    const dynamicColumns = labels.map((col, i) => {
        return <Column key={i} field={col} header={col} style={{ flexGrow: 1, flexBasis: '160px',background: '#171717' }} />;
    });

    return (
        <>
            <DataTable value={data} scrollable scrollDirection="both" className="mt-3" style={{ backgroundColor: 'transparent' }}>
                <Column field="label" header="Kalem" style={{ flexGrow: 1, flexBasis: '160px',background: '#171717' }} frozen></Column>
                {dynamicColumns}
            </DataTable>
        </>
    )
}