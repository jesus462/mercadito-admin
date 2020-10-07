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
		COD: item.COD,
		DESCRIPCION: item.DESCRIPCION,
		PVP: item.PVP,
		CATEGORIA: item.CATEGORIA
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
						name="COD"
						value={editItem.COD}
					/>
				</td>
			) : (
				<td className="table-cell">{item.COD}</td>
			)}
			{edit ? (
				<td className="table-cell">
					<FormControl
						onChange={e => setEditItem({ ...editItem, [e.target.name]: e.target.value })}
						className="input-style"
						placeholder="Descripción"
						aria-describedby="basic-addon1"
						type="text"
						name="DESCRIPCION"
						value={editItem.DESCRIPCION}
					/>
				</td>
			) : (
				<td className="table-cell">{item.DESCRIPCION /*.toLowerCase()*/}</td>
			)}
			{edit ? (
				<td className="table-cell">
					<FormControl
						onChange={e => setEditItem({ ...editItem, [e.target.name]: e.target.value })}
						className="input-style"
						placeholder="Precio"
						aria-describedby="basic-addon1"
						type="number"
						name="PVP"
						value={editItem.PVP}
					/>
				</td>
			) : (
				<td className="table-cell">${item.PVP}</td>
			)}
			{edit ? (
				<td className="table-cell">
					<FormControl
						onChange={e => setEditItem({ ...editItem, [e.target.name]: e.target.value })}
						className="input-style"
						placeholder="Categoría"
						aria-describedby="basic-addon1"
						type="text"
						name="CATEGORIA"
						value={editItem.CATEGORIA}
					/>
				</td>
			) : (
				<td className="table-cell">{item.CATEGORIA}</td>
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
