import React, { useEffect } from 'react';
import { Route, withRouter, useLocation } from 'react-router-dom';
import App from "./App";
import { Login } from "./pages/Login";
import { Error } from "./pages/Error";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";
import { PackageSelection } from "./components/PackageSelection";

const AppWrapper = (props) => {
	let location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location]);

	switch (props.location.pathname) {
		case "/login":
			return <Route path="/login" component={Login} />
		case "/register":
			return <Route path="/register" component={Register} />
		case "/packages":
			return <Route path="/packages" component={PackageSelection} />
		case "/error":
			return <Route path="/error" component={Error} />
		case "/notfound":
			return <Route path="/notfound" component={NotFound} />
		default:
			return <App />;
	}

}

export default withRouter(AppWrapper);