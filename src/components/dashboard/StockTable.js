import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

export const StockTable = (prop) => {
    const { stocks } = prop
    const history = useHistory();

    const sembolBodyTemplate = (data) => {
        return (
            <>
                <Button className="p-button-symbol" label={data.sembol} onClick={() => history.push(`/company/${data.sembol}`)}/>
            </>
        );
    }

    const gunlukyuzdeBodyTemplate = (data) => {
        const isNegative = data.gunlukyuzde < "0"
        return (
            <div className={isNegative ? "persent-negative" : "persent-positive"}>
                <i className={isNegative ? "pi pi-angle-down" : "pi pi-angle-up"}></i>{data.gunlukyuzde}%
            </div>
        );
    }

    const columns = [
        { field: 'sembol', header: 'Hisse Kodu', body: sembolBodyTemplate },
        { field: 'gunlukyuzde', header: 'Günlük Değişim', body: gunlukyuzdeBodyTemplate },
        { field: 'acilis', header: 'Açılış' },
        { field: 'son', header: 'Son Fiyat' }
    ];

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} field={col.field} header={col.header} body={col.body} />;
    });
    return (
        <div key={uuidv4()}>
            <DataTable value={stocks} id={uuidv4()} >
                {dynamicColumns}
            </DataTable>
        </div>
    );
}