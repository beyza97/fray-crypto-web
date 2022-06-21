import React from 'react';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

export const Error = () => {

	const history = useHistory();

    const goDashboard = () => {
        history.push('/')
    }

	return (
		<div className="exception-body  error">
			<div className="exception-panel">
				<div className="exception-code">
					<img src="assets/layout/images/exception/500.svg" alt="serenity-react" />
				</div>

				<div className="exception-detail">

					<div className="exception-icon">
						<i className="pi pi-times"></i>
					</div>
					<h1>ERROR OCCURED</h1>
					<p>Please contact the system administrator</p>

					<Button label="GO TO DASHBOARD" onClick={goDashboard} />
			</div>
			</div>
		</div>
	)

}