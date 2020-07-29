import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";

import firebase from "../utils/firebase";

import "../../styles/components/DeletingDatabase.scss";

export const DeletingDatabase = () => {
	const { store, actions } = useContext(Context);

	const onDeleteAll = async () => {
		const db = firebase.firestore();

		for (let i = 0; i < store.items.length; i++) {
			await db
				.collection("items")
				.doc(store.items[i].id)
				.delete();
		}

		actions.fetchItems();
	};

	return (
		<div className="container-deleting">
			<h6 className="title">BORRAR BASE DE DATOS COMPLETA</h6>
			<div className="container-button">
				<Button onClick={onDeleteAll} variant="danger" className="button">
					Borrar
				</Button>
			</div>
		</div>
	);
};
