import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

import "../../styles/Home.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const [login, setLogin] = useState({
		email: "",
		password: ""
	});

	const onLogin = () => {
		let email = "danielrubial1@gmail.com";
		let password = "Market_684";

		if (email === login.email && password === login.password) {
			actions.setSignedIn(store.signedIn);
		} else {
			alert("La clave o el mail es incorrecto");
		}
	};

	return (
		<div className="container-general">
			<div className="container-logo">
				<Image cloudName={store.cloudinary.userName} publicId="logo_m" className="logo" />
				<div className="login">
					<InputGroup className="mb-3">
						<FormControl
							onChange={e => setLogin({ ...login, [e.target.name]: e.target.value })}
							className="input-style"
							placeholder="Ingrese su email"
							aria-label="email"
							aria-describedby="basic-addon1"
							type="email"
							name="email"
							value={login.email}
						/>
					</InputGroup>
					<InputGroup className="mb-3 input-style">
						<FormControl
							onChange={e => setLogin({ ...login, [e.target.name]: e.target.value })}
							className="input-style"
							placeholder="Ingrese su clave"
							aria-label="password"
							aria-describedby="basic-addon1"
							type="password"
							name="password"
							value={login.password}
						/>
					</InputGroup>
				</div>
				<div className="login-button">
					<Link onClick={onLogin} to="/">
						<Button className="button-style">Ingresar</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
