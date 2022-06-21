import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from "primereact/button";
import classNames from 'classnames';
import AuthContext from './context/AuthContext'
import useAxios from './utils/useAxios';
import { ColorBox } from 'devextreme-react';

const AppTopbar = (props) => {
	const [Companys, setCompany] = useState([])
	const [selectedCompany, setSelectedCompany] = useState(null);
	const [filteredCompanys, setFilteredCompanys] = useState(null);
	const history = useHistory();

	let { logoutUser } = useContext(AuthContext)
	let api = useAxios();

	const goDashboard = () => {
		history.push('/')
	}

	const searchCompany = async (event) => {
		let _filteredCompanys;
		if (!event.query.trim().length) {
			_filteredCompanys = [...Companys];
		}
		else {
			_filteredCompanys = await (await api.get(`/company?query=${event.query}`)).data;
		}
		setFilteredCompanys(_filteredCompanys);
	}

	const onTopbarItemClick = (event, item) => {
		if (props.onTopbarItemClick) {
			props.onTopbarItemClick({
				originalEvent: event,
				item: item
			});
		}
	}

	const itemTemplate = (item) => {
		return (
			<div>{item.code} {item.name}</div>
		);
	}

	let topbarClass = classNames('topbar-menu fadeInDown', { 'topbar-menu-active': props.topbarMenuActive })
	let horizontalIcon = (props.layoutMode === 'horizontal') &&
		<button type="button" className="p-link topbar-logo" onClick={goDashboard}>
			<img alt="logo" style={{ height: '45px', marginTop: '4px' }} src="assets/layout/images/logo-slim.png" />
		</button>;

	return (
		<div className="layout-topbar">
			<div style={{ marginLeft: '5%', marginRight: '5%' }}>
				{horizontalIcon}
				<img alt="logo" src="assets/layout/images/logo-slim.png" className="mobile-logo" />

				<button type="button" className="p-link menu-btn" onClick={props.onMenuButtonClick}>
					<i className="pi pi-bars"></i>
				</button>

				<button type="button" className="p-link topbar-menu-btn" onClick={props.onTopbarMobileMenuButtonClick}>
					<i className="pi pi-user"></i>
				</button>

				<div className="layout-topbar-menu-wrapper">
					<ul className={topbarClass}>
						<li className={classNames('profile-item', { 'active-topmenuitem': props.activeTopbarItem === 'profile' })}>
							<button type="button" className="p-link" onClick={(e) => onTopbarItemClick(e, 'profile')}>
								<span className="profile-image-wrapper">
									<img src="assets/layout/images/avatar.png" alt="avatar" />
								</span>
							</button>
							<ul className={classNames({ 'fadeInDown': false })}>
								<li role="menuitem">
									<button type="button" className="p-link">
										<i className="pi pi-user"></i>
										<span>Profilim</span>
									</button>
								</li>
								{/* <li role="menuitem">
									<button type="button" className="p-link">
										<i className="pi pi-lock"></i>
										<span>Privacy</span>
									</button>
								</li>
								<li role="menuitem">
									<button type="button" className="p-link">
										<i className="pi pi-cog"></i>
										<span>Settings</span>
									</button>
								</li> */}
								<li role="menuitem">
									<button type="button" className="p-link" onClick={logoutUser}>
										<i className="pi pi-sign-out"></i>
										<span>Çıkış</span>
									</button>
								</li>
							</ul>
						</li>
						<div>
							<Button label="Anasayfa" style={{ marginLeft: '40px', top: '-10px' }} onClick={goDashboard} className="p-button-plain p-button-lg p-button-text" />
							<Button label="Tüm Coinler" style={{ marginLeft: '40px', top: '-10px' }} onClick={() => history.push('/allCoins')} className="p-button-plain p-button-lg p-button-text" />
							<Button label="Endeksler" style={{ marginLeft :'40px', top:'-10px' }} onClick= {()=> history.push('/indicates')} className="p-button-plain p-button-lg p-button-text"/>
							<Button label="Sektörler" style={{ marginLeft: '40px', top:'-10px'}} onClick={()=> history.push('/sectors')} className="p-button-plain p-button-lg p-button-text"/>
							<Button label="Haberler" style={{ marginLeft:'40px',top:'-10px'}} onClick={()=> history.push('/news')} className="p-button-plain p-button-lg p-button-text"/>
							<Button	label="Al/Sat" style={{marginLeft:'40px',top:'-10px'}} onClick={()=> history.push('/alarms')} className="p-button-plain p-button-lg p-button-text"/>
							<Button label="Portfolyo" style={{marginLeft:'40px',top:'-10px'}} onClick={()=>history.push('/portfolio')} className="p-button-plain p-button-lg p-button-text"/>
							<AutoComplete
								style={{ left: '10%', top: '-5px' }}
								size={50}
								placeholder="Coinler içinde ara..."
								value={selectedCompany}
								suggestions={filteredCompanys}
								completeMethod={searchCompany}
								field="name"
								forceSelection
								itemTemplate={itemTemplate}
								onSelect={(e) => history.push(`/company/${e.value.code}`)}
								onChange={(e) => setSelectedCompany(e.value)} />
						</div>
						
					</ul>
				</div>
			</div>

		</div>
	);

}

export default AppTopbar;