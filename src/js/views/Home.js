import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

import "../../styles/Home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-general">
			<div className="container-logo">
				<Image cloudName={store.cloudinary.userName} publicId="logo_m" className="logo" />
				<div className="login">
					<InputGroup className="mb-3">
						<FormControl
							className="input-style"
							placeholder="Ingrese su email"
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
					<InputGroup className="mb-3 input-style">
						<FormControl
							className="input-style"
							placeholder="Ingrese su clave"
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
				</div>
				<div className="login-button">
					<Link to="/Admin">
						<Button className="button-style">Ingresar</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
