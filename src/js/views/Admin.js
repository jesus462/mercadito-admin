import React, { Component, useState, useEffect, useContext } from "react";
import { Context } from "../store/Context";

import { ExcelReader } from "../components/ExcelReader";
import { FirestoreTable } from "../components/FirestoreTable";
import { AddingItem } from "../components/AddingItem";

import "../../styles/Admin.scss";
import { DeletingDatabase } from "../components/DeletingDatabase";

export const Admin = () => {
	return (
		<div className="container-general-admin">
			<DeletingDatabase />
			<ExcelReader />
			<AddingItem />
			<FirestoreTable />
		</div>
	);
};
