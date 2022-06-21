import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { Toast } from 'primereact/toast';
import { Topbar } from '../components/compare/Topbar';
import { Summary } from '../components/compare/Summary';




export const CompareCompanys = () => {
    const { code, code2 } = useParams();
    const toast = useRef(null);
    const [company, setCompany] = useState(null)
    const [company2, setCompany2] = useState(null)
    let api = useAxios();

    useEffect(() => {
        api.get(`/company/${code}`).then(res => setCompany(res.data))
        api.get(`/company/${code2}`).then(res => setCompany2(res.data))
    }, [code, code2]);

    if (!company || !company2)
        return null

    return (
        <div style={{ marginTop: '1%' }}>
            <Toast ref={toast}></Toast>
            <Topbar company={company} company2={company2} />
            <Summary company={company} company2={company2} />
        </div>
    )

}