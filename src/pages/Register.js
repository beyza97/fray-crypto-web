import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { BlockUI } from 'primereact/blockui';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { Password } from 'primereact/password';
import { objectNullCheck } from '../helpers/common';
import useAxios from '../utils/useAxios';
import classNames from 'classnames';

const defaultInputs = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
};

export const Register = () => {
    const toast = useRef(null);
    const [input, setInput] = useState(defaultInputs);
    const [submitted, setSubmitted] = useState(false);
    const [blockedDocument, setBlockedDocument] = useState(false);
    let api = useAxios();

    const handleChange = e => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handlePassChange = e => {
        setInput({ ...input, password: e.target.value });
    };

    const onCheckboxChange = (e) => {
        setInput({ ...input, rememberMe: e.checked });
    };

    const onSubmit = () => {
        setBlockedDocument(true)
        registerSubmit()
        setBlockedDocument(false)
    }

    const registerSubmit = async() => {
        try {
            if (objectNullCheck(input)) {
                setSubmitted(true)
                return
            }
            await api.post('/register', input)
            toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Üyelik Tanımlandı', life: 3000 });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Hata', detail: 'Üyelik Tanımlanırken Hata Oluştu', life: 3000 });
        }
    }

    return (
        <div className="register-body">
            <BlockUI blocked={blockedDocument} fullScreen />
            <Toast ref={toast} />
            <div className="register-panel p-fluid">
                <div>
                    <img style={{ height: '60px', marginLeft: '33%' }} src="assets/layout/images/logo-slim.png" alt="F-ray" />
                </div>
                <div className="register-panel-content">
                    <div className="p-grid">
                        <div className="p-col-12">
                            <h2 style={{ marginLeft: '23%' }}>Yeni Hesap Oluştur</h2>
                        </div>
                        <div className="p-grid">
                            <div className="p-col-6">
                                <span className="p-float-label">
                                    <InputText id="first_name" value={input.first_name} onChange={(e) => handleChange(e)} className={classNames({ 'p-invalid': submitted && !input.first_name })} />
                                    <label htmlFor="inputtext">Adınız</label>
                                </span>
                                {submitted && !input.first_name && <small className="p-error">Ad zorunlu.</small>}
                            </div>
                            <div className="p-col-6">
                                <span className="p-float-label">
                                    <InputText id="last_name" value={input.last_name} onChange={(e) => handleChange(e)} className={classNames({ 'p-invalid': submitted && !input.last_name })} />
                                    <label htmlFor="inputtext">Soyadınız</label>
                                </span>
                                {submitted && !input.last_name && <small className="p-error">Soyadınız zorunlu.</small>}
                            </div>
                            <div className="p-col-6">
                                <span className="p-float-label">
                                    <InputText id="email" value={input.email} onChange={(e) => handleChange(e)} className={classNames({ 'p-invalid': submitted && !input.email })} />
                                    <label htmlFor="inputtext">E-posta Adresi</label>
                                </span>
                                {submitted && !input.email && <small className="p-error">E-posta Adresi zorunlu.</small>}
                            </div>
                            <div className="p-col-6">
                                <span className="p-float-label">
                                    <Password id="password" type="password" value={input.password} onChange={(e) => handlePassChange(e)} toggleMask className={classNames({ 'p-invalid': submitted && !input.password })} />
                                    <label htmlFor="inputtext">Şifre</label>
                                </span>
                                {submitted && !input.password && <small className="p-error">Şifre zorunlu.</small>}
                            </div>
                        </div>
                        <div className="p-col-12">
                            <Checkbox inputId="rememberMe" value={input.rememberMe} checked={input.rememberMe} onChange={onCheckboxChange} />
                            <label htmlFor="rememberMe"> <a> Aydınlatma metni</a> içerisinde yer alan açıklamalar kapsamında kişisel verilerimin işlenmesine onay veriyorum. (Opsiyonel)</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox inputId="rememberMe" value={input.rememberMe} checked={input.rememberMe} onChange={onCheckboxChange} />
                            <label htmlFor="rememberMe"> Web sitesinin <a>şartlar ve koşullar</a> sayfasını okudum ve kabul ediyorum.</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox inputId="rememberMe" value={input.rememberMe} checked={input.rememberMe} onChange={onCheckboxChange} />
                            <label htmlFor="rememberMe"> <a> Mesafeli Satış Sözleşmesi</a>, <a>Ön Bilgilendirme Formu ve Teslimat</a>, ve <a>İade Şartları Bilgilendirme Formu bölümlerini okudum</a>, anladım ve kabul ediyorum.</label>
                        </div>
                        <div className="p-col-12">
                            <Button className="p-button-lg" label="Hesabımı Oluştur" onClick={onSubmit} style={{ width: '100%' }} />
                        </div>
                        <div className="p-col-12">
                            <p>Zaten bir hesabınız var mı?<a href="/login"> Giriş Yap</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}