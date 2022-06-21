import React, { useState } from 'react';
import classNames from 'classnames';
import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import { Dashboard } from './pages/Dashboard';
import PrimeReact from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './App.scss';
import { UserAddress } from './pages/UserAddress';
import PrivateRoute from './utils/PrivateRoute'
import { Company } from './pages/Company';
import { DetailIncomeStatement } from './components/company/Financials/DetailIncomeStatement';
import { QuarterIncomeStatement } from './components/company/Financials/QuarterIncomeStatement';
import { CashFlowIncomeStatement } from './components/company/Financials/CashFlowIncomeStatement';
import { BalanceIncomeStatement } from './components/company/Financials/BalanceIncomeStatement';
import { Compare } from './pages/Compare';
import { CompareCompanys } from './pages/CompareCompanys';
import { Scoring } from './pages/Scoring';
import { Blog } from './pages/Blog';
import { Footer } from './components/Footer';
import { BlogDetail } from './pages/BlogDetail';
import { BlogCreate } from './pages/BlogCreate';
import { Filtering } from './pages/Filtering';

const App = () => {

    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [layoutMode, setLayoutMode] = useState('horizontal');
    const [mobileMenuActive, setMobileMenuActive] = useState(null);
    const [topbarMenuActive, setTopbarMenuActive] = useState(null);

    PrimeReact.ripple = true;

    let menuClick;
    let menuButtonClick;
    let topbarMenuClick;
    let topbarMenuButtonClick;

    const onWrapperClick = (event) => {
        if (!menuClick && !menuButtonClick && mobileMenuActive) {
            setMobileMenuActive(false)
        }

        if (!topbarMenuClick && !topbarMenuButtonClick) {
            setActiveTopbarItem(null);
            setTopbarMenuActive(false)
        }
        menuClick = false;
        menuButtonClick = false;
        topbarMenuClick = false;
        topbarMenuButtonClick = false;
    }

    const onTopbarItemClick = (event) => {
        topbarMenuClick = true;
        if (activeTopbarItem === event.item)
            setActiveTopbarItem(null)
        else
            setActiveTopbarItem(event.item)
        event.originalEvent.preventDefault();
    }

    const onMenuButtonClick = (event) => {
        menuButtonClick = true;

        if (isMobile()) {
            setMobileMenuActive(prevState => !prevState);
        }

        event.preventDefault();
    }

    const onTopbarMobileMenuButtonClick = (event) => {
        topbarMenuButtonClick = true;
        setTopbarMenuActive(prevState => !prevState)
        event.preventDefault();
    }

    const isMobile = () => {
        return window.innerWidth <= 1024;
    }

    let wrapperClass = classNames('layout-wrapper', {
        'layout-wrapper-active': mobileMenuActive,
        'layout-menu-horizontal': true,
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <div className="layout-main">
                <AppTopbar layoutMode={layoutMode} activeTopbarItem={activeTopbarItem} onTopbarItemClick={onTopbarItemClick}
                    onMenuButtonClick={onMenuButtonClick} onTopbarMobileMenuButtonClick={onTopbarMobileMenuButtonClick}
                    topbarMenuActive={topbarMenuActive} isMobile={false} />

                <div className="layout-content">

                    <PrivateRoute path="/" component={Dashboard} exact />
                    <PrivateRoute path="/address" component={UserAddress} />
                    <PrivateRoute path="/company/:code" component={Company} exact />
                    <PrivateRoute path="/company/:code/financial/income" component={DetailIncomeStatement} exact />
                    <PrivateRoute path="/company/:code/financial/quarter" component={QuarterIncomeStatement} exact />
                    <PrivateRoute path="/company/:code/financial/cashflow" component={CashFlowIncomeStatement} exact />
                    <PrivateRoute path="/company/:code/financial/balance" component={BalanceIncomeStatement} exact />
                    <PrivateRoute path="/compare" component={Compare} exact />
                    <PrivateRoute path="/compare/:code/:code2" component={CompareCompanys} exact />
                    <PrivateRoute path="/scoring" component={Scoring} />
                    <PrivateRoute path="/blog" component={Blog} exact />
                    <PrivateRoute path="/blog/:id" component={BlogDetail} exact />
                    <PrivateRoute path="/create/blog" component={BlogCreate} exact />
                    <PrivateRoute path="/filtering" component={Filtering} />
                </div>
                <Footer />
                <AppFooter />

                {mobileMenuActive && <div className="layout-main-mask"></div>}
            </div>
        </div>
    );

}

export default App;
