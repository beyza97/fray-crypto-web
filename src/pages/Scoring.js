import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useAxios from '../utils/useAxios';
import { Button } from "primereact/button";
import { ProgressBar } from 'primereact/progressbar';
import { InputNumber } from 'primereact/inputnumber';
import { useHistory } from 'react-router-dom';
import { Footer } from '../components/Footer';

const labels = [
    {
        name: "Aktif Devir Hızı",
        formul: "Satışlar/Varlıklar"
    },
    {
        name: "Özkaynak Devir Hızı",
        formul: "Satışlar/Özkaynaklar"
    },
    {
        name: "Net Kar Marjı",
        formul: "Net Kar/Satışlar"
    },
    {
        name: "Varlık Getirisi (Aktif Karlılığı)",
        formul: "FVÖK/Varlıklar"
    },
    {
        name: "Özkaynak Getirisi (Karlılığı)",
        formul: "Net Kar/Özkaynak"
    },
    {
        name: "Cari Oran",
        formul: "Dönen Varlıklar/Kısa Vad. Yük"
    },
    {
        name: "Asit-Test (Likidite Oranı)",
        formul: "Dönen Varlıklar-Stoklar)/Kıs.Vad. Yük"
    },
    {
        name: "Borcun Varlıklara Oranı(Finansal Kaldıraç)-Geniş Yorum",
        formul: "Toplam Borç/Varlıklar"
    },
    {
        name: "Kısa Vadeli Borcun Özkaynaklara Oranı",
        formul: "Kısa Vadeli Yük./Özkaynaklar"
    },
    {
        name: "Finansal Giderlerin FAVÖK Oranı",
        formul: "Finansal Giderler/FAVÖK"
    },
]

const defInput = {}
labels.map(item => { defInput[`${item.name}`] = null })

export const Scoring = () => {
    const [barValue, setBarValue] = useState(0)
    const [scoreInputs, setScoreInputs] = useState(defInput)
    const [scoreValue, setScoreValue] = useState([])
    const history = useHistory();
    const [totalRecords, setTotalRecords] = useState(0);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
    });
    let api = useAxios();
    const dt = useRef(null);

    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _scoreInputs = { ...scoreInputs };
        _scoreInputs[`${name}`] = val;
        let total = sumValues(_scoreInputs)
        if (total > 100) {
            var fark = total - 100;
            _scoreInputs[`${name}`] = val - fark;
            total = 100;
        }
        setScoreInputs(_scoreInputs);
        setBarValue(total)
    }

    useEffect(() => {
        if (barValue == 100) {
            let reqData = []
            for (const [key, value] of Object.entries(scoreInputs)) {
                if (value > 0) {
                    let req = {
                        title: key,
                        weight: value
                    }
                    reqData.push(req)
                }
            }
            api.post(`/score?page=${lazyParams.page ? lazyParams.page + 1 : 1}&itemPerPage=${lazyParams.rows}&query=&sort=id&desc=true`, reqData).then(res => {
                const resData = res.data
                setScoreValue(resData.data)
                setTotalRecords(resData.pageCount * lazyParams.rows)
            })
        }
    }, [barValue, lazyParams])



    const onPage = (event) => {
        setLazyParams(event);
    }

    const onSort = (event) => {
        setLazyParams(event);
    }

    const displayValueTemplate = (value) => {
        return (
            <React.Fragment>
                <p style={{ marginTop: '1px', color: 'white' }}>{value}</p>
            </React.Fragment>
        );
    }

    const sembolBodyTemplate = (data) => {
        return (
            <>
                <Button className="p-button-symbol" label={data.companyCode} onClick={() => history.push(`/company/${data.companyCode}`)} />
            </>
        );
    }

    return (
        <div style={{ marginTop: '1%' }}>
            <h2>Puanlama</h2>
            <div className='p-grid'>
                <div className='p-col-4 custom-card' style={{ padding: '1%' }}>
                    <div>
                        <label>Ağırlıklandırma toplamlarının 100 olması gerekmektedir.</label>
                    </div>
                    <div style={{ width: '90%', marginLeft: '5%', marginTop: '3%' }}>
                        <ProgressBar value={barValue} displayValueTemplate={displayValueTemplate} style={{ height: '20px' }}></ProgressBar>
                    </div>
                    <div style={{ marginTop: '2%' }}>
                        <label>0</label>
                        <label style={{ marginLeft: '85%' }}>100</label>
                    </div>
                </div>
            </div>
            <div className='p-grid custom-card' style={{ marginTop: '1%' }}>
                {
                    labels.map((item, index) => {
                        return (
                            <div className='p-col-3'>
                                <h5>{item.name}</h5>
                                <p>{item.formul}</p>
                                <InputNumber
                                    id={`${index}`}
                                    disabled={barValue >= 100 && scoreInputs[`${item.name}`] <= 0}
                                    min={0}
                                    value={scoreInputs[`${item.name}`]}
                                    onValueChange={(e) => onInputNumberChange(e, item.name)}
                                    size={40}
                                    placeholder="Ağırlıklandırma (%)"
                                    mode="decimal" />
                            </div>
                        )
                    })
                }
                <div className='p-col-6'>
                    <Button label='Sıfırla' className="p-button-lg" style={{ marginLeft: '80%', marginTop: '7%' }} onClick={() => {
                        setScoreInputs(defInput)
                        setBarValue(0)
                        setScoreValue([])
                    }} />
                </div>
            </div>
            {scoreValue.length > 0 ? (
                <div className='custom-card' style={{ marginTop: '1%' }}>
                    <DataTable ref={dt} value={scoreValue} lazy className="p-datatable-scrollable" responsiveLayout="scroll" dataKey="id" paginator
                        first={lazyParams.first} rows={lazyParams.rows} totalRecords={totalRecords} onPage={onPage}
                        onSort={onSort} sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder}
                        rowsPerPageOptions={[5, 10, 25]}>
                        <Column field="companyName" header="Firma İsmi"></Column>
                        <Column field="companyCode" header="Hisse Kodu" body={sembolBodyTemplate}></Column>
                        <Column field="category" header="Kategori"></Column>
                        <Column field="subCategory" header="Alt Kategori"></Column>
                        <Column field="result" header="Fiyat"></Column>
                    </DataTable>
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '5%' }}>
                    <div style={{ background: 'rgba(66, 174, 127, 0.1)', color: '#42AE7F', height: '50px', width: '50px', borderRadius: '15px', marginLeft: '48%' }}>
                        <i className="pi pi-file" style={{ marginTop: '30%' }}></i>
                    </div>
                    <p style={{ marginTop: '2%' }}>İçerikleri görebilmek için lütfen ağırlıklandırma puanlarını doldurunuz.</p>
                </div>
            )
            }
        </div>
    )

}