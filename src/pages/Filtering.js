import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { useHistory } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useAxios from '../utils/useAxios';
import { Tree } from 'primereact/tree';
import { MultiSelect } from 'primereact/multiselect';
import { TreeSelect } from 'primereact/treeselect';
import { v4 as uuidv4 } from 'uuid';

const bist = [
    { name: 'BIST30', code: 'BIST30' },
    { name: 'BIST50', code: 'BIST50' },
    { name: 'BIST100', code: 'BIST100' },
    { name: 'BISTTemettü', code: 'BISTTemettü' },
    { name: 'BISTSürdürülebilirlik', code: 'BISTSürdürülebilirlik' },
];

const cashflow = [
    { name: 'İşletme Faaliyetlerinden Pozitif Nakit Akışı', code: 'İşletme Faaliyetlerinden Nakit Akışı' },
    { name: 'Pozitif Serbest Nakit Akışı', code: 'Serbest Nakit Akışı' },
    { name: 'Dönem Sonu Nakit Miktarında Artış', code: 'Dönem Sonu Nakit Miktarı Artışı' },
];

const longTerm = [
    { name: 'Son 3 Yılda Her Çeyrek Pozitif Net Kar', code: 'BH' },
    { name: 'Son 3 Yılda Her Çeyrek Pozitif FAVÖK', code: 'BI' },
    { name: 'Son 3 Yılda Her Yıl Satışlarını Arttıranlar', code: 'BJ' },
    { name: 'Son 3 Yılda Her Yıl Net Karını Arttıranlar', code: 'BK' },
];

const productivity = [
    {
        "key": "Verimlilik Puanı-1",
        "label": "1 ve Üzeri",
    },
    {
        "key": "Verimlilik Puanı-2",
        "label": "2 ve Üzeri",
    },
    {
        "key": "Verimlilik Puanı-3",
        "label": "3 ve Üzeri",
    }
];

const liquidity = [
    {
        "key": "Likidite Puanı-1",
        "label": "1 ve Üzeri",
    },
    {
        "key": "Likidite Puanı-2",
        "label": "2 ve Üzeri",
    },
    {
        "key": "Likidite Puanı-3",
        "label": "3 ve Üzeri",
    }
];

const leverage = [
    {
        "key": "Kaldıraç Puanı-1",
        "label": "1 ve Üzeri",
    },
    {
        "key": "Kaldıraç Puanı-2",
        "label": "2 ve Üzeri",
    },
    {
        "key": "Kaldıraç Puanı-3",
        "label": "3 ve Üzeri",
    }
];

const grow = [
    {
        "key": "Büyüme Puanı-1",
        "label": "1 ve Üzeri",
    },
    {
        "key": "Büyüme Puanı-2",
        "label": "2 ve Üzeri",
    },
    {
        "key": "Büyüme Puanı-3",
        "label": "3 ve Üzeri",
    }
];

const lastQuarter = [
    {
        "key": "BFG-1",
        "label": "Son Çeyrekte Zarardan Kara Geçenler",
    },
    {
        "key": "BFG-9",
        "label": "Son Çeyrekte Kardan Zarara Geçenler",
    }
];

const sectoral = [
    { name: 'Yıllık Satış Büyümesi Sektörün Üstünde Olanlar', code: 'ysb' },
    { name: 'Özkaynak Getirisi Sektörün Üstünde Olanlar', code: 'og' },
    { name: 'Net Kar Marjı Sektörün Üstünde Olanlar', code: 'nkm' },
    { name: 'Cari Oranı Sektörün Üstünde Olanlar', code: 'co' },
    { name: 'Kaldıraç Oranı Sektörün Altında Olanlar', code: 'ko' },
];

const other = [
    { name: 'WACC<ROIC_2', code: 'waccltroic_2' },
    { name: 'Negatif Net Borç', code: 'negativenetdebt' },
];

