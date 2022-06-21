import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useAxios from '../utils/useAxios';
import { Button } from "primereact/button";
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';

export const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const [totalRecords, setTotalRecords] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: null,
        sortOrder: null,
    });
    let api = useAxios();
    const history = useHistory();
    const dt = useRef(null);

    useEffect(() => {
        api.get(`/post?aktif=1&page=${lazyParams.page ? lazyParams.page + 1 : 1}&itemPerPage=${lazyParams.rows}&query=${globalFilter}&sort=id&desc=true`).then(res => {
            setBlogs(res.data.data)
            setTotalRecords(res.data.pageCount * lazyParams.rows)
        })
    }, [lazyParams, globalFilter])

    const onPage = (event) => {
        setLazyParams(event);
    }

    const onSort = (event) => {
        setLazyParams(event);
    }

    const categoryBodyTemplate = (data) => {
        return (
            <>
                {
                    data.categories.map(cat => cat.name).join(', ')
                }
            </>
        );
    }

    const dateBodyTemplate = (data) => {
        return (
            <>
                {
                    new Date(data.published_at).toLocaleDateString()
                }
            </>
        );
    }

    const actionBodyTemplate = (row) => {
        return (
            <div className="actions" >
                <Button icon="pi pi-eye" className="p-button-rounded p-button-text" onClick={()=> history.push(`/blog/${row.id}`)}/>
                <Button icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text" />
            </div>
        );
    }

    return (
        <div style={{ marginTop: '1%' }}>
            <h2>Blog</h2>
            <Message style={{ width: '100%', marginTop: '1%' }} severity="warn" content={(
                <React.Fragment>
                    <i className="pi pi-info-circle" style={{ color: '#D0FF49' }} />&nbsp;
                    <label>Yazılarda yer alan analiz ve görüşler tamamen yazarın kişisel yorum ve görüşlerini yansıtmakta olup, sizin risk ve getiri tercihlerinizle uyumlu olmayabilir, gerçeği yansıtmayabilir ve yatırım danışmanlığı kapsamında değildir. Yazılarda yer alan bilgiler yazarın şahsi görüşleri olup F-Ray Finansal Teknolojiler ile hiçbir ilgisi bulunmamaktadır.</label>
                </React.Fragment>
            )} />
            <div className="p-grid" style={{ marginTop: '2px' }}>
                <div className="p-col-12">
                    <div style={{ float: 'right' }}>
                        <span className="p-input-icon-left">
                            <React.Fragment>
                                <i className="pi pi-search" style={{ color: '#FCFCFC' }} />
                                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Ara..." style={{ borderColor: '#FCFCFC' }} />
                                <Button className="p-button-lg" label="Yeni Yazı Oluştur" icon="pi pi-plus-circle" style={{ marginLeft: '5px' }} onClick={()=> history.push(`/create/blog`)}/>
                            </React.Fragment>
                        </span>
                    </div>
                </div>
                <div className="p-col-12">
                    <DataTable ref={dt} value={blogs} lazy className="p-datatable-scrollable p-datatable-responsive" responsiveLayout="scroll" dataKey="id" paginator
                        first={lazyParams.first} rows={lazyParams.rows} totalRecords={totalRecords} onPage={onPage}
                        onSort={onSort} sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder}
                        rowsPerPageOptions={[5, 10, 25]}>
                        <Column field="name" header="Yazılar" style={{ backgroundColor: '#171717' }}></Column>
                        <Column header="Kategori" style={{ backgroundColor: '#171717' }} body={categoryBodyTemplate}></Column>
                        <Column header="Yayınlanma tarihi" style={{ backgroundColor: '#171717' }} body={dateBodyTemplate}></Column>
                        <Column body={actionBodyTemplate} style={{ backgroundColor: '#171717', maxWidth: '150px' }} ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )

}