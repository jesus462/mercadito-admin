import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";

import firebase from "../utils/firebase";

import "../../styles/components/AddingItem.scss";

export const AddingItem = () => {
	const { store, actions } = useContext(Context);

	const [newItem, setNewItem] = useState({
		code: "",
		name: "",
		price: "",
		type: ""
	});

	const onCreate = () => {
		const db = firebase.firestore();
		db.collection("items").add(newItem);
		setNewItem({
			code: "",
			name: "",
			price: "",
			type: ""
		});
		actions.fetchItems();
	};

	console.log(newItem);
	return (
		<div className="container-adding-item">
			<h6 className="title">AGREGAR UN ITEM NUEVO</h6>
			<InputGroup>
				<FormControl
					onChange={e => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
					className="input-style"
					placeholder="Código"
					aria-describedby="basic-addon1"
					type="number"
					name="code"
					value={newItem.code}
				/>
				<FormControl
					onChange={e => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
					className="input-style"
					placeholder="Descripción"
					aria-describedby="basic-addon1"
					type="text"
					name="name"
					value={newItem.name}
				/>
				<FormControl
					onChange={e => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
					className="input-style"
					placeholder="Precio"
					aria-describedby="basic-addon1"
					type="number"
					name="price"
					value={newItem.price}
				/>
				<FormControl
					onChange={e => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
					className="input-style"
					placeholder="Categoría"
					aria-describedby="basic-addon1"
					type="text"
					name="type"
					value={newItem.type}
				/>
			</InputGroup>
			<div className="container-button">
				<Button className="button" onClick={onCreate}>
					Agregar
				</Button>
			</div>
		</div>
	);
};
