import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";

import firebase from "../utils/firebase";

import "../../styles/components/DeletingDatabase.scss";

export const DeletingDatabase = () => {
	const { store, actions } = useContext(Context);
	const [counter, setCounter] = useState(0);

	const onDeleteAll = async () => {
		const db = firebase.firestore();
		actions.setLoadingItems(store.loadingItems);
		for (let i = 0; i < store.items.length; i++) {
			await db
				.collection("items")
				.doc(store.items[i].id)
				.delete();

			setCounter(i);
		}

		setCounter(0);
		alert("Base de datos borrada exitosamente");
		actions.fetchItems();
	};

	return (
		<div className="container-deleting">
			<h6 className="title">BORRAR BASE DE DATOS COMPLETA {counter + "/" + store.items.length}</h6>
			<div className="container-button">
				<Button onClick={onDeleteAll} variant="danger" className="button">
					Borrar
				</Button>
			</div>
		</div>
	);
};
