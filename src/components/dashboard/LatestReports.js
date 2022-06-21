import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import useAxios from '../../utils/useAxios';
import { useHistory } from 'react-router-dom';

export const LatestReports = () => {
    const [latestReports, setLatestReports] = useState([]);
    let api = useAxios();
    const history = useHistory();

    useEffect(() => {
        api.get('/company?sortByDate=true').then(res => setLatestReports(res.data.slice(0, 5)))
    }, []);

    const sembolBodyTemplate = (data) => {
        return (
            <>
                <Button className="p-button-symbol" label={data.code} onClick={() => history.push(`/company/${data.code}`)}/>
            </>
        );
    }

    const dateBodyTemplate = (data) => {
        var date = new Date(data.released_at).toLocaleDateString();
        return (
            <>
                {date}
            </>
        );
    };

    return (
        <>{latestReports &&
            <>
                <h2>Son Açıklanan Raporlar</h2>
                <div className="tab-table-card">
                    <DataTable value={latestReports}>
                        <Column field="code" header="Hisse Kodu" body={sembolBodyTemplate}></Column>
                        <Column field="name" header="Hisse Adı"></Column>
                        <Column field="released_at" header="Açıklanma Tarihi" body={dateBodyTemplate}></Column>
                    </DataTable>
                </div>
            </>
        }
        </>
    );
}