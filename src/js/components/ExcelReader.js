import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import XLSX from "xlsx";
import { MakeCols } from "../utils/makeColumns";
import { SheetJSFT } from "../utils/filesTypes";
import { Button, InputGroup, FormControl } from "react-bootstrap";

import firebase from "../utils/firebase";

import "../../styles/components/ExcelReader.scss";

export const ExcelReader = () => {
	const { store, actions } = useContext(Context);

	const db = firebase.firestore();

	const [state, setState] = useState({
		file: {},
		data: [],
		cols: [],
		loaded: false,
		process: false
	});

	const handleChange = e => {
		const files = e.target.files;
		if (files && files[0])
			setState({
				file: files[0],
				loaded: true
			});
	};

	const handleFile = () => {
		if (state.loaded) {
			/* Boilerplate to set up FileReader */
			const reader = new FileReader();
			const rABS = !!reader.readAsBinaryString;

			reader.onload = e => {
				/* Parse data */
				const bstr = e.target.result;
				const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array", bookVBA: true });
				/* Get first worksheet */
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				const data = XLSX.utils.sheet_to_json(ws);
				/* Update state */
				setState({
					data: data,
					cols: MakeCols(ws["!ref"]),
					loaded: false,
					process: true
				});
			};
			if (rABS) {
				reader.readAsBinaryString(state.file);
				actions.fetchItems();
			}
		} else if (!state.loaded) {
			if (state.process) {
				alert("Carga el Excel a la Base de Datos");
			} else {
				alert("Elige un Excel");
			}
		}
	};

	const handleUpload = () => {
		if (!state.loaded && !state.process) {
			alert("Elige un Excel");
		} else if (!state.process && state.loaded) {
			alert("Procesa el Excel");
		} else if (state.process && !state.loaded) {
			for (let i = 0; i < state.data.length; i++) {
				db.collection("items").add(state.data[i]);
			}
			alert("cargado");
			setState({ loaded: false, process: false });
			actions.fetchItems();
		}
	};

	return (
		<div className="upload-excel">
			<h6 className="title">AGREGAR EXCEL</h6>
			<p className="p-style">
				<strong>1.</strong>
				<input
					type="file"
					className="form-control input-style"
					id="file"
					accept={SheetJSFT}
					onChange={handleChange}
				/>
			</p>
			<div className="container-button">
				<Button className="button" onClick={handleFile}>
					2. Procesar
				</Button>
				<Button className="button" onClick={handleUpload}>
					3. Cargar
				</Button>
			</div>
		</div>
	);
};
