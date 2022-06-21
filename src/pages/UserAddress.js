import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import CountryService from '../service/CountryService';



export const UserAddress = () => {
    const [countries, setCountries] = useState([]);
    const [value10, setValue10] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
    ];

    useEffect(() => {
        const countryService = new CountryService();
        countryService.getCountries().then((countries) => {
            setCountries(countries);
        });
    }, []);


    return (
        <body className="userAddress-body">
            <div id="address">
                <div>
                    <div className="p-grid">
                        <h5>Adres detayları</h5>
                        <div className="p-fluid p-formgrid p-grid" >
                            <p>Ödemenizi almadan önce adres detaylarınıza ihtiyacımız olacak.</p>
                            <div className="p-field p-col-12">
                                <span className="p-float-label">
                                    <InputTextarea id="address" rows="4" />
                                    <label htmlFor="inputtext">Adres detayları</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown id="cities" options={cities} value={value10} onChange={(e) => setValue10(e.value)} optionLabel="name"></Dropdown>
                                    <label>Şehir</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown id="asd" ></Dropdown>
                                    <label>İlçe/Semt</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown id="countries" options={countries} optionLabel="name"></Dropdown>
                                    <label>Ülke</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <InputText id="no" />
                                    <label>TC Kimlik No (İsteğe bağlı)</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12">
                                <Button className="p-button-lg" label="Ödeme ekranına git"  />
                            </div>
                            <label>Ödeme işlemleriniz güvenli iyzico korumalı alışveriş altyapısı ile gerçekleştirilir. 
                                Bu, kart bilgilerinizin biz dahil hiç kimse tarafından görüntülenemeyeceği anlamına gelir.</label>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}