const salesUp = [
    {
        "key": "Yıllık Satış Artışı",
        "selectable": false,
        "label": "Yıllık",
        "children": [
            {
                "key": "Yıllık-0.001",
                "label": "Artanlar",
            },
            {
                "key": "Yıllık-0.1",
                "label": "%10’dan fazla artanlar",
            },
            {
                "key": "Yıllık-0.3",
                "label": "%30’dan fazla artanlar",
            }
        ]
    },
    {
        "key": "Çeyreklik Satış Artışı",
        "label": "Çeyreklik",
        "selectable": false,
        "children": [
            {
                "key": "Çeyreklik-0.001",
                "label": "Artanlar",
            },
            {
                "key": "Çeyreklik-0.1",
                "label": "%10’dan fazla artanlar",
            },
            {
                "key": "Çeyreklik-0.3",
                "label": "%30’dan fazla artanlar",
            }
        ]
    }
];

const profit = [
    {
        "key": "Yıllık",
        "selectable": false,
        "label": "Yıllık",
        "children": [{
            "key": "Yıllık Esas Faaliyet Karı Artışı",
            "label": "Esas Faaliyet Kar Artışı",
            "selectable": false,
            "children": [
                { "key": "Yıllık Esas Faaliyet Karı Artışı-0.001", "label": "Artanlar" },
                { "key": "Yıllık Esas Faaliyet Karı Artışı-0.1", "label": "%10’dan fazla artanlar" },
                { "key": "Yıllık Esas Faaliyet Karı Artışı-0.3", "label": "%30’dan fazla artanlar" }
            ]
        },
        {
            "key": "Yıllık Net Kar Artışı",
            "label": "Net Kar Artışı",
            "selectable": false,
            "children": [
                { "key": "Yıllık Net Karı Artışı-0.001", "label": "Artanlar" },
                { "key": "Yıllık Net Karı Artışı-0.1", "label": "%10’dan fazla artanlar" },
                { "key": "Yıllık Net Karı Artışı-0.3", "label": "%30’dan fazla artanlar" }
            ]

        },
        {
            "key": "Yıllık FAVÖK Artışı",
            "label": "FAVÖK Artışı",
            "selectable": false,
            "children": [
                { "key": "Yıllık FAVÖK Artışı-0.001", "label": "Artanlar" },
                { "key": "Yıllık FAVÖK Artışı-0.1", "label": "%10’dan fazla artanlar" },
                { "key": "Yıllık FAVÖK Artışı-0.3", "label": "%30’dan fazla artanlar" }
            ]

        }]
    },
    {
        "key": "Çeyreklik",
        "label": "Çeyreklik",
        "selectable": false,
        "children": [{
            "key": "Çeyreklik Esas Faaliyet Kar Artışı",
            "label": "Esas Faaliyet Kar Artışı",
            "selectable": false,
            "children": [
                { "key": "Çeyreklik Esas Faaliyet Karı Artışı-0.001", "label": "Artanlar" },
                { "key": "Çeyreklik Esas Faaliyet Karı Artışı-0.1", "label": "%10’dan fazla artanlar" },
                { "key": "Çeyreklik Esas Faaliyet Karı Artışı-0.3", "label": "%30’dan fazla artanlar" }
            ]
        },
        {
            "key": "Çeyreklik Net Kar Artışı",
            "label": "Net Kar Artışı",
            "selectable": false,
            "children": [
                { "key": "Çeyreklik Net Karı Artışı-0.001", "label": "Artanlar" },
                { "key": "Çeyreklik Net Karı Artışı-0.1", "label": "%10’dan fazla artanlar" },
                { "key": "Çeyreklik Net Karı Artışı-0.3", "label": "%30’dan fazla artanlar" }
            ]

        },
        {
            "key": "Çeyreklik FAVÖK Artışı",
            "label": "FAVÖK Artışı",
            "selectable": false,
            "children": [
                { "key": "Çeyreklik FAVÖK Artışı-0.001", "label": "Artanlar" },
                { "key": "Çeyreklik FAVÖK Artışı-0.1", "label": "%10’dan fazla artanlar" },
                { "key": "Çeyreklik FAVÖK Artışı-0.3", "label": "%30’dan fazla artanlar" }
            ]

        }]
    }
]

