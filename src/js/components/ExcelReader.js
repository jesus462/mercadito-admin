import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";
import XLSX from "xlsx";
import { MakeCols } from "../utils/makeColumns";
import { SheetJSFT } from "../utils/filesTypes";
import { Button, InputGroup, FormControl } from "react-bootstrap";

export const ExcelReader = () => {
	const { store, actions } = useContext(Context);

	const [state, setState] = useState({
		file: {},
		data: [],
		cols: []
	});

	const [file, setFile] = useState({});
	const [data, setData] = useState([]);
	const [cols, setCols] = useState([]);

	const handleChange = e => {
		const files = e.target.files;
		if (files && files[0]) setState({ file: files[0] });
	};

	const handleFile = () => {
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
			setState({ data: data, cols: MakeCols(ws["!ref"]) });
			//console.log(JSON.stringify(state.data, null, 2));
			//console.log(JSON.stringify(data, null, 2));
		};
		if (rABS) {
			reader.readAsBinaryString(state.file);
		} else {
			reader.readAsArrayBuffer(state.file);
		}
	};

	const handleUpload = () => {
		for (let i = 0; i < state.data.length; i++) {
			actions.fetchCreateClient(state.data[i]);
		}
	};

	console.log(JSON.stringify(state.data, null, 2));

	return (
		<div>
			<label htmlFor="file">Upload an excel to Process Triggers</label>
			<br />
			<input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
			<br />
			<input type="submit" value="Process Triggers" onClick={handleFile} />
			<input type="submit" value="Upload Items" onClick={handleUpload} />
		</div>
	);
};
