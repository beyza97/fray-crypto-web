import React, { useEffect, useState, useRef, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { useHistory } from 'react-router-dom';
import { BlockUI } from 'primereact/blockui';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import classNames from 'classnames';
import AuthContext from '../context/AuthContext'
import { objectNullCheck } from '../helpers/common';
const defaultInputs = {
	email: '',
	password: '',
	rememberMe: true
};

export const Login = () => {
	const toast = useRef(null);
	const [input, setInput] = useState(defaultInputs);
	const [submitted, setSubmitted] = useState(false);
	const [blockedDocument, setBlockedDocument] = useState(false);
	const history = useHistory();
	let { loginUser, userStatus } = useContext(AuthContext)



	const handleChange = e => {
		setInput({ ...input, [e.target.id]: e.target.value });
	};

	const onCheckboxChange = (e) => {
		setInput({ ...input, rememberMe: e.checked });
	};

	const onSubmit = (e) => {

		setBlockedDocument(true)
		if (objectNullCheck(input))
			setSubmitted(true)
		else {
			loginUser(e);
		}
		setBlockedDocument(false)
	}

	useEffect(() => {
		if (userStatus === "Unauthorized")
			toast.current.show({ severity: 'error', summary: 'Hata', detail: "Giriş Yapılamadı Bilgileri Kontrol Ediniz!", life: 4000 });
	}, [userStatus]);


	return (
		<form onSubmit={onSubmit}>
			<div className="login-body">
				<BlockUI blocked={blockedDocument} fullScreen />
				<Toast ref={toast} />
				<div className="login-panel p-fluid">
					<div>
						<img style={{ height: '60px', marginLeft: '30%' }} src="assets/layout/images/logo-slim.png" alt="F-ray" />
					</div>
					<div className="login-panel-content">
						<div className="p-grid">
							<div className="p-col-12">
								<h2 style={{ marginLeft: '35%' }}>Giriş Yap</h2>
							</div>
							<div className="p-col-12">
								<InputText placeholder='Kullanıcı Adı' id="email" type="text" value={input.email} onChange={(e) => handleChange(e)} className={classNames({ 'p-invalid': submitted && !input.email })} />
								{submitted && !input.email && <small className="p-error">Kullanıcı Adı zorunlu.</small>}
							</div>
							<div className="p-col-12">
								<InputText placeholder='Şifre' id="password" type="password" value={input.password} onChange={(e) => handleChange(e)} className={classNames({ 'p-invalid': submitted && !input.password })} />
								{submitted && !input.password && <small className="p-error">Şifre zorunlu.</small>}
							</div>
							<div className="p-col-12">
								<div className="p-grid p-formgrid">
									<div className="p-col-12 p-md-6">
										<Checkbox inputId="rememberMe" name="rememberMe" value={input.rememberMe} checked={input.rememberMe} onChange={onCheckboxChange} />
										<label htmlFor="rememberMe"> Beni Hatırla</label>
									</div>
									<div className="p-col-12 p-md-6">
										<label>Şifremi Unuttum?</label>
									</div>
								</div>
							</div>
							<div className="p-col-12">
								<Button className="p-button-lg" type='submit' label="Giriş Yap" style={{ width: '100%' }} />
							</div>
							<div className="p-col-12">
								<p>Bir hesabınız yok mu?<a href="/register"> Yeni Hesap Oluştur</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	)

}