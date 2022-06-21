import React, { useEffect, useState } from 'react';
import { Button } from "primereact/button";
import { TabView, TabPanel } from 'primereact/tabview';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useAxios from '../../utils/useAxios';
import { numberFormat } from '../../helpers/common';

export const KapNotifications = ({ code }) => {

    const api = useAxios();
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        if (code) {
            api.get(`/kap/notifications/${code}`).then(res => setNotifications(res.data))
        }
    }, [code]);


    return (
        <div style={{ marginTop: '10px' }}>
            <h2>KAP Bildirimleri</h2>
            <div className="p-grid">
                {notifications && notifications.map(item => {
                    return (
                        <div className="p-col-12" style={{ marginTop: '1%' }} key={uuidv4()}>
                            <div className="custom-card">
                                <div className="p-grid">
                                    <div className="p-col-10">
                                        <h5>{item.notificationType} - {item.publishDate}</h5>
                                    </div>
                                    <div className="p-col-2" style={{ marginTop: '1%' }}>
                                        <a href={item.link} target="_blank">Bildirime git</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}