import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { v4 as uuidv4 } from 'uuid';


export const DividendInformation = () => {

    return (
        <div style={{marginTop:'3%'}}>
            <h2>Temettü Bilgileri</h2>
            <div className="custom-card" style={{ marginTop: '10px', padding: '5%' }}>
                <p>Eski Temettü Tarihi</p>
                <label >22</label>
                <hr />
                <p>Temettü Verimi</p>
                <label >22</label>
                <hr />
                <p>Yıllık Temettü</p>
                <label >22</label>
                <hr />
                <p>P/E Oranı</p>
                <label >22</label>
            </div>
        </div>
    )
}