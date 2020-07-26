import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";

import firebase from "../utils/firebase";

import "../../styles/components/FirestoreCRUD.scss";

export const FirestoreCRUD = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-firestore">
			<h6 className="title">BASE DE DATOS (Items: {store.items.length})</h6>
			<div className="container-table">
				<Table className="full-table">
					<thead>
						<tr>
							<th className="table-cell">CÓDIGO</th>
							<th className="table-cell">DESCRIPCIÓN</th>
							<th className="table-cell">P.V.P.</th>
							<th className="table-cell">CATEGORÍA</th>
						</tr>
					</thead>
					<tbody>
						{store.items.map(item => {
							const onDelete = () => {
								const db = firebase.firestore();
								db.collection("items")
									.doc(item.id)
									.delete();
								actions.fetchItems();
							};

							return (
								<tr key={item.id}>
									<td className="table-cell">{item.code}</td>
									<td className="table-cell">{item.name.toLowerCase()}</td>
									<td className="table-cell">${item.price}</td>
									<td className="table-cell">{item.type}</td>
									<td className="table-cell">
										<Button onClick={onDelete} variant="danger" className="delete-button">
											X
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</div>
	);
};
