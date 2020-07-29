import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";
import PropTypes from "prop-types";

import firebase from "../utils/firebase";

import "../../styles/components/EditableItems.scss";

export const EditableItems = ({ item }) => {
	const { store, actions } = useContext(Context);

	const [edit, setEdit] = useState(false);

	const [editItem, setEditItem] = useState({
		code: item.code,
		name: item.name,
		price: item.price,
		type: item.type
	});

	const db = firebase.firestore();

	const onDelete = async () => {
		await db
			.collection("items")
			.doc(item.id)
			.delete();
		actions.fetchItems();
	};

	const onEdit = () => {
		setEdit(true);
	};

	const onSaveEdit = async () => {
		await db
			.collection("items")
			.doc(item.id)
			.set(editItem);
		actions.fetchItems();
		setEdit(false);
	};

	return (
		<tr className="editable-row">
			{edit ? (
				<td className="table-cell">
					<FormControl
						onChange={e => setEditItem({ ...editItem, [e.target.name]: e.target.value })}
						className="input-style"
						placeholder="Código"
						aria-describedby="basic-addon1"
						type="number"
						name="code"
						value={editItem.code}
					/>
				</td>
			) : (
				<td className="table-cell">{item.code}</td>
			)}
			{edit ? (
				<td className="table-cell">
					<FormControl
						onChange={e => setEditItem({ ...editItem, [e.target.name]: e.target.value })}
						className="input-style"
						placeholder="Descripción"
						aria-describedby="basic-addon1"
						type="text"
						name="name"
						value={editItem.name}
					/>
				</td>
			) : (
				<td className="table-cell">{item.name.toLowerCase()}</td>
			)}
			{edit ? (
				<td className="table-cell">
					<FormControl
						onChange={e => setEditItem({ ...editItem, [e.target.name]: e.target.value })}
						className="input-style"
						placeholder="Precio"
						aria-describedby="basic-addon1"
						type="number"
						name="price"
						value={editItem.price}
					/>
				</td>
			) : (
				<td className="table-cell">${item.price}</td>
			)}
			{edit ? (
				<td className="table-cell">
					<FormControl
						onChange={e => setEditItem({ ...editItem, [e.target.name]: e.target.value })}
						className="input-style"
						placeholder="Categoría"
						aria-describedby="basic-addon1"
						type="text"
						name="type"
						value={editItem.type}
					/>
				</td>
			) : (
				<td className="table-cell">{item.type}</td>
			)}
			{edit ? (
				<td className="table-cell-buttons">
					<Button onClick={onSaveEdit} className="save-edit-button">
						Guardar
					</Button>
				</td>
			) : (
				<td className="table-cell-buttons">
					<Button onClick={onDelete} variant="danger" className="delete-button">
						X
					</Button>
					<Button onClick={onEdit} className="delete-button">
						<i className="far fa-edit" />
					</Button>
				</td>
			)}
		</tr>
	);
};

EditableItems.propTypes = {
	item: PropTypes.object
};