const yields = [
    {
        "key": "Net Kar Marjı",
        "selectable": false,
        "label": "Net Kar Marjı",
        "children": [
            {
                "key": "Net Kar Marjı-0.05",
                "label": "%5 ve Üzeri",
            },
            {
                "key": "Net Kar Marjı-0.1",
                "label": "%10 ve Üzeri",
            },
            {
                "key": "Net Kar Marjı-0.2",
                "label": "%20 ve Üzeri",
            }
        ]
    },
    {
        "key": "Özkaynak Getirisi",
        "selectable": false,
        "label": "Özkaynak Getirisi",
        "children": [
            {
                "key": "Özkaynak Getirisi-0.05",
                "label": "%5 ve Üzeri",
            },
            {
                "key": "Özkaynak Getirisi-0.1",
                "label": "%10 ve Üzeri",
            },
            {
                "key": "Özkaynak Getirisi-0.2",
                "label": "%20 ve Üzeri",
            }
        ]
    },
    {
        "key": "Varlık Getirisi",
        "selectable": false,
        "label": "Varlık Getirisi",
        "children": [
            {
                "key": "Varlık Getirisi-0.05",
                "label": "%5 ve Üzeri",
            },
            {
                "key": "Varlık Getirisi-0.1",
                "label": "%10 ve Üzeri",
            },
            {
                "key": "Varlık Getirisi-0.2",
                "label": "%20 ve Üzeri",
            }
        ]
    },
]

const multiplier = [
    {
        key: "fk",
        label: 'F/K',
        children: [
            { key: "fk-Value1" },
            { key: "fk-Value2" },
        ]
    },
    {
        key: "peg",
        label: 'PEG',
        children: [
            { key: "peg-Value1" },
            { key: "peg-Value2" },
        ]
    },
    {
        key: "pddd",
        label: 'PD/DD',
        children: [
            { key: "pddd-Value1" },
            { key: "pddd-Value2" },
        ]
    },
    {
        key: "fdfavok",
        label: 'FD/FAVÖK',
        children: [
            { key: "fdfavok-Value1" },
            { key: "fdfavok-Value2" },
        ]
    },
    {
        key: "fdsellings",
        label: 'FD/SATIŞLAR',
        children: [
            { key: "fdsellings-Value1" },
            { key: "fdsellings-Value2" },
        ]
    },
    {
        key: "stockearning",
        label: 'Hisse Başına Kar',
        children: [
            { key: "stockearning-Value1" },
            { key: "stockearning-Value2" },
        ]
    },
];

const defMultiplier = {
    fk: { Value1: null, Value2: null },
    peg: { Value1: null, Value2: null },
    pddd: { Value1: null, Value2: null },
    fdfavok: { Value1: null, Value2: null },
    fdsellings: { Value1: null, Value2: null },
    stockearning: { Value1: null, Value2: null },
}

export const Filtering = () => {
    const toast = useRef(null);
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(false);
    const [selectedBist, setSelectedBist] = useState(null);
    const [selectedSalesUp, setSelectedSalesUp] = useState(null);
    const [selectedProfit, setSelectedProfit] = useState(null);
    const [selectedYield, setSelectedYield] = useState(null);
    const [selectedCashFlow, setSelectedCashFlow] = useState(null);
    const [selectedProductivity, setSelectedProductivity] = useState(null);
    const [selectedLiquidity, setSelectedLiquidity] = useState(null);
    const [selectedLeverage, setSelectedLeverage] = useState(null);
    const [selectedGrow, setSelectedGrow] = useState(null);
    const [selectedLongTerm, setSelectedLongTerm] = useState(null);
    const [selectedLastQuarter, setSelectedLastQuarter] = useState(null);
    const [selectedSectoral, setSelectedSectoral] = useState(null);
    const [selectedOther, setSelectedOther] = useState(null);
    const [showMultiplier, setShowMultiplier] = useState('none')
    const [selectedMultiplier, setSelectedMultiplier] = useState(defMultiplier);
    const dt = useRef(null);
    const history = useHistory();
    const [totalRecords, setTotalRecords] = useState(0);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
    });
    const [, forceUpdate] = useState(0)
    let api = useAxios();

    const filter = () => {
        setLoading(true)
        let req = {
            filterNames: [],
            Categories: [],
            SubCategories: []
        }
        if (selectedBist?.length > 0) {
            selectedBist.map(bist => req.filterNames.push({ "FilterName": bist.code, "Value1": "0", "Value2": "0" }))
        }
        if (selectedSalesUp) {
            Object.keys(selectedSalesUp).forEach(key => {
                let value = key.split('-')
                req.filterNames.push({ "FilterName": `${value[0]} Satış Artışı`, "Value1": value[1], "Value2": "0" })
            })
        }
        if (selectedProfit) {
            Object.keys(selectedProfit).forEach(key => {
                let value = key.split('-')
                req.filterNames.push({ "FilterName": value[0], "Value1": value[1], "Value2": "0" })
            })
        }
        if (selectedYield) {
            Object.keys(selectedYield).forEach(key => {
                let value = key.split('-')
                req.filterNames.push({ "FilterName": value[0], "Value1": value[1], "Value2": "0" })
            })
        }
        if (selectedCashFlow?.length > 0) {
            selectedCashFlow.map(flow => req.filterNames.push({ "FilterName": flow.code, "Value1": "1", "Value2": "" }))
        }
        if (selectedProductivity) {
            Object.keys(selectedProductivity).forEach(key => {
                let value = key.split('-')
                req.filterNames.push({ "FilterName": value[0], "Value1": value[1], "Value2": "" })
            })
        }
        if (selectedLiquidity) {
            Object.keys(selectedLiquidity).forEach(key => {
                let value = key.split('-')
                req.filterNames.push({ "FilterName": value[0], "Value1": value[1], "Value2": "" })
            })
        }
        if (selectedLeverage) {
            Object.keys(selectedLeverage).forEach(key => {
                let value = key.split('-')
                req.filterNames.push({ "FilterName": value[0], "Value1": value[1], "Value2": "" })
            })
        }
        if (selectedGrow) {
            Object.keys(selectedGrow).forEach(key => {
                let value = key.split('-')
                req.filterNames.push({ "FilterName": value[0], "Value1": value[1], "Value2": "" })
            })
        }
        if (selectedLongTerm?.length > 0) {
            selectedLongTerm.map(term => req.filterNames.push({ "FilterName": term.code, "Value1": "1", "Value2": "" }))
        }
        if (selectedLastQuarter) {
            Object.keys(selectedLastQuarter).forEach(key => {
                let value = key.split('-')
                req.filterNames.push({ "FilterName": value[0], "Value1": value[1], "Value2": "" })
            })
        }
        if (selectedSectoral?.length > 0) {
            selectedSectoral.map(sec => req.filterNames.push({ "FilterName": sec.code, "Value1": "1", "Value2": "" }))
        }
        if (selectedOther?.length > 0) {
            selectedOther.map(sec => req.filterNames.push({ "FilterName": sec.code, "Value1": "1", "Value2": "" }))
        }

        Object.keys(selectedMultiplier).forEach(key => {
            if (selectedMultiplier[key].Value1 || selectedMultiplier[key].Value2)
                req.filterNames.push({ "FilterName": key, "Value1": selectedMultiplier[key].Value1, "Value2": selectedMultiplier[key].Value2 })
        })

        api.post(`/filter?page=${lazyParams.page ? lazyParams.page + 1 : 1}&itemPerPage=${lazyParams.rows}&query=&sort=id&desc=false`, req).then(res => {
            setStocks(res.data.data)
            setTotalRecords(res.data.pageCount * lazyParams.rows)
        })
        setLoading(false)
        forceUpdate(prev => !prev)
    }

    useEffect(() => {
        filter()
    }, [lazyParams])

    const onPage = (event) => {
        setLazyParams(event);
    }

    const onSort = (event) => {
        setLazyParams(event);
    }

    const headerTemplate = (show, props) => {
        return (
            <div key={uuidv4()} className='p-grid' style={{ background: '#1F1E1E', minWidth: '200px' }}>
                <Button className="p-button-lg" label="Uygula" onClick={() => filter()} style={{ marginLeft: '10px' }} />
                {show &&
                    <Button className="p-button-plain p-button-lg p-button-text" label="Temizle" style={{ color: '#42AE7F' }} onClick={props} />
                }
            </div>
        );
    }

    const footerTemplate = (show, props) => {
        return (
            <div>
                <div className='p-col-12'>
                    <Button className="p-button-lg" label="Uygula" style={{ width: '100%' }} onClick={() => filter()} />
                </div>
                {show &&
                    <div className='p-col-12'>
                        <Button className="p-button-plain p-button-lg p-button-text" label="Temizle" style={{ width: '100%', color: '#42AE7F' }} onClick={props} />
                    </div>
                }
            </div>
        );
    }

    const multiplierOnChange = (e) => {
        let value = e.id.split('-')
        let _Multiplier = { ...selectedMultiplier };
        _Multiplier[value[0]][value[1]] = e.value;
        setSelectedMultiplier(_Multiplier)
    }

    const nodeTemplate = (node, options) => {
        if (node.children)
            return node.label
        let value = node.key.split('-')
        return (
            <InputText id={node.key} type="number" value={selectedMultiplier[value[0]][value[1]]} placeholder={value[1] === "Value1" ? "Alt Değer" : "Üst Değer"} onChange={(e) => multiplierOnChange(e.target)} />
        )
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
            <Toast ref={toast} />
            <h2>Filtrele</h2>
            <div className='p-grid'>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%', minWidth: '150px' }}>
                    <MultiSelect
                        inputId="bist"
                        style={{ minWidth: '150px' }}
                        value={selectedBist}
                        options={bist}
                        display="chip"
                        onChange={(e) => setSelectedBist(e.value)}
                        optionLabel="name"
                        className="multiselect-custom"
                        panelFooterTemplate={footerTemplate(selectedBist?.length > 0, () => setSelectedBist(null))} />
                    <label htmlFor="bist">BIST Endeksleri</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <TreeSelect
                        id="salesUp"
                        value={selectedSalesUp}
                        options={salesUp}
                        onChange={(e) => {
                            Object.keys(e.value).forEach(key => {
                                if (!e.value[key].checked)
                                    delete e.value[key];
                            })
                            if (selectedSalesUp) {
                                let newKey;
                                Object.keys(e.value).forEach(key => {
                                    if (selectedSalesUp[key] === undefined)
                                        newKey = key;
                                })
                                Object.keys(e.value).forEach(key => {
                                    if (selectedSalesUp[key] && key.substring(0, 5) == newKey.substring(0, 5))
                                        delete e.value[key]
                                })
                            }
                            setSelectedSalesUp(e.value)
                        }}
                        display="chip"
                        selectionMode="checkbox"
                        className="treeselect-custom"
                        panelHeaderTemplate={headerTemplate(selectedSalesUp !== null, () => setSelectedSalesUp(null))} />
                    <label htmlFor="salesUp">Satış Artış</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <TreeSelect
                        id="profit"
                        value={selectedProfit}
                        options={profit}
                        onChange={(e) => {
                            Object.keys(e.value).forEach(key => {
                                if (!e.value[key].checked)
                                    delete e.value[key];
                            })
                            if (selectedProfit) {
                                let newKey;
                                Object.keys(e.value).forEach(key => {
                                    if (selectedProfit[key] === undefined)
                                        newKey = key;
                                })
                                Object.keys(e.value).forEach(key => {
                                    if (selectedProfit[key] && key.substring(0, 15) == newKey.substring(0, 15))
                                        delete e.value[key]
                                })
                            }
                            setSelectedProfit(e.value)
                        }}
                        display="chip"
                        selectionMode="checkbox"
                        panelHeaderTemplate={headerTemplate(selectedProfit !== null, () => setSelectedProfit(null))} />
                    <label htmlFor="profit">Karlılık</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <TreeSelect
                        id="yield"
                        value={selectedYield}
                        options={yields}
                        onChange={(e) => {
                            Object.keys(e.value).forEach(key => {
                                if (!e.value[key].checked)
                                    delete e.value[key];
                            })
                            if (selectedYield) {
                                let newKey;
                                Object.keys(e.value).forEach(key => {
                                    if (selectedYield[key] === undefined)
                                        newKey = key;
                                })
                                Object.keys(e.value).forEach(key => {
                                    if (selectedYield[key] && key.substring(0, 15) == newKey.substring(0, 15))
                                        delete e.value[key]
                                })
                            }
                            setSelectedYield(e.value)
                        }}
                        display="chip"
                        selectionMode="checkbox"
                        panelHeaderTemplate={headerTemplate(selectedYield !== null, () => setSelectedYield(null))} />
                    <label htmlFor="yield">Getiri</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <MultiSelect
                        inputId="cashFlow"
                        value={selectedCashFlow}
                        options={cashflow}
                        display="chip"
                        onChange={(e) => setSelectedCashFlow(e.value)}
                        optionLabel="name"
                        className="multiselect-custom"
                        panelFooterTemplate={footerTemplate(selectedCashFlow?.length > 0, () => setSelectedCashFlow(null))} />
                    <label htmlFor="cashFlow">Nakit Akış</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <TreeSelect
                        id="productivityId"
                        value={selectedProductivity}
                        options={productivity}
                        onChange={(e) => {
                            if (selectedProductivity) {
                                Object.keys(e.value).forEach(key => {
                                    if (selectedProductivity[key])
                                        delete e.value[key]
                                })
                            }
                            setSelectedProductivity(e.value)
                        }}
                        display="chip"
                        selectionMode="checkbox"
                        panelHeaderTemplate={headerTemplate(selectedProductivity !== null, () => setSelectedProductivity(null))} />
                    <label htmlFor="productivityId">Verimlilik</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <TreeSelect
                        id="liquidity"
                        value={selectedLiquidity}
                        options={liquidity}
                        onChange={(e) => {
                            if (selectedLiquidity) {
                                Object.keys(e.value).forEach(key => {
                                    if (selectedLiquidity[key])
                                        delete e.value[key]
                                })
                            }
                            setSelectedLiquidity(e.value)
                        }}
                        display="chip"
                        selectionMode="checkbox"
                        panelHeaderTemplate={headerTemplate(selectedLiquidity !== null, () => setSelectedLiquidity(null))} />
                    <label htmlFor="liquidity">Likidite</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%', minWidth: '200px' }}>
                    <TreeSelect
                        id="leverage"
                        value={selectedLeverage}
                        options={leverage}
                        style={{ minWidth: '200px' }}
                        onChange={(e) => {
                            if (selectedLeverage) {
                                Object.keys(e.value).forEach(key => {
                                    if (selectedLeverage[key])
                                        delete e.value[key]
                                })
                            }
                            setSelectedLeverage(e.value)
                        }}
                        display="chip"
                        selectionMode="checkbox"
                        panelHeaderTemplate={headerTemplate(selectedLeverage !== null, () => setSelectedLeverage(null))} />
                    <label htmlFor="leverage">Kaldıraç (Borç Seviyesi)</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <TreeSelect
                        id="grow"
                        value={selectedGrow}
                        options={grow}
                        onChange={(e) => {
                            if (selectedGrow) {
                                Object.keys(e.value).forEach(key => {
                                    if (selectedGrow[key])
                                        delete e.value[key]
                                })
                            }
                            setSelectedGrow(e.value)
                        }}
                        display="chip"
                        selectionMode="checkbox"
                        panelHeaderTemplate={headerTemplate(selectedGrow !== null, () => setSelectedGrow(null))} />
                    <label htmlFor="grow">Büyüme</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%', minWidth: '150px' }}>
                    <MultiSelect
                        inputId="longTerm"
                        value={selectedLongTerm}
                        display="chip"
                        options={longTerm}
                        style={{ minWidth: '150px' }}
                        onChange={(e) => setSelectedLongTerm(e.value)}
                        optionLabel="name"
                        className="multiselect-custom"
                        panelFooterTemplate={footerTemplate(selectedLongTerm?.length > 0, () => setSelectedLongTerm(null))} />
                    <label htmlFor="longTerm">Uzun Dönemli</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%', minWidth: '200px' }}>
                    <TreeSelect
                        id="lastQuarter"
                        value={selectedLastQuarter}
                        options={lastQuarter}
                        style={{ minWidth: '200px' }}
                        onChange={(e) => {
                            if (selectedLastQuarter) {
                                Object.keys(e.value).forEach(key => {
                                    if (selectedLastQuarter[key])
                                        delete e.value[key]
                                })
                            }
                            setSelectedLastQuarter(e.value)
                        }}
                        display="chip"
                        selectionMode="checkbox"
                        panelHeaderTemplate={headerTemplate(selectedLastQuarter !== null, () => setSelectedLastQuarter(null))} />
                    <label htmlFor="lastQuarter">Son Çeyrek Değişim</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <MultiSelect
                        inputId="sectoral"
                        value={selectedSectoral}
                        display="chip"
                        options={sectoral}
                        onChange={(e) => setSelectedSectoral(e.value)}
                        optionLabel="name"
                        className="multiselect-custom"
                        panelFooterTemplate={footerTemplate(selectedSectoral?.length > 0, () => setSelectedSectoral(null))} />
                    <label htmlFor="sectoral">Sektörel</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <MultiSelect
                        inputId="other"
                        value={selectedOther}
                        display="chip"
                        options={other}
                        onChange={(e) => setSelectedOther(e.value)}
                        optionLabel="name"
                        className="multiselect-custom"
                        panelFooterTemplate={footerTemplate(selectedOther?.length > 0, () => setSelectedOther(null))} />
                    <label htmlFor="other">Diğer</label>
                </span>
                <span className="p-float-label" style={{ marginLeft: '1%', marginTop: '1%' }}>
                    <div className="p-multiselect p-component p-inputwrapper p-multiselect-chip multiselect-custom" onClick={() => setShowMultiplier(showMultiplier == 'block' ? 'none' : 'block')}>
                        <div className="p-multiselect-label-container">
                            <div className="p-multiselect-label p-multiselect-label-empty">empty</div>
                        </div>
                        <div className="p-multiselect-trigger">
                            <span className="p-multiselect-trigger-icon p-c pi pi-chevron-down"></span>
                        </div>
                    </div>
                    <Tree
                        value={multiplier}
                        style={{ display: showMultiplier, position: 'absolute', zIndex: 999, background: '#1F1E1E' }}
                        footer={footerTemplate(true, () => setSelectedMultiplier(defMultiplier))}
                        nodeTemplate={nodeTemplate} />
                    <label htmlFor="other">Çarpan</label>
                </span>
            </div>
            <div className="p-col-12">
                <DataTable ref={dt} value={stocks} lazy className="p-datatable-scrollable p-datatable-responsive" responsiveLayout="scroll" dataKey="id" paginator
                    first={lazyParams.first} rows={lazyParams.rows} totalRecords={totalRecords} onPage={onPage}
                    onSort={onSort} sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder} loading={loading}
                    rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="companyName" header="Firma İsmi" style={{ backgroundColor: '#171717' }}></Column>
                    <Column field="companyCode" header="Hisse Kodu" body={sembolBodyTemplate} style={{ backgroundColor: '#171717' }}></Column>
                    <Column field="category" header="Kategori" style={{ backgroundColor: '#171717' }}></Column>
                    <Column field="subCategory" header="Alt Kategori" style={{ backgroundColor: '#171717' }}></Column>
                </DataTable>
            </div>
        </div >
    )

}