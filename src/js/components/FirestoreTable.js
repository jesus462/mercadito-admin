import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { Table } from "react-bootstrap";
import { EditableItems } from "./EditableItems";

import "../../styles/components/FirestoreTable.scss";

export const FirestoreTable = () => {
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
							return <EditableItems key={item.id} item={item} />;
						})}
					</tbody>
				</Table>
			</div>
		</div>
	);
};
