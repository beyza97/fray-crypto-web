import React from 'react';
import { Button } from "primereact/button";
import { useHistory } from 'react-router-dom';

export const NotFound = () => {

	const history = useHistory();

    const goDashboard = () => {
        history.push('/')
    }

	return (
		<div className="exception-body notfound">
			<div className="exception-panel">
				<div className="exception-code">
					<img src="assets/layout/images/exception/404.svg" alt="serenity-react" />
				</div>

				<div className="exception-detail">
					<div className="exception-icon">
						<i className="pi pi-exclamation-circle"></i>
					</div>
					<h1>PAGE NOT FOUND</h1>
					<p>Please contact the system administrator</p>

					<Button label="GO TO DASHBOARD" onClick={goDashboard} />
				</div>
			</div>
		</div>
	)
}