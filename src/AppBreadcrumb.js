import React from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

export const AppBreadcrumb = () => {

    const location = useLocation();
    const history = useHistory();

    return (
        <div className="layout-breadcrumb">
            <ul>
                <li><button className="p-link" onClick={() => history.push('/')}><i className="pi pi-home"></i></button></li>
                <li>{location.pathname}</li>
            </ul>
        </div>
    );
}

export default withRouter(AppBreadcrumb);
