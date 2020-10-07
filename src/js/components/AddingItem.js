import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { Button, InputGroup, FormControl } from "react-bootstrap";

import firebase from "../utils/firebase";

import "../../styles/components/AddingItem.scss";

export const AddingItem = () => {
	const { store, actions } = useContext(Context);

	const [newItem, setNewItem] = useState({
		COD: "",
		DESCRIPCION: "",
		PVP: "",
		CATEGORIA: ""
	});

	const onCreate = () => {
		const db = firebase.firestore();
		db.collection("items").add(newItem);
		setNewItem({
			COD: "",
			DESCRIPCION: "",
			PVP: "",
			CATEGORIA: ""
		});
		actions.setLoadingItems(store.loadingItems);
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
					name="COD"
					value={newItem.COD}
				/>
				<FormControl
					onChange={e => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
					className="input-style"
					placeholder="Descripción"
					aria-describedby="basic-addon1"
					type="text"
					name="DESCRIPCION"
					value={newItem.DESCRIPCION}
				/>
				<FormControl
					onChange={e => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
					className="input-style"
					placeholder="Precio"
					aria-describedby="basic-addon1"
					type="number"
					name="PVP"
					value={newItem.PVP}
				/>
				<FormControl
					onChange={e => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
					className="input-style"
					placeholder="Categoría"
					aria-describedby="basic-addon1"
					type="text"
					name="CATEGORIA"
					value={newItem.CATEGORIA}
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
