import React, { useState } from 'react';
import useAxios from '../utils/useAxios';
import { Button } from "primereact/button";
import { AutoComplete } from 'primereact/autocomplete';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const Compare = () => {
    const [company1, setCompany1] = useState(null)
    const [company2, setCompany2] = useState(null)
    const [filteredCompanys, setFilteredCompanys] = useState(null);
    const history = useHistory();
    let api = useAxios();

    const searchCompany = async (event) => {
        let _filteredCompanys = await (await api.get(`/company?query=${event.query}`)).data;
        setFilteredCompanys(_filteredCompanys);
    }

    const itemTemplate = (item) => {
        return (
            <div>{item.code} {item.name}</div>
        );
    }

    const submitCompare = () => {
        if (!company1 || !company2)
            return
        else
            history.push(`/compare/${company1.code}/${company2.code}`)
    }

    const mockPop = [['ASELS', 'AVOD'],
    ['ASELS', 'AVOD'],
    ['ASELS', 'AVOD'],
    ['ASELS', 'AVOD'],
    ['ASELS', 'AVOD'],
    ['ASELS', 'AVOD'],
    ['ASELS', 'AVOD'],
    ['ASELS', 'AVOD'],]

    return (
        <div style={{ marginTop: '1%' }}>
            <h2>Kıyasla</h2>
            <h4>İki farklı hisse seçerek kıyaslamaya başlayın.</h4>
            <div className="p-grid" style={{ marginTop: '1%' }}>
                <div className="p-col-2">
                    <AutoComplete
                        size={32}
                        placeholder="Bir hisse aratın veya seçin..."
                        value={company1}
                        suggestions={filteredCompanys}
                        completeMethod={searchCompany}
                        field="name"
                        forceSelection
                        itemTemplate={itemTemplate}
                        onSelect={(e) => setCompany1(e.value)}
                        onChange={(e) => setCompany1(e.value)} />
                </div>
                <div className="p-col-1" style={{ textAlign: 'center', marginTop: '0.5%' }}>
                    <h4>VS</h4>
                </div>
                <div className="p-col-2">
                    <AutoComplete
                        size={32}
                        placeholder="Bir hisse aratın veya seçin..."
                        value={company2}
                        suggestions={filteredCompanys}
                        completeMethod={searchCompany}
                        field="name"
                        forceSelection
                        itemTemplate={itemTemplate}
                        onSelect={(e) => setCompany2(e.value)}
                        onChange={(e) => setCompany2(e.value)} />
                </div>
                <div className="p-col-5">
                </div>
                <div className="p-col-5">
                    <Button className="p-button-lg" label="Şimdi Kıyasla" style={{ width: '100%' }} onClick={submitCompare} />
                </div>
            </div>
            <h4>Popüler kıyaslamalar</h4>
            <div className="p-grid" style={{ marginTop: '1%' }}>
                {
                    mockPop.map((item) => {
                        return (
                            <div className="p-col-3" key={uuidv4()}>
                                <div className="custom-card" style={{ height: '60px', textAlign: 'center' }}>
                                    <Button style={{ marginTop: '2%' }} className="p-button-symbol" label={item[0]} onClick={() => history.push(`/company/${item[0]}`)} />
                                    <Button className="p-button-plain p-button-lg p-button-text" label="VS" onClick={() => history.push(`/compare/${item[0]}/${item[1]}`)} />
                                    <Button className="p-button-symbol" label={item[1]} onClick={() => history.push(`/company/${item[1]}`)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}