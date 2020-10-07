import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../store/Context";

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const { store, actions } = useContext(Context);

	return (
		<Route
			{...rest}
			render={routeProps => (store.signedIn ? <RouteComponent {...routeProps} /> : <Redirect to={"/login"} />)}
		/>
	);
};